# Check if the import of d3 is UMD build compliant (talend-import-d3)

When we have started to work on the CDN, we have seen a big issue to provide great UMD.

We use more and more libraries and many of them are based on d3.
To share d3 between the libs and our libs and project we decided to use d3 internally and use custom build for external libraries.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
import shape from 'd3-shape';
```

Examples of **correct** code for this rule:

```js
import { shape } from 'd3';
```

## When Not To Use It

If you are sure you don't want to be UMD friendly and you are already using tree shaking in that case it makes sense to not use this rule.

## Further Reading

You may want to check our [babel plugins](https://github.com/talend/ui-scripts/tree/master/babel)
