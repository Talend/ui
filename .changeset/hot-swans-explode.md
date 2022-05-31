---
'@talend/scripts-config-react-webpack': patch
---

fix source-map for apps built with prod mode. Change `devtool` to 'source-map' because Terser plugin only supports limited source-map types.
