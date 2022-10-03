---
'@talend/scripts-config-react-webpack': major
'@talend/scripts-preset-react': major
'@talend/scripts-preset-react-lib': major
---

fix: No more implicit sass data injected in scss files

This is BREAKING CHANGE:

```diff
+++@use '~@talend/bootstrap-theme/src/theme/guidelines' as *;
```

You have to
* use `addSassData.js` from https://gist.github.com/jmfrancois/402c32c22fba98f1e35599f1e0dab2c2
* rewrite your sass using @talend/design-tokens on the long and remove this bootstrap-theme guidelines from all your scss
