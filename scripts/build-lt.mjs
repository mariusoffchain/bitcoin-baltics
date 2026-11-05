import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {aboutPage} from './about-page.mjs';
import {atlasEventPage} from './event-page.mjs';
import {hasEventPage,eventSlug} from './event-data.mjs';
import {crawlableHome} from './home-crawlable.mjs';
const out='public-baltics';
const country=JSON.parse(await readFile('profiles/baltics/config.json','utf8'));
const events=JSON.parse(await readFile(out+'/data/events.json','utf8'));
const site=JSON.parse(await readFile(out+'/data/site.json','utf8'));
const copy={title:'Apie Bitcoin Baltics',description:'Bitcoin priimančios vietos ir bendruomenių renginiai Lietuvoje, Latvijoje ir Estijoje.',shortTagline:'Atrask Bitcoin Baltijos šalyse.',aboutLabel:'Apie',heading:'Bitcoin Baltijos šalyse. Susitik gyvai.',intro:'Atrask Bitcoin priimančias vietas, susitikimus, pasivaikščiojimus ir konferencijas Lietuvoje, Latvijoje bei Estijoje.',contributeHeading:'Prisidėk prie žemėlapio',contributeText:'Pridėk vietą į BTC Map, pasiūlyk renginį arba pranešk apie klaidą.',backLabel:'Grįžti į žemėlapį',sections:[
{heading:'3 šalys, 1 žemėlapis',paragraphs:['Pasirink šalį, kad susiaurintum žemėlapį ir renginių sąrašą. Vietų duomenis teikia BTC Map ir OpenStreetMap bendradarbiai.','Informacija gali būti neišsami ar pasenusi. Prieš kelionę pasitikslink su verslu.']},
{heading:'Susitikimai ir renginiai',paragraphs:['Prie kiekvieno renginio pateikiama vieta ir organizatoriaus nuorodos. Nepaskelbta data nėra patvirtintas susitikimas.','Vilniaus Bitcoin susitikimai paprastai vyksta 1-ąjį mėnesio ketvirtadienį 18:00 „Zolak“, anglų kalba. Kito susitikimo data ir vieta dar nepatvirtintos.']},
{heading:'Bendruomenės išlieka savarankiškos',paragraphs:['Bitcoin Baltics pritaiko Lithuania BTC žemėlapį Baltijos šalims. Vietos bendruomenės išlaiko savo tapatybę ir kanalus. Įtraukimas nereiškia partnerystės ar rekomendacijos.','Svetainės kodui taikoma MIT licencija. Nuotraukų ir prekės ženklų teisės yra atskiros.'],links:[{label:'Lithuania BTC',url:'https://lithuaniabtc.com/'}]},
{heading:'Kur pradėti',paragraphs:['Latvijoje atrask Baltic Honeybadger, bitcoin++ Riga ir BitcoinWalk Riga. Estijoje Mission Liberty Tallinn rengia Bitcoin diskusijas platesnėje laisvės temų programoje.'],links:[{label:'Pirmieji žingsniai su Bitcoin',url:'/lt/learn/'},{label:'Bitcoin mokėjimai verslui',url:'/lt/accept-bitcoin/'}]},
{heading:'Svetainė ir kontaktai',paragraphs:['Bitcoin Baltics yra regioninė Cypher Baltics iniciatyva. Svetainę prižiūri Marius Off-Chain.'],links:[{label:'Žiniasklaidai ir kontaktai',url:'/lt/press/'},{label:'Bendradarbiavimas',url:'/lt/partners/'},{label:'Cypher Baltics',url:'https://cypherbaltics.org/'},{label:'PROOF knyga',url:'https://proofconference.com/book/'}]}
]};
let html=await readFile(out+'/index.html','utf8');
html=html.replace('<html lang="en" data-language="en">','<html lang="lt" data-language="lt">').replace(/<title>.*?<\/title>/,`<title>${country.pageTitleLT}</title>`).replaceAll('href="/about/"','href="/lt/about/"').replaceAll('href="/en/about/"','href="/lt/about/"').replaceAll('>About<','>Apie<').replaceAll('>Add a place<','>Pridėti vietą<').replaceAll('>Walks<','>Pasivaikščiojimai<').replaceAll('>Meetups<','>Susitikimai<').replaceAll('>Accepting Bitcoin<','>Priima Bitcoin<').replaceAll('Explore Bitcoin across the Baltics.',copy.shortTagline).replace('href="https://bitcoinbaltics.com/"','href="https://bitcoinbaltics.com/lt/"').replaceAll('en_GB','lt_LT');
html=html.replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*/g,'$1'+copy.description);
html=html.replace(/<h1 id="page-heading"[\s\S]*?<\/h1>/, "").replace(/(<div id="event-list" class="event-list" aria-live="polite">)[\s\S]*?(?=\n        <\/div>)/, '$1</div>');
html=crawlableHome(html,{heading:'Bitcoin vietos ir renginiai Baltijos šalyse',events,lang:'lt',timezone:country.timezone,countries:country.countries,eventHref:e=>'/lt/events/'+eventSlug(e)+'/'});
await mkdir(out+'/lt/about',{recursive:true});await writeFile(out+'/lt/index.html',html);
let about=aboutPage({homeHTML:html,copy,lang:'lt',origin:country.origin,name:country.name,repository:country.repository,contactEmail:country.contactEmail,initiatives:site.initiatives,regional:true});
await writeFile(out+'/lt/about/index.html',about);
const routes=['/lt/','/lt/about/'];
const localIds=new Set(JSON.parse(await readFile('data/events.json','utf8')).map(e=>e.id));
for(const e of events.filter(hasEventPage)){
 const initiative=site.initiatives.find(i=>i.id===e.initiative);
 const organiser=initiative?{name:initiative.name,url:initiative.links?.[0]?.url}:undefined;
 const path='/lt/events/'+eventSlug(e)+'/',canonical=localIds.has(e.id)?'https://lithuaniabtc.com/events/'+eventSlug(e)+'/':country.origin+path;
 await mkdir(out+path,{recursive:true});await writeFile(out+path+'index.html',atlasEventPage({template:about,event:e,organiser,lang:'lt',origin:country.origin,name:country.name,home:'/lt/',canonical,alternates:{en:country.origin+'/events/'+eventSlug(e)+'/',lt:country.origin+path},alternatePath:'/events/'+eventSlug(e)+'/',timezone:country.timezone,defaultCountry:'LT',showCountry:true,structuredData:!localIds.has(e.id)}));
 if(!localIds.has(e.id))routes.push(path);
}
await writeFile(out+'/sitemap.xml',(await readFile(out+'/sitemap.xml','utf8')).replace('</urlset>',routes.map(p=>`<url><loc>${country.origin+p}</loc></url>`).join('')+'</urlset>'));
