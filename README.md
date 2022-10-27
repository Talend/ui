# UI

That repository was created in an effort to simplify the development of Talend's front-end stack.

## Goals

- Single code repository / Multiple packages
- Global (cross package) test and review tools
- Easy cross packages development
- Share and love open source

## The stack

- [react-cmf](https://github.com/Talend/ui/tree/master/packages/cmf)
- [react-talend-containers](https://github.com/Talend/ui/tree/master/packages/containers)
- [react-talend-components](https://github.com/Talend/ui/tree/master/packages/components)
- [react-talend-forms](https://github.com/Talend/ui/tree/master/packages/forms)
- [talend-icons](https://github.com/Talend/ui/tree/master/packages/icons)
- [bootstrap-talend-theme](https://github.com/Talend/ui/tree/master/packages/theme)

## Tools (dev environment)

This repository works with yarn workspaces. So for example if you want to launch test, you can just do

    yarn test

If you want you can also just run any scripts on a dedicated package:

    yarn workspace @talend/design-system run start

`start` script exists on each package and run a dedicated demo of the corresponding package. Most of them are done using storybook.

The build of each packages is done is two steps:

- build:lib is done at postinstall and will create lib folder output from babel + scss files copied into it.
- pre-release will launch webpack to build the UMD output of the pacakge.

### workspace-run.js

A script `workspace-run.js` exists with options to extends the capacities of yarn workspace.

| env                | value example | description                                                                       |
| ------------------ | ------------- | --------------------------------------------------------------------------------- |
| LOCATION           | tools         | execute npm scripts only for packages in a given location, packages, fork, tools. |
| EXECUTE_PARALLEL   | 1             | Speed up run by execute stuff in //                                               |
| WORKSPACE_RUN_FAIL | no-bail       | continue even if failed                                                           |
| VERBOSE            | true          | display all outputs of commands                                                   |

Example : run all tests of tools in //:

    EXECUTE_PARALLEL=1 LOCATION=tools node workspace-run.js test.

## CI

The CI is done in the `.github` folder so github actions.

When you open a PR the CI will ensure test and lint are OK before you can merge your pull request. It will also provide you a demo so reviewers can play with your change and try to find impact of your PR on other packages.

## Versions and breaking changes

The stack is stable and we do our best to not break APIs.
To handle versions we rely on [**changeset**](https://github.com/atlassian/changesets/). So on each PR you will be able to request a release intent along your changes. It will fill automatically the changelog at release time. Do not forget to commit the file outputed by the changeset CLI.

## More

If you want to know more (release, versions, etc ...) please take a look on [the wiki](https://github.com/Talend/ui/wiki)
