# Breaking changes log

Before 1.0, `react-talend-components` do NOT follow semver version in releases.
This document aims to ease the WIP migration from a version to another by providing intels about what to do to migrate.

## v0.25.5
* Component: Drawer
* PR: [fix(Drawer): Animation on leave is now possible](https://github.com/Talend/react-talend-components/pull/150)
* Changes: The animation has to be in a different component

```javascript
<Drawer>Hello world</Drawer>
```

should be (if you want to keep the animation):

```javascript
<Drawer.Animation>
  <Drawer>Hello world</Drawer>
</Drawer.Animation>
```

* Component: SelectSortBy
* PR: [refactor(SelectSortBy): change selection process of SortBy](https://github.com/Talend/react-talend-components/pull/149)
* Changes

| Old Properties | New Properties|
|---|---|
| props.sortBy | props.sortOptions |
| - | props.sortBy |

## v0.25.4
* Module: List
* PR : [fix(list): reorganize props](https://github.com/Talend/react-talend-components/pull/147)
* Changes:

| Old Props | New props |
|---|---|
| props.ifSelected | props.itemProps.isSelected |
| props.onElementSelect | props.itemProps.onSelect |
| props.onToggleSingle | props.itemProps.onToggle |
| props.onToggleAll | props.itemProps.onToggleAll |
| props.width | props.itemProps.width |

## v0.25.0
* Module: react-autowhatever
* PR : [refactor(autowhatever_module): move to dependencies instead of devDependencies](https://github.com/Talend/react-talend-components/pull/134)
* Changes: We will not need to add manually react-autowhatever module to your projects' dependency anymore.

## v0.24.0
* Component: List
* PR : [feat(list): title input change management](https://github.com/Talend/react-talend-components/pull/136)
* Changes

| Old Props | New props |
|---|---|
| props.titleProps.onChange | props.titleProps.onEditSubmit |
| props.titleProps.onCancel | props.titleProps.onEditCancel |

| Dependency | Old version | New version |
|---|---|---|
| react | ^15.3.2 | ^15.4.0 |

## v0.23.0
* Component: Drawer
* PR : [feat: add drawers to Layout](https://github.com/Talend/react-talend-components/pull/138)
* Changes: new PEER dependency `"react-addons-css-transition-group": "^15.4.1"`

## v0.18.0
* Component: List
* PR : [feat(list): allow title input mode](https://github.com/Talend/react-talend-components/pull/90)
* Changes

| Old Props | New props |
|---|---|
| props.titleKey | props.titleProps.key |
| props.iconKey | props.titleProps.iconKey |
| props.onTitleClick | props.titleProps.onClick |

## v0.17.2
* Component: all
* PR : [fix(Layout): header height use $navbar-height and brand-primary](https://github.com/Talend/react-talend-components/pull/122)
* Changes : need to provide bootstrap theme var file via `sass-loader` to your chore to compile the sass files. Example [here](https://github.com/Talend/react-talend-components/blob/3fff34fe61e2e9288718d635be871e42a24cdf85/.storybook/webpack.config.js)

## v0.16.0
* Component: Typeahead
* PR : [feat: Typeahead component with search icon](https://github.com/Talend/react-talend-components/pull/83)
* Changes : new PEER dependency `"react-autowhatever": "^7.0.0"`

## v0.15.1
* Component: all
* PR : [fix: add access to bootstrap vars in components](https://github.com/Talend/react-talend-components/pull/108)
* Changes : need to provide bootstrap theme var file via `sass-loader` to your chore to compile the sass files. Example [here](https://github.com/Talend/react-talend-components/blob/51b37a8f28e3659de242dc04d3738d52c1ebc626/.storybook/webpack.config.js)

