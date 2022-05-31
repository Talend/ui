---
'@talend/dynamic-cdn-webpack-plugin': major
'@talend/scripts-build-cdn': major
'@talend/scripts-config-ng-webpack': major
'@talend/scripts-config-react-webpack': major
'@talend/scripts-config-storybook-lib': major
'@talend/scripts-core': major
'@talend/scripts-preset-react': major
'@talend/scripts-preset-react-lib': major
---

Webpack major upgrade (4 to 5).

## Breaking changes

@talend/bootstrap-theme is not imported anymore for you. You have to import it first in your project

```diff
+import '@talend/bootstrap-theme';
```

No more polyfills loaded for you. We have removed the folliwng packages:

* `regenerator-runtime`
* `core-js-bundle`
