Before 1.0, the stack do NOT follow semver version in releases.

This document aims to ease the WIP migration from a version to another by providing intels about what to do to migrate.

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
