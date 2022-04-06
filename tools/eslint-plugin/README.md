# @talend/eslint-plugin-talend

This package contains internal rules used at Talend.

## Installation

You have nothing to do if you use Talend/ui-scripts.


## Usage

Add `talend` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@talend"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@talend/import-depth": 2
    }
}
```

## Supported Rules

* [talend/import-depth](./docs/rules/talend-import-depth.md)
* [talend/import-d3](./docs/rules/talend-import-d3.md)





