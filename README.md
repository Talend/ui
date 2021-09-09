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

:warning: If you've used `lerna bootstrap` in the past, please start by running `lerna clean` or you will have bad behavior with the following tools.

We have quick access from the root to the following npm scripts:

* prepublishOnly
* test
* lint

In each packages you will also find a start command to play with the package.

The CI will ensure on each PR that test and lint are OK before you can merge your pull request. It will also provide you a demo so reviewers can play with your change and try to find impact of your PR on other packages.

## Versions and breaking changes

The stack is stable and we do our best to not break APIs.
To handle versions we rely on [**changeset**](https://github.com/atlassian/changesets/). So on each PR you will be able to request a release intent along your changes. It will fill automatically the changelog at release time. Do not forget to commit the file outputed by the changeset CLI.

## More

If you want to know more (release, versions, etc ...) please take a look on [the wiki](https://github.com/Talend/ui/wiki)
