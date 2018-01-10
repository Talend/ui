Before 1.0, the stack do NOT follow semver version in releases.

This document aims to ease the WIP migration from a version to another by providing intels about what to do to migrate.

## v0.141.0
* Container: DeleteResource
* PR [fix(container/deleteResource): change so keyboard shortcut can be supported ](https://github.com/Talend/ui/pull/958)
* Changes

The parameter used to properly compute resource information and how to call the URL to delete resource
have moved from view settings to a saga factory

see documentation added on how to use this peculiar container

## V0.140.0

* Containers: need to be configured
* PR [feat(containers): register all containers](https://github.com/Talend/ui/pull/XXX)
* Changes:

Before Containers was working on it's own.
Now you need to register them in your configure.js (it's CMF)

```javascript
import { registerAllContainers } from '@talend/react-containers/lib/register';

registerAllContainers();
```

## v0.138.0

* CMF: HTTP middleware
* PR [feat(cmf/http): CSRFToken support](https://github.com/Talend/ui/pull/XXX)
* Changes:

Some constant from CMF/middlewares/http/constants are renamed

| Before        | After                     |
| ------------- | ------------------------- |
| HTTP_REQUEST  | ACTION_TYPE_HTTP_REQUEST  |
| HTTP_RESPONSE | ACTION_TYPE_HTTP_RESPONSE |
| HTTP_ERRORS   | ACTION_TYPE_HTTP_ERRORS   |

## v0.137.0

* Component: Slider
* PR: [fix: remove Slider from the global export](https://github.com/Talend/ui/pull/932)
* Changes :

| Before | After |
|---|---|
| import { Slider } from '@talend/react-component'; | import Slider from '@talend/react-component/lib/Slider' |

## v0.130.0

* Component: TreeView
* PR: [feat(SelectObject): display results as ListGroupItem](https://github.com/Talend/ui/pull/880)
* Changes :

| Before                                                           | After                                     |
| ---------------------------------------------------------------- | ----------------------------------------- |
| generated id was undefined-add on the add button if no was given | no id is generated for the the add button |

## v0.125.0

* Component: ListView
* PR: [feat(ListView): i18n](https://github.com/Talend/ui/pull/850)
* Changes :

| Before            | After                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| emptyLabel        | i18next `t()` fn will do the magic trick by providing `LISTVIEW_EMPTY`                          |
| noResultLabel     | i18next `t()` fn will do the magic trick by providing `LISTVIEW_NO_RESULT`                      |
| toggleAllLabel    | i18next `t()` fn will do the magic trick by providing `LISTVIEW_ITEMS_TOGGLE_ALL`               |
| searchPlaceholder | i18next `t()` fn will do the magic trick by providing `LISTVIEW_HEADERINPUT_SEARCH_PLACEHOLDER` |

* Component: SidePanel
* PR: [feat(components/sidepanel): accept custom action ids](https://github.com/Talend/ui/pull/846)
* Changes :

Before this, action ids were ignored. Now, if an id is provided per action, it will be used instead of the label ; so it could break some QA tests.

## v0.121.0

* Component: SidePanel
* PR: [feat(SidePanel): i18n](https://github.com/Talend/ui/pull/818)
* Changes :

| Before        | After                                                                      |
| ------------- | -------------------------------------------------------------------------- |
| expandTitle   | i18next `t()` fn will do the magic trick by providing `SIDEPANEL_EXPAND`   |
| collapseTitle | i18next `t()` fn will do the magic trick by providing `SIDEPANEL_COLLAPSE` |

## v0.120.0

* PR 807 [enhancement(component/Headerbar): small change]

The brand of the header bar used `name` to be rendered as the application title.

Using containers and cmf, `name` is used to resolve `CMFAction` from the registry.

To be able to use name to describe the CMFAction associated to the Brand section of the header bar,
`label` has to be used for application title rendering and `name` to resolve `CMFAction`

## v0.96.0

* PR #629 [feat(theme): update colors]

4 colors are gone :

* $limeade : replace by $rio-grande
* $pirate-gold : not used
* $mine-shaft : replace by $dove-gray
* $smalt-blue : not used

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

| The `mutateCollection` operations | Old format                    | New format                 |
| --------------------------------- | ----------------------------- | -------------------------- |
| delete                            | Array of index                | Array of item id           |
| update                            | Map of key/value = index/item | Map of key/value = id/item |

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

- Action structure must be in payload
- [PR 135](https://github.com/Talend/ui/pull/135)
- Changes:

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
