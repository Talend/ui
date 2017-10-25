Before 1.0, the stack do NOT follow semver version in releases.

This document aims to ease the WIP migration from a version to another by providing intels about what to do to migrate.

## NEXT VERSION

* PR #629 [feat(theme): update colors]

4 colors are gone :

* $limeade : replace by $rio-grande
* $pirate-gold : not used
* $mine-shaft : replace by $dove-gray
* $smalt-blue : not used

## v0.120.0

* PR 807 [enhancement(component/Headerbar): small change]
The brand of the header bar used `name` to be rendered as the application title.
Using containers and cmf, `name` is used to resolve `CMFAction` from the registry.
To be able to use name to describe the CMFAction associated to the Brand section of the header bar,
`label` has to be used for application title rendering and `name` to resolve `CMFAction`

## v0.71.0

* PR #364 [feat: onTrigger !== onChange]

Form on change was binded not on underlying onChange api but,
on trigger api.

Old on change behavior was migrated to onTrigger property.
On change underlying behavior is now bound to onChange

Before
```javascript
<Form
	data={schema}
	onChange={this.onChange}
	onSubmit={this.onSubmit}
	actions={this.formActions(this.props.definition, this.props.formData.label, onCancelAction)}
	buttonBlockClass={buttonBlockClass}
/>
```
After
```javascript
<Form
	data={schema}
	onTrigger={this.onTrigger}
	onSubmit={this.onSubmit}
	actions={this.formActions(this.props.definition, this.props.formData.label, onCancelAction)}
	buttonBlockClass={buttonBlockClass}
/>
```
Can even use `real` onChange
```javascript
<Form
	data={schema}
	onChange={this.onChange}
	onTrigger={this.onTrigger}
	onSubmit={this.onSubmit}
	actions={this.formActions(this.props.definition, this.props.formData.label, onCancelAction)}
	buttonBlockClass={buttonBlockClass}
/>
```

## v0.66.0
* cmf: collectionAction.mutateCollection
* PR: [feat(CMF): mutate collections based on their ids](https://github.com/Talend/ui/pull/264)
* Changes: the operations are now based on the items ids

| The `mutateCollection` operations | Old format | New format |
|---|---|---|
| delete | Array of index | Array of item id |
| update | Map of key/value = index/item | Map of key/value = id/item |

## next release
* containers: getActionProps
* PR: [chore(containers): expose state and actions APIs](https://github.com/Talend/ui/pull/146)
* Changes: this function doesn't exists anymore. Please use getActionsProps instead.

* Component: TreeView
* https://github.com/Talend/ui/pull/240
* removed removeCallback in favor of custom actions

## v0.61.0
* Component: List
* PR: [feat(List): filter dock mode](https://github.com/Talend/ui/pull/74)
* Changes : props.toolbar.onFilter was taking (value, event) args, it's now aligned with other components (event, value)


* Action structure must be in payload
* [PR 135](https://github.com/Talend/ui/pull/135)
* Changes:

```
                actions['menu:first'] = {
                        label: 'First',
                        icon: 'talend-streams',
-                       type: 'MENU_TEST',
+                       payload: {
+                               type: 'MENU_',
+                       },
                };
```
