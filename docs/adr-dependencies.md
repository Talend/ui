# Usage of dependencies, peerDependencies, devDependencies in package.json

## Context

Dependencies are specified using the package.json file in library repositories.
We have more and more libraries written and used by projects.

We use different distribution formats for our libraries:

- UMD for some (react-components, react-cmf, etc ...)
- mix of transpiled JS and SASS files which need shared config to make it work for others

## Problems

We see commits with a mix of libraries being added to `peerDependencies` and `dependencies` without real guidelines.
Each change in peerDependencies leads to [a major release](https://github.com/semver/semver/issues/502).

We do not know when to put a dependency in the `"peerDependencies"` or just in the `"dependencies"` attribute of the package.json file.

With yarn, `peerDependencies` are hard to manage. Yarn only outputs a warning the first time it encounters the dependency, when it needs to really install it in your node_modules. It's easy to miss and to forget. We have also seen some false positive warnings.

With npm, peerDependency management depends on the version used:

- npm 1,2,7,8 install peerDependencies
- npm 3,4,5,6 do not install peerDependencies

The documentation of npm only covers the behavior of npm, not the definition and actual usage of these peer dependencies.

We know our project can't use npm > 7.0 because we have some issues in our peerDependencies definitions! 
npm > 7 requires all peer dependencies to be at the same level, the same version. That needs to be fixed on our end.

## Solutions

Define a clear guideline for dependency requirements in the package.json files of libraries.

### Guideline

**`"devDependencies"`**

Add **a-dependency** under `devDependencies` if **a-dependency** is used only to build, debug, or because A is also a peerDependencies.

Basically use `devDependencies` if this dependency has no impact on runtime.

examples:

- @talend/scripts-core
- @talend/scripts-preset-react-lib
- i18next-scanner
- cross-env
- react (if in peerDependencies)

Type dependencies (usually in the format `@types/some-js-library`) can be added to `devDependencies` only if the exported types for the library you're working on do not depend on it.

```javascript
import { LibType } from 'some-js-library';

// If this export is available in the bundle, then your bundle has an actual dependency to LibType
export myLibType = LibType & { isActive: boolean };
```


**`"dependencies"`**

Add **a-dependency** under `dependencies` only if it is used by the code and does not fall under peerDependencies.

examples:

- @talend/design-token
- @talend/router-bridge
- @talend/react-components
- @talend/react-containers
- @talend/react-datagrid
- @talend/react-dataviz
- classnames
- keycode
- lodash
- prop-types
- date-fns
- react-bootstrap

As we've discussed, add type files to dependencies if your exported types depends on it.

**`"peerDependencies"`**

Add **a-dependency** under peerDependencies only if the consumer will need to import or configure something out of that dependency in order to make your library work (ex: i18next is used in my library, the host project will need to configure it for the library to run)

At the [begining in 2013](https://nodejs.org/en/blog/npm/peer-dependencies/) the peerDependencies as heen created to cover the Plugin needs.
So **a-dependency** can be added even if your library do not use it.

examples:

- @talend/design-system
- @talend/react-cmf
- react
- react-dom
- i18next
- react-i18next
