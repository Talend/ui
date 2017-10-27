# Breaking changes log

## vLAST
* Component: SidePanel
* PR: [feat(SidePanel): i18n
* Changes :

| Old Props | New props |
|---|---|
| expandTitle | i18next `t()` fn will do the magic trick by providing `SIDEPANEL_EXPAND` |
| collapseTitle | i18next `t()` fn will do the magic trick by providing `SIDEPANEL_COLLAPSE` |

## v0.63.0
* Component: Layout
* PR: [fix(Containers): header instanciation via HomeListView](https://github.com/Talend/ui/pull/155)
* Changes :

| Props | Old Props | New props |
|---|---|---|
| header | AppHeaderBar props | Element that will be rendered on header place |

## v0.46.1
* Component: List
* PR: [fix(List): revert list breaks](https://github.com/Talend/react-talend-components/pull/225)
* Changes : revert breaking changes of 0.46.0

## v0.46.0
* Component: List
* PR: [feat(List): refactor ItemTitle component](https://github.com/Talend/react-talend-components/pull/214)
* Changes

| Old Props | New props |
|---|---|
| props.titleProps | ~~deleted~~ |
| - | props.items[i].display |
| props.itemProps.onToggle | props.itemProps.onOpen |
| props.titleProps.onClick | props.itemProps.onOpen |
| props.titleProps.onEditCancel | props.itemProps.onCancel |
| props.titleProps.onEditChange | props.itemProps.onChange |
| props.titleProps.onEditSubmit | props.itemProps.onSubmit |
| props.sizeOptions | props.itemsPerPageOptions |

## v0.39.0
* Component: List > Toolbar > Pagination
* PR: [feat(Pagination): refactor pagination in accordance with RFC 7644](https://github.com/Talend/react-talend-components/pull/174)
* Changes

| Old Props | New props |
|---|---|
| props.activePage | ~~deleted~~ |
| - | props.startIndex |
| props.itemsLength | props.totalResults |
| props.pageSize | props.itemsPerPage |
| props.sizeOptions | props.itemsPerPageOptions |

## v0.35.1
* Component: SidePanel
* PR: [fix(sidepanel): review + refactor](https://github.com/Talend/react-talend-components/pull/178)
* Changes

| Old Props | New props |
|---|---|
| props.toggleIcon | ~~removed~~ |

## v0.34.0
* Component: List > Toolbar
* PR: [feat(Toolbar): refactor Toolbar properties](https://github.com/Talend/react-talend-components/pull/171)
* Changes

| Old Props | New props |
|---|---|
| props.actions | props.actionBar.actions |
| props.selected | props.actionBar.selected |
| props.multiSelectedActions | props.actionBar.multiSelectedActions |
| props.displayMode | props.display.mode |
| props.onSelectDisplayMode | props.display.onChange |
| props.sortBy | props.sort.field |
| props.sortDesc | props.sort.isDescending |
| props.sortOptions | props.sort.options |
| props.onSelectSortBy | props.sort.onChange |
| props.activePage | props.pagination.activePage |
| props.itemsLength | props.pagination.itemsLength |
| props.onChangePagination | props.pagination.onChange |
| props.pageSize | props.pagination.pageSize |
| props.sizeOptions | props.pagination.sizeOptions |
| props.onFilter | props.filter.onFilter |
| props.debounceMinLength | props.filter.debounceMinLength |
| props.debounceTimeout | props.pagination.debounceTimeout |

## v0.29.0
* Component: Typeahead
* PR: [refactor(typeahead): Simplify API](https://github.com/Talend/react-talend-components/pull/144)
* Changes

| Old Props | New props |
|---|---|
| props.config.isOnlyIcon | props.hasToggle |
| props.config.icon | props.icon |
| props.config.icon.actionStyle | props.icon.bsStyle |
| props.config.onInputIconClick | props.onToggle |
| props.config.isOnTheRight | props.position |
| props.focusedItemIndex | ~~deleted~~ |
| props.focusedSectionIndex | ~~deleted~~ |
| props.inputProps.value | props.value|
| props.inputProps.placeholder | props.placeholder |
| props.inputProps.onBlur | props.onBlur |
| props.inputProps.onKeyDown | props.onChange |
| props.itemProps.onBlur | ~~deleted~~ |
| props.itemProps.onMouseEnter | ~~deleted~~ |
| props.itemProps.onKeyDown | ~~deleted~~ |
| props.itemProps.onClick | props.onSelect |
| props.renderItemData |~~deleted~~ |

## v0.28.0
* Component: List > Toolbar
* PR: [feat(List): actions bar](https://github.com/Talend/react-talend-components/pull/159)
* Changes

| Old Properties | New Properties|
|---|---|
| props.onClickAdd | The Add button can be replaced by an action to set in props.actions properly (see below) |
| props.listActions | props.actions that follow ActionBar.propTypes |

```javascript
props.onClickAdd = () => addFn()
```

is now :

```javascript
props.actions = {
    left: [{
        id: 'add',
        label: 'Add',
        bsStyle: 'primary',
        icon: 'talend-plus',
        onClick: () => addFn()
    }]
}
```

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

