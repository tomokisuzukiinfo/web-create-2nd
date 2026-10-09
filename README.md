# Smile lims corporate concept

株式会社Smile limsの企業紹介サイトです。会社情報は提供された名刺をもとに、事業内容はユーザー確認済みの「不動産売買・賃貸仲介・パーソナルトレーニング」を反映しています。設立年・資本金など未確認の情報は掲載していません。添付の72秒の参考動画を確認し、全画面写真、大きな英字見出し、白と青のセクション、固定ヘッダー、スクロール表示の方向性を反映しています。参考サイトの写真や文章は使用していません。

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

- Confirmed company information and contact destinations: `src/app/company.ts`
- Page structure, brand message and service descriptions: `src/app/page.tsx`
- Colors, typography, responsive layouts and reduced-motion support: `src/app/globals.css`
- SEO title, description and in-progress noindex setting: `src/app/layout.tsx`
- Local AI image visuals and reconstructed infinity mark: `public/images/`

Contact links use the phone numbers and email on the supplied business card. Telephone links open the device calling application; email links open the configured mail application. The site has no server-side form or delivery service. News displays a preparation message until real updates are available. Photos are illustrative AI-generated interiors, not photos of the actual office or training studio. The infinity motif is reconstructed from the card; the original logo file can replace it later. The noindex setting remains while the site is being prepared.

Each cloud task is already isolated. Use the existing checkout; do not create a Git worktree unless explicitly requested.

## Vercel deployment

Import `tomokisuzukiinfo/web-create-2nd` in Vercel and select `main`. The committed `vercel.json` sets the install command, build command, and static output directory. No application secrets or environment variables are needed. Vercel account access is required to publish; a successful local build is not a public deployment.

## Standalone review copy

After building, run `node scripts/make-preview.mjs`. This creates `/workspace/scratch/Smile-lims-preview.html`, with embedded styling, image visuals and navigation controls. Download it and open it in a browser without a development server. It is a review copy; deploy the complete `out/` directory for the actual site.
