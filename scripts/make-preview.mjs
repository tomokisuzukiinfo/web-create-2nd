import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

// A server-free review copy of the exported page. The production site keeps
// its React runtime; this copy uses a small local script for the navigation controls.
const root = process.cwd();
const output = resolve(process.argv[2] ?? "/workspace/scratch/Smile-lims-preview.html");
let html = await readFile(resolve(root, "out/index.html"), "utf8");
const stylesheetLinks = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/gi)];
const styles = [];
for (const [tag] of stylesheetLinks) {
  const path = tag.match(/href="([^"]+)"/)?.[1];
  if (!path?.startsWith("/_next/")) throw new Error("Unexpected stylesheet URL");
  styles.push(await readFile(resolve(root, "out", path.slice(1)), "utf8"));
}
if (!styles.length) throw new Error("No exported stylesheet found. Run npm run build first.");
html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
html = html.replace(/<link\b[^>]*>/gi, "");
const images = [...new Set([...html.matchAll(/src="(\/images\/[^"?]+)"/g)].map(match => match[1]))];
for (const path of images) {
  const image = (await readFile(resolve(root, "public", path.slice(1)))).toString("base64");
  const mime = path.endsWith(".webp") ? "image/webp" : "image/svg+xml";
  html = html.replaceAll(`src="${path}"`, `src="data:${mime};base64,${image}"`);
}
const icon = (await readFile(resolve(root, "src/app/icon.png"))).toString("base64");
html = html.replace("</head>", `<link rel="icon" href="data:image/png;base64,${icon}"><style>${styles.join("\n")}</style></head>`);
const script = `
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navigation');
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const setMenu = open => {
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  nav.classList.toggle('is-open', open);
  header.classList.toggle('menu-is-open', open);
  menu.querySelector('span').textContent = open ? 'CLOSE' : 'MENU';
  document.body.style.overflow = open ? 'hidden' : '';
  main.inert = open; footer.inert = open;
};
const closeMenu = () => setMenu(false);
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => { if(event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') closeMenu(); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
let frame = 0;
const updateHeader = () => {
  frame = 0;
  header.classList.toggle('is-scrolled', scrollY > 72);
  if (!reduce.matches && scrollY <= hero.offsetHeight) hero.style.setProperty('--hero-shift', (scrollY * .12) + 'px');
};
addEventListener('scroll', () => { if(!frame) frame = requestAnimationFrame(updateHeader); }, {passive:true});
updateHeader();
{
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    if(!reduce.matches) entry.target.animate([{opacity:0,transform:'translateY(35px)',clipPath:'inset(0 0 100% 0)'},{opacity:1,transform:'translateY(0)',clipPath:'inset(0 0 0 0)'}],{duration:950,easing:'cubic-bezier(.16,1,.3,1)'});
    observer.unobserve(entry.target);
  }),{threshold:.12});
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
}
`;
html = html.replace("</body>", `<script>${script}</script></body>`);
await mkdir(resolve(output, ".."), { recursive: true });
await writeFile(output, html);
console.log(`Created standalone browser preview: ${output}`);
