---
'@talend/react-dataviz': patch
---

fix: replace dynamic import syntax by static

It was not supported by typescript which replace it with static import.
Wait for CDN API which is incoming to load assets on demand.
