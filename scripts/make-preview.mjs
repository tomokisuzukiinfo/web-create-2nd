import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

// A server-free review copy of the exported page. The production site keeps
// its React runtime; this copy uses a small local script for the demo controls.
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
const image = (await readFile(resolve(root, "public/images/city.svg"))).toString("base64");
const icon = (await readFile(resolve(root, "src/app/icon.svg"))).toString("base64");
html = html.replaceAll('src="/images/city.svg"', `src="data:image/svg+xml;base64,${image}"`);
html = html.replace("</head>", `<link rel="icon" href="data:image/svg+xml;base64,${icon}"><style>${styles.join("\n")}</style></head>`);
const script = `
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navigation');
const dialog = document.querySelector('dialog');
const form = dialog.querySelector('form');
const closeMenu = () => { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = 'メニュー ☰'; };
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  menu.textContent = open ? '閉じる ×' : 'メニュー ☰';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
const confirmation = document.createElement('div');
confirmation.className = 'form-confirmation';
confirmation.setAttribute('role', 'status');
confirmation.hidden = true;
const mark = document.createElement('span'); mark.textContent = '✓'; mark.setAttribute('aria-hidden', 'true');
const heading = document.createElement('h3'); heading.textContent = '入力内容を確認しました。';
const note = document.createElement('p'); note.textContent = 'これはデモのため、実際の送信は行っていません。';
const close = document.createElement('button'); close.type = 'button'; close.className = 'form-submit'; close.textContent = '閉じる';
close.addEventListener('click', () => dialog.close());
confirmation.append(mark, heading, note, close); dialog.append(confirmation);
document.querySelectorAll('.nav-contact,.contact-button').forEach(button => button.addEventListener('click', () => {
  closeMenu(); form.hidden = false; confirmation.hidden = true; dialog.showModal();
}));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
form.addEventListener('submit', event => { event.preventDefault(); form.hidden = true; confirmation.hidden = false; });
dialog.addEventListener('close', () => { form.reset(); form.hidden = false; confirmation.hidden = true; });
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{duration:750,easing:'cubic-bezier(.2,.7,.2,1)'});
    observer.unobserve(entry.target);
  }),{threshold:.12});
  document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
}
`;
html = html.replace("</body>", `<script>${script}</script></body>`);
await mkdir(resolve(output, ".."), { recursive: true });
await writeFile(output, html);
console.log(`Created standalone browser preview: ${output}`);
