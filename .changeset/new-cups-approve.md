---
'@talend/react-faceted-search': patch
'@talend/storybook-docs': patch
'@talend/design-system': patch
'@talend/design-tokens': patch
'@talend/react-flow-designer': patch
'@talend/router-bridge': patch
'@talend/react-storybook-cmf': patch
'@talend/react-cmf-router': patch
'@talend/react-components': patch
'@talend/react-containers': patch
'@talend/ui-playground': patch
'@talend/ui-storybook': patch
'@talend/react-cmf-cqrs': patch
'@talend/react-dataviz': patch
'@talend/react-forms': patch
'@talend/icons': patch
'@talend/react-cmf': patch
---

chore: clean unnecessary react imports after React v17

removed by running script `npx react-codemod update-react-imports`

see doc https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#removing-unused-react-imports
