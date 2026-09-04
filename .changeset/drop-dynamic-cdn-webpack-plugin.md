---
'@talend/scripts-config-react-webpack': major
'@talend/ui-playground': patch
---

Drop `@talend/dynamic-cdn-webpack-plugin` and `@talend/scripts-config-cdn`

Both packages only served the webpack-based CDN externalization feature, which
is unused now that the app build was migrated off webpack. Removed:

- the `fork/dynamic-cdn-webpack-plugin` package
- the `tools/scripts-config-cdn` package (its only consumer)
- the now-dead `dynamic-cdn-webpack-plugin` config keys in
  `talend-scripts.json` files
