# Check if the import depth let your code be UMD build compliant (talend-import-depth)

When we have started to work on the CDN, we have seen a big issue to provide great UMD.

At the same time, we wanna keep the tree shaking approach possible in components libraries like @talend/react-components.

To get both we have concluded that we can afford both if we stick to import to the first level of a module,
so you can get only one component in Talend/ui and at the same time use UMD if you use most of it.

Note on the project side like @talend/dataset we have issues that the components can not be reused outside, you have to initiate the whole module.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
import ListComposition from '@talend/react-components/lib/List/ListComposition';
import match from '@talend/react-cmf/lib/matchPath';
```

Examples of **correct** code for this rule:

```js
import List from '@talend/react-components/lib/List';
import cmf from '@talend/react-cmf';

const { ListComposition } = List;
const match = cmf.router.matchPath;
```

## When Not To Use It

If you are sure you don't want to be UMD friendly and you are already using tree shaking in that case it makes sense to not use this rule.

## Further Reading

You may want to check our [babel plugins](https://github.com/talend/ui-scripts/tree/master/babel)
