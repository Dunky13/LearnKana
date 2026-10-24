# LearnKana

Use Node.js 26.12.1 (selected by `.nvmrc`).

```sh
npm ci
npm run build
npm test
```

The production build runs `gulp min` and writes `js/dist/index.js`, the existing
RequireJS entry point. `npm run build:long` retains the unminified `gulp long`
task. Both use the original ordered sources. Gulp 5 replaces Gulp 3's obsolete
filesystem loader, which fails on Node 26 with `primordials is not defined`.

The regression check builds both tasks, compares their kana data and answer
scoring to the original source, and leaves the minified production bundle in
place. HTML, styles, assets, external APIs and the RequireJS loader are unchanged.

The repository contains a static site and no release or deployment workflow.
Publishing the built site remains a separate operator action; no new destination
is configured by this change.
