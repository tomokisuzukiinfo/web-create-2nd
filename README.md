# Smile lims corporate concept

株式会社Smile limsの企業紹介サイトです。社名以外の掲載内容・ニュース・所在地は仮のサンプルです。添付の72秒の参考動画を確認し、全画面写真、大きな英字見出し、白と青のセクション、固定ヘッダー、スクロール表示の方向性を反映しています。参考サイトの写真や文章は使用していません。

## Development

Node.js 24、npm 11 で検証します。依存関係は package-lock.json で固定しています。

```sh
cd /workspace/web-create-2nd
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev
```

## Validation

```sh
npm run build
npm run typecheck
```

Static export: `npm run build` generates `out/`. Upload the contents of `out/` to a static host. Preview the exported site with `npm run start` (Python 3, port 3000). Opening `out/index.html` directly is not supported because asset paths assume a web server. No database, API key, external fonts, or external image requests are needed. Photos are original AI-generated image visuals, stored locally as compressed WebP assets.

## Editing

- Page structure, sample company information, news and services: `src/app/page.tsx`
- Colors, typography, responsive layouts and reduced-motion support: `src/app/globals.css`
- SEO title, description and demo noindex setting: `src/app/layout.tsx`
- Hero office and lounge image visuals: `public/images/office.webp`, `public/images/lounge.webp`

The contact form validates required fields and email format locally, then displays a demo confirmation. It does not send or store submitted data. Connect a real delivery service and replace the fictional data before public launch. Remove the demo labels and noindex only when preparing a real company site.

Each cloud task is already isolated. Use the existing checkout; do not create a Git worktree unless explicitly requested.

## Vercel deployment

Import `tomokisuzukiinfo/web-create-2nd` in Vercel and select `main`. The committed `vercel.json` sets the install command, build command, and static output directory. No application secrets or environment variables are needed. Vercel account access is required to publish; a successful local build is not a public deployment.

## Standalone review copy

After building, run `node scripts/make-preview.mjs`. This creates `/workspace/scratch/Smile-lims-preview.html`, with embedded styling, illustration and demo controls. Download it and open it in a browser without a development server. It is a review copy; deploy the complete `out/` directory for the actual site. All data except the company name remains provisional.
