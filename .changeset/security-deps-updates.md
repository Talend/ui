---
'@talend/bootstrap-theme': patch
---

chore(deps): security updates for several transitive dependencies

- `proxy-addr` 2.0.7 → 2.0.8 (IPv4-mapped IPv6 trust subnet spoofing, GHSA via `express`/`webpack-dev-server`)
- `compression` 1.8.1 → 1.8.2 (DoS via memory leak, `webpack-dev-server`)
- `source-map-js` 1.2.1 → 1.2.2 (event-loop DoS, `csso`/`css-tree`)
- `http-cache-semantics` 4.2.0 → 4.3.0 (cache poisoning via max-stale handling, `make-fetch-happen`/`node-gyp`/`ttf2woff2`/`fantasticon`)
- `postcss-selector-parser` 6.1.4 → 7.1.4 (CPU exhaustion via flat selector parsing), required bumping `postcss-preset-env` 7.8.3 → 11.6.1 in `@talend/bootstrap-theme`; the removed `browsers` plugin option was dropped with no replacement config, falling back to `postcss-preset-env`'s default browser query (verified identical vendor-prefix output in the built CSS before/after)
