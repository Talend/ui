# @talend/babel-plugin-import-from-lib

This package is a babel plugin ready to be used with @talend/react-components and @talend/react-containers

The goal is to minimize bundle size by picking only the needed components.

How to use:

    npm i --save-dev @talend/babel-plugin-import-from-lib
    // or
    yarn add -D @talend/babel-plugin-import-from-lib

Then update your `.babelrc` file:
```diff
"plugins": [
+    "@talend/babel-plugin-import-from-lib",
    ...
]
```

## Options

The plugin supports the `rules` option to assign new rules with the same shape in the rules.json file:

```json
{
    "module-name": {},
    "module-with-lib-folder": {
        "default": "/lib/"
    },
    "module-with-specific-path: {
        "intern": { "path": "/lib/intern" }
    },
    "nodule-with-proxy-to-other": {
        "foo": { "from": "an-other-module/path" }
    }
}
```

# QA

## Q1: I don t see any changes to my bundle size

OK, with version < 4.23 there are basic components which drain all components.
Fix: https://github.com/Talend/ui/pull/2610 included in 4.23.0 version (f14d41ae4d13b54720994244a17b1bcc0acbaf62)

## My App doesn't work once the plugin is activated

You may have a resolution to undefined in some corner case not already handled by the plugin.

The plugin first try to detect corner case. The last operation is a simple shift of import to `/lib`

So please give the corresponding corner case so we can do a fix.

## Is there an alternative ?

Yes you can also use a codemode which is provided in https://github.com/Talend/ui/pull/2607 so your code base is updated using same technics and so you can do the fix yourself because it s your code.
