# usage of Dependencies, peerDependencies, devDependencies in package.json

## Context

Dependencies are specified using the package.json file in library repositories.
We have more and more libraries written and used by projects.

We use different distribution formats for our libraries:

- UMD for some (react-components, react-cmf, etc ...)
- mix of transpiled js and sass files which need shared config to make it work for others

## Problems

We see commits with mix of peerDependencies and dependencies without real guidelines.
Each change in peerDependencies lead to a major release.

We do not know when to put a dependencies in `"peerDependencies"` or just in `"dependencies"` attribute of the package.json

With yarn peerDependencies are hard to manage. It just does a warning the first time , when it needs to really install it in your node_modules. So it is easy to forget it. We have also seen some false positive warnings.

With npm it depends the version, the behavior change:

- npm 1,2,7,8 install peerDependencies
- npm 3,4,5,6 do not install peerDependencies

The documentation of npm only cover the behavior of npm note the definition and usage of theses.

We know our project can't use npm > 7.0 because we have some issues in our peerDependencies definitions ! That need to be fixed.

## Solutions

Define a clear guideline and usage of when and how to write the requirements in package.json of libraries.

### Guideline

**`"devDependencies"`**

Add **a-dependency** under devDependencies if **a-dependency** is used only to build, debug, or because A is also a peerDependencies.

examples:

- @talend/scripts-core
- @talend/scripts-preset-react-lib
- i18next-scanner
- cross-env
- react (if in peerDependencies)

The case of **@types/some-js-library**: only if your exported types do not depends on it.

**`"dependencies"`**

Add **a-dependency** under dependencies only if it is used by the code and do not fall under peerDependencies.

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

The case of **@types/some-js-library**: only if your exported types depends on it.

**`"peerDependencies"`**

Add **a-dependency** under peerDependencies only if it is has to be installed and configured (so imported) into the project code to make your library working.

At the [begining in 2013](https://nodejs.org/en/blog/npm/peer-dependencies/) the peerDependencies as heen created to cover the Plugin needs.
So **a-dependency** can be added even if your library do not use it.

examples:

- @talend/design-system
- @talend/react-cmf
- react
- react-dom
- i18next
- react-i18next
