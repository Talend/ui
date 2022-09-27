# @talend/babel-plugin-import-scss

This package is a babel plugin which will help you to compile sass files at the babel level. It will rename the import of your file to point to css file and will

How to use:

    npm i --save-dev @talend/babel-plugin-import-scss
    // or
    yarn add -D @talend/babel-plugin-import-scss

Then update your `.babelrc` file:

```diff
"plugins": [
+    "@talend/babel-plugin-import-scss",
    ...
]
```

## Options

## Is there an alternative ?

Yes before starting this project we have tried https://github.com/altgifted/babel-plugin-transform-scss but it inline the content inside the file.
