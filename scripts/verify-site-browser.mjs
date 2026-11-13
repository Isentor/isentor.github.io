import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, mkdtemp, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const modulePath = process.env.PORTFOLIO_PLAYWRIGHT;
const { chromium } = await import(modulePath ? pathToFileURL(modulePath).href : 'playwright');
const output = process.env.PORTFOLIO_QA_OUTPUT ? resolve(process.env.PORTFOLIO_QA_OUTPUT) : await mkdtemp(resolve(tmpdir(), 'portfolio-site-'));
const baseline = process.argv.includes('--baseline');
const root = resolve('dist');
const mime = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.xml':'text/xml','.txt':'text/plain'};
const server = process.env.PORTFOLIO_QA_URL ? null : createServer(async (request,response) => {
  try {
    const url = new URL(request.url,'http://localhost');
    const path = resolve(root,'.'+decodeURIComponent(url.pathname)+(url.pathname.endsWith('/')?'index.html':''));
    assert.ok(path.startsWith(root+sep));
    const body = await readFile(path);
    response.writeHead(200,{'content-type':mime[extname(path)] ?? 'application/octet-stream'}).end(body);
  } catch { response.writeHead(404).end(); }
});
if (server) await new Promise((done,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',done);});
const origin = process.env.PORTFOLIO_QA_URL ?? 'http://127.0.0.1:'+server.address().port;
const canon = 'https://isentor.github.io';
const expected = {
  '/':'Maurycy Pytel',
  '/projects/tawerna-gothic/':'Tawerna Gothic',
  '/projects/grytycy/':'Grytycy.pl',
  '/projects/content-publishing-automation/':'Content Publishing Automation',
};
const result = {origin,baseline,browser:'',routes:{},links:[],external:{},journeys:{},checks:[],failures:[]};
const validate = (ok,label) => { if (!ok) result.failures.push(label); };
const slug = route => route==='/'?'home':route.split('/').filter(Boolean).at(-1);
const pathOf = url => new URL(url).pathname;
const browser = await chromium.launch(process.env.PORTFOLIO_BROWSER?{executablePath:process.env.PORTFOLIO_BROWSER}:{});
await mkdir(output,{recursive:true});

async function readPage(page,route) {
  const response = await page.goto(origin+route);
  await page.evaluate(()=>document.fonts.ready);
  return response;
}

async function renderData(page) {
  return page.evaluate(() => {
    const style = (element, keys) => element ? Object.fromEntries(keys.map(k=>[k,getComputedStyle(element)[k]])) : null;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const h1 = document.querySelector('h1');
    const wrap = header?.querySelector('.premium-wrap');
    return {
      header:style(header,['position','backgroundColor','color','height']),
      footer:style(footer,['backgroundColor','color']),
      headerWidth:wrap?.getBoundingClientRect().width ?? null,
      nav:[...(header?.querySelectorAll('nav a') ?? [])].map(a=>a.textContent.trim()),
      footerLinks:[...(footer?.querySelectorAll('a') ?? [])].map(a=>a.textContent.trim()),
      cta:style(document.querySelector('main .premium-button'),['backgroundColor','borderRadius','fontWeight']),
      h1:style(h1,['fontFamily','fontSize','color']),
      surface:(() => {
        let section = document.querySelector('main > section');
        while (section) {
          const fill = getComputedStyle(section).backgroundColor;
          if (fill !== 'rgba(0, 0, 0, 0)') return fill;
          section = section.parentElement;
        }
        return null;
      })(),
      tokens:['--paper','--graphite','--green','--amber','--gutter','--serif'].map(t=>getComputedStyle(document.documentElement).getPropertyValue(t).trim()),
      legacy:!!document.querySelector('.site-header,.site-footer,.nav-toggle'),
      viewport:innerWidth, width:document.documentElement.scrollWidth, bodyWidth:document.body.scrollWidth,
      overflowing:[...document.querySelectorAll('main h1, main h2, main a, main img')].filter(el=>{
        const r=el.getBoundingClientRect();
        return r.width>0&&(r.left< -1 || r.right>innerWidth+1);
      }).map(el=>el.tagName+':'+(el.textContent||el.getAttribute('alt')||'').trim().slice(0,65)),
    };
  });
}

async function clickEdge(page,edge) {
  const start=page.url();
  const destination=new URL(edge.href,start);
  const expectedStatus=edge.http;
  const anchor=page.locator('a[href]').nth(edge.index);
  const request=destination.pathname!==pathOf(start)?page.waitForNavigation({timeout:10000}):null;
  await anchor.click();
  const response=await request;
  const actual=new URL(page.url());
  const targetId=destination.hash ? decodeURIComponent(destination.hash.slice(1)) : '';
  const anchorFound=!targetId||await page.evaluate(id=>Boolean(document.getElementById(id)),targetId);
  const h1=await page.locator('h1').first().textContent();
  return { actual:actual.pathname+actual.hash,status:response?.status()??expectedStatus,h1,anchorFound,
    pass:actual.pathname===destination.pathname&&actual.hash===destination.hash&&anchorFound&&(!expected[destination.pathname]||h1===expected[destination.pathname]) };
}

try {
  result.browser=browser.version();
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const generated=(await readdir(root,{recursive:true})).filter(p=>p.endsWith('.html')).map(p=>'/'+p.replaceAll('\\','/').replace(/index\.html$/,'')).sort();
  result.generated=generated;
  const sitemap=await Promise.all(['/sitemap.xml','/sitemap-index.xml','/robots.txt'].map(async path=>{
    const response=await page.request.get(origin+path);
    return {path,status:response.status(),urls:response.ok()?[...(await response.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]):[]};
  }));
  result.discovery=sitemap;
  const discovered=new Set(['/',...generated,...sitemap.flatMap(s=>s.urls.filter(u=>new URL(u).origin===canon).map(pathOf))]);
  for(const route of discovered) {
    const response=await readPage(page,route);
    const h1=await page.locator('h1').first().textContent();
    result.routes[route]={http:response.status(),h1,canonical:await page.locator('link[rel=canonical]').getAttribute('href'),views:{}};
    validate(response.ok()&&h1===expected[route]&&result.routes[route].canonical===canon+route,'route/SEO '+route);
    const anchors=await page.locator('a[href]').evaluateAll(links=>links.map((a,index)=>({
      index, href:a.getAttribute('href'), label:(a.innerText||a.getAttribute('aria-label')||a.textContent).trim(),
      region:a.closest('header, footer, nav, main')?.tagName.toLowerCase()??'skip',
      target:a.getAttribute('target'),
    })));
    for(const a of anchors) {
      const to=new URL(a.href,page.url());
      const internal=to.origin===origin;
      if(internal)discovered.add(to.pathname);
      result.links.push({source:route,...a,type:internal?(to.hash?'anchor':'page'):to.protocol==='mailto:'?'mailto':'external',destination:internal?to.pathname+to.hash:to.href});
    }
  }
  validate(JSON.stringify([...discovered].sort())===JSON.stringify(Object.keys(expected).sort()),'discovered route inventory');
  for(const edge of result.links.filter(e=>e.type==='page'||e.type==='anchor')) {
    const dest=new URL(edge.href,origin+edge.source);
    const response=await page.request.get(dest.href,{maxRedirects:0});
    edge.http=response.status();
    edge.redirect=response.headers().location??null;
    validate(edge.http===200&&!edge.redirect,'internal HTTP '+edge.source+' '+edge.href);
  }
  if (process.env.PORTFOLIO_CHECK_EXTERNAL === '1') {
    for(const url of new Set(result.links.filter(x=>x.type==='external').map(x=>x.destination))) {
      try {const response=await page.request.get(url,{timeout:12000});result.external[url]={http:response.status(),final:response.url()};}
      catch {result.external[url]={http:null,status:'UNREACHABLE'};}
    }
  }
  await page.close();

  for(const width of [320,390,768,1024,1440]) {
    const height=width<=390?844:900;
    const page=await browser.newPage({viewport:{width,height}});
    const logs={console:[],resources:[]};
    page.on('pageerror',e=>logs.console.push(e.message));
    page.on('console',m=>{if(m.type()==='error')logs.console.push(m.text());});
    page.on('requestfailed',r=>logs.resources.push({url:r.url(),error:r.failure()?.errorText}));
    page.on('response',r=>{if(r.status()>=400)logs.resources.push({url:r.url(),http:r.status()});});
    let home;
    for(const route of discovered) {
      logs.console.length=0; logs.resources.length=0;
      await readPage(page,route);
      const view=await renderData(page);
      if(route==='/')home=view;
      else {
        for(const key of ['header','footer','headerWidth','nav','h1','surface','tokens']) {
          const normalized=(v)=>key==='h1'?{fontFamily:v?.fontFamily}:v;
          validate(JSON.stringify(normalized(view[key]))===JSON.stringify(normalized(home[key])),'shared '+key+' '+route+' '+width);
        }
        validate(!view.legacy,'legacy shell '+route+' '+width);
      }
      validate(view.footerLinks.some(label=>label.startsWith('Back to top')),'footer return '+route+' '+width);
      if (!baseline) {
        validate(view.tokens.every(Boolean),'missing shared tokens '+route+' '+width);
        if (route !== '/') validate(view.cta?.borderRadius===home.cta?.borderRadius&&view.cta?.fontWeight===home.cta?.fontWeight,'shared CTA geometry '+route+' '+width);
      }
      validate(view.width===width&&view.bodyWidth===width&&!view.overflowing.length,'overflow '+route+' '+width+' '+view.overflowing.join(','));
      const images=await page.locator('main img').all();
      for(const image of images){
        await image.scrollIntoViewIfNeeded();
        validate(await image.evaluate(async el=>{try{await el.decode();return el.naturalWidth>0&&el.alt.length>0;}catch{return false;}}),'image '+route+' '+width);
      }
      await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
      if(width===390||width===1440) await page.screenshot({path:resolve(output,slug(route)+'-'+width+'.png'),fullPage:true,animations:'disabled'});
      if(!baseline&&(width===390||width===1440)&&process.env.PORTFOLIO_AXE) {
        await page.addScriptTag({path:process.env.PORTFOLIO_AXE});
        view.axe=await page.evaluate(async()=>{
          const r=await window.axe.run({runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});
          const detail=xs=>xs.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)}));
          return {passes:r.passes.length,violations:detail(r.violations),incomplete:detail(r.incomplete)};
        });
        validate(!view.axe.violations.length,'axe '+route+' '+width);
      } else view.axe='NOT_RUN';
      view.errors={console:[...logs.console],resources:[...logs.resources]};
      validate(!logs.console.length&&!logs.resources.length,'browser errors '+route+' '+width);
      result.routes[route].views[width]=view;
    }

    if(width===390||width===1440) {
      for(const edge of result.links.filter(e=>e.type==='page'||e.type==='anchor')) {
        await readPage(page,edge.source);
        const toggle=page.locator('.nav-toggle:visible');
        if(baseline&&edge.region==='nav'&&await toggle.count())await toggle.click();
        try {
          if(edge.region==='skip')await page.keyboard.press('Tab');
          const clicked=await clickEdge(page,edge);
          (edge.clicks??={})[width]=clicked;
          validate(clicked.pass,'click '+width+' '+edge.source+' '+edge.href);
        } catch(error) {
          (edge.clicks??={})[width]={pass:false,error:String(error).slice(0,500)};
          validate(false,'click '+width+' '+edge.source+' '+edge.href);
        }
      }

      await readPage(page,'/');
      const journey=[];
      for(const [route,h1] of Object.entries(expected).slice(1)) {
        await page.locator('main a[href="'+route+'"]').click();
        assert.equal(await page.locator('h1').textContent(),h1);
        await page.locator('main section').last().scrollIntoViewIfNeeded();
        const back=page.locator('main a[href="/#projects"]').last();
        await back.click();
        assert.equal(new URL(page.url()).hash,'#projects');
        journey.push({caseStudy:route,h1,returnTo:'/#projects'});
      }
      for(const section of ['Expertise','Experience','About','Contact']){
        await page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name:section,exact:true}).click();
        assert.equal(new URL(page.url()).hash,'#'+section.toLowerCase());
        journey.push({section});
      }
      const demo=page.locator('[data-recovery]');
      const trigger=demo.getByRole('button');
      for(const message of [/intent saved/i,/no clear response/i,/checking the external state/i,/delivery confirmed/i]){
        await trigger.press('Enter');
        assert.match(await demo.getByRole('status').textContent(),message);
        assert.equal(await demo.locator('[aria-current="step"]').count(),1);
      }
      await trigger.press('Space');
      assert.match(await demo.getByRole('status').textContent(),/ready/i);
      journey.push({recovery:'4 keyboard steps + reset'});
      result.journeys[width]=journey;
    }
    await page.close();
  }

  if(!baseline) {
    for(const options of [{javaScriptEnabled:false},{reducedMotion:'reduce'}]) {
      const page=await browser.newPage({...options,viewport:{width:390,height:844}});
      for(const route of discovered) {
        await readPage(page,route);
        await page.keyboard.press('Tab');
        const skip=page.locator('.skip-link');
        assert.ok(await skip.evaluate(el=>el===document.activeElement&&el.matches(':focus-visible')));
        assert.ok((await skip.boundingBox()).y>=0);
        await page.keyboard.press('Enter');
        assert.equal(new URL(page.url()).hash,'#main-content');
        assert.equal(await page.evaluate(()=>document.activeElement.id),'main-content');
        const nav=page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name:'Projects',exact:true});
        await nav.press('Enter');
        assert.equal(new URL(page.url()).hash,'#projects');
        if(options.javaScriptEnabled===false){
          assert.equal(await page.locator('[data-recovery] li:visible').count(),4);
          assert.equal(await page.locator('[data-recovery] button:visible').count(),0);
        } else {
          assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');
          await page.locator('[data-recovery] button').press('Enter');
          assert.match(await page.getByRole('status').textContent(),/intent saved/i);
        }
        result.checks.push({route,mode:options.javaScriptEnabled===false?'no-js':'reduced-motion',keyboard:'PASS'});
      }
      await page.close();
    }
  }
} finally {
  await writeFile(resolve(output,'results.json'),JSON.stringify(result,null,2)+'\n');
  await browser.close();
  server?.close();
}
if(!baseline) assert.deepEqual(result.failures,[]);
console.log('Audited '+Object.keys(result.routes).length+' routes and '+result.links.length+' links. Differences: '+result.failures.length+'; output: '+output);
