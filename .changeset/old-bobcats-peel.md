---
'@talend/scripts-config-babel': major
'@talend/scripts-config-react-webpack': minor
'@talend/react-cmf-webpack-plugin': minor
'@talend/react-faceted-search': minor
'@talend/storybook-docs': minor
'@talend/design-system': minor
'@talend/router-bridge': minor
'@talend/react-storybook-cmf': minor
'@talend/ui-storybook-one': minor
'@talend/react-bootstrap': minor
'@talend/design-docs': minor
'@talend/react-cmf-router': minor
'@talend/react-components': minor
'@talend/react-containers': minor
'@talend/ui-playground': minor
'@talend/scripts-utils': minor
'@talend/module-to-cdn': minor
'@talend/scripts-core': minor
'@talend/react-cmf-cqrs': minor
'@talend/react-dataviz': minor
'@talend/react-stepper': minor
'@talend/react-forms': minor
'@talend/icons': minor
'@talend/react-sagas': minor
'@talend/http': minor
'@talend/react-cmf': minor
---

[major]tools/scripts-config-babel: will expose babel.config.js instead of .babelrc.json (you will have to update your config)
[minor]fork/module-to-cdn: update babel config, remove link to scripts-core to run lint, add missing deps
[minor]fork/react-bootstrap: update babel config, add missing deps
[minor]packages/cmf-cqrs: update babel config, add missing deps
[minor]packages/cmf-router: update babel config, add missing deps
[minor]packages/cmf: update babel config, add missing deps, fix import of scripts-config-jest
[minor]packages/components: update babel config, add missing deps, add a tsconfig.build.json to exclude test files
[minor]packages/containers: update babel config, add missing deps
[minor]packages/dataviz: update babel config, add missing deps, remove useless config of jest (use the common), fix config issue in tsconfig.json
[minor]packages/design-docs:update babel config, remove link to design-system (circular dep), add missing deps
[minor]packages/design-system: update babel config, add missing deps
[minor]packages/faceted-search: update babel config, add missing deps
[minor]packages/forms: update babel config, add missing deps
[minor]packages/http: update babel config, add missing deps, fix tsconfig
[minor]packages/icons: update babel config, add missing deps, fix scripts, prepare script for pnpm
[minor]packages/playground: update babel config, add missing deps
[minor]packages/router-bridge: update babel config, add missing deps
[minor]packages/sagas: update babel config, add missing deps
[minor]packages/stepper: update babel config, fix prettier config, add missing deps, add tsconfig.build.json to exclude test
[minor]packages/storybook-cmf: update babel config, add missing deps
[minor]packages/storybook-docs: update babel config, add missing deps, remove ref to design-system and icons(circular dep), adapt code for pnpm
[minor]packages/storybook-one: update babel config, fix for pnpm (not possible to ref a package to itself), add missing deps
[minor]tools/cmf-webpack-plugin: update babel config, use it's own eslint config (circular dep), add missing deps
[minor]tools/scripts-config-react-webpack: update ref to babel config, use it's own eslint config (circular dep), adapt code for pnpm
[minor]tools/scripts-core: update ref to babel config
[minor]tools/scripts-utils: add missing babel config file, use it's own eslint config (circular dep), fix test to use package existing in the package.json, add missing deps, adapt code for pnpm
