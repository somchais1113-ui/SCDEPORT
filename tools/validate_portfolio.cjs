/* Static asset and data-driven render checks; no dependency installation. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const failures = [];
let references = 0;
function reference(value, base = root) {
  if (!value || /^(?:[a-z]+:|\/\/|#)/i.test(value)) return;
  const clean = decodeURIComponent(value.split(/[?#]/)[0]);
  if (!clean || clean.includes('${')) return;
  references++;
  if (!fs.existsSync(path.resolve(base, clean.replace(/^\//, '')))) failures.push(value);
}
for (const name of fs.readdirSync(root).filter(n => n.endsWith('.html'))) {
  const source = read(name);
  for (const match of source.matchAll(/\b(?:src|href)="([^"]+)"/g)) reference(match[1]);
  for (const match of source.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) new vm.Script(match[1], {filename: name});
}
for (const name of fs.readdirSync(path.join(root, 'assets/css'))) {
  const source = read('assets/css/' + name);
  for (const match of source.matchAll(/url\(\s*['"]?([^'"\s)]+)/g)) reference(match[1], path.join(root, 'assets/css'));
}
for (const dir of ['assets/js', 'data']) for (const name of fs.readdirSync(path.join(root, dir)).filter(n => n.endsWith('.js'))) new vm.Script(read(dir+'/'+name), {filename: dir+'/'+name});
const context = {window:{}};
for (const name of ['categories','projects','craft']) vm.runInNewContext(read('data/'+name+'.js'),context);
const {PORTFOLIO_PROJECTS: projects, PORTFOLIO_CATEGORIES: categories, PORTFOLIO_CRAFT: processes} = context.window;
assert.equal(new Set(projects.map(p => p.slug)).size,projects.length);
let galleryImages=0;
for (const p of projects) {
  assert(categories.some(c => c.id === p.category),p.slug);
  for (const key of ['title','titleTh','summary','summaryTh','challenge','challengeTh','solution','solutionTh']) assert(p[key],p.slug+' '+key);
  reference(p.cover);
  assert(p.gallery.length > 0);
  for (const img of p.gallery) {reference(img.src);assert(img.width > 0 && img.height > 0);galleryImages++;}
}
for (const p of processes) {
  reference(p.cover);assert.equal(p.examples.length,4);assert(p.sources.length);
  for (const img of p.examples) {reference(img.src);assert(img.description && img.descriptionTh && img.altTh);}
}
let renderCases=0;
for (const lang of ['en','th']) for (const slug of ['LIST',...processes.map(p => p.slug),'missing']) {
  const mount={innerHTML:'',querySelectorAll:()=>[]};
  const address={innerHTML:''};
  const doc={title:'',body:{dataset:{language:lang}},addEventListener:()=>{},querySelectorAll:()=>[],querySelector:selector=>{
    if (selector==='[data-craft-list]') return slug==='LIST'?mount:null;
    if (selector==='[data-craft-detail]') return slug==='LIST'?null:mount;
    if (selector==='[data-page-address="craft-detail"]') return address;
    return null;
  }};
  vm.runInNewContext(read('assets/js/craft.js'),{document:doc,window:{PORTFOLIO_CRAFT:processes,location:{search:'?id='+slug},localStorage:{getItem:()=>lang}},URLSearchParams});
  if (slug==='LIST') assert.equal((mount.innerHTML.match(/class="craft-row"/g)||[]).length,5);
  else if(slug==='missing') assert(mount.innerHTML.includes('Process not found'));
  else {
    assert.equal((mount.innerHTML.match(/class="craft-example"/g)||[]).length,4);
    assert(mount.innerHTML.includes('Technical references'));
    assert(!mount.innerHTML.includes('undefined'));
    assert(!mount.innerHTML.includes('Draft:'));
  }
  renderCases++;
}
assert.equal(failures.length,0,'Missing references: '+[...new Set(failures)].join(', '));
console.log(JSON.stringify({status:'passed',references,projects:projects.length,galleryImages,processes:processes.length,renderCases,note:'Static and template-execution checks only; no browser or live Vercel deployment test.'},null,2));
