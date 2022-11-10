---
'@talend/react-components': major
---

fix: put types in a /types folder

If you want to give a try on generated types you can use the following configuration in a `types.d.ts` file:

```
declare module '@talend/react-components' {
	export * from '@talend/react-components/types';
}
```
