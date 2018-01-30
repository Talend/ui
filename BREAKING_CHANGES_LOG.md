Before 1.0, the stack do NOT follow semver version in releases.

This document aims to ease the WIP migration from a version to another by providing intels about what to do to migrate.

## v0.143.0
* Component: CollapsiblePanel
* PR: [feat(components/collapsiblepanel): style update](https://github.com/Talend/ui/pull/961)
* Changes :

| Old Props | New props |
|---|---|
| selected | status |

* Component: Status
* PR: [feat(components/collapsiblepanel): style update](https://github.com/Talend/ui/pull/961)
* Changes :
Status component has no longer default export.
import Status from '../Status'; ---> import { Status, getbsStyleFromStatus } from '../Status';

## v0.142.0
* Container: HeaderBar
* PR [fix(component/containers): add number of missings displayName ](https://github.com/Talend/ui/pull/985)
* Change

Display name of this component was `HeaderBar` now `Container(HeaderBar)`
Change made for consistency, and also because `HeaderBar` is already in use inside the component repository.

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

## v0.97.0

* PR #634 [feat(VirtualizedList): adapt and enhance component objects]

List component object has entirely changed.

### package name

Before
```xml
<dependency>
    <groupId>com.talend</groupId>
    <artifactId>component-objects</artifactId>
    <version>1.0.0</version>
</dependency>
```
```java
import com.talend.component.*;
```

After
```xml
<dependency>
    <groupId>org.talend</groupId>
    <artifactId>component-objects</artifactId>
    <version>0.97.0</version>
</dependency>
```
```java
import org.talend.component.*;
```

Explanation : this aligns the package name with all talend projects, and align version to Talend/ui

### WebDriver configuration

Before
```java
this.driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
```

After
```java
// removed this configuration
```

Explanation : when the component-objects were instantiated, it was overriding the timeout configuration of the WebDriver.
This should not be here, and only managed by the test project.

### list.getItems()

Before
```java
list.getItems(); // this returns all buttons in the table title cells
```

After
```java
List<WebElement> titles = list
    .getTable(optional_id)              // get the table display component object
    .getItems()                         // get all the items rows
    .stream()
    .map(Item::getTitle)                // get the title button of each items
    .collect(Collectors.toList());

// no simple way, must take all items, map them to all titles, map them to all actions...
List<WebElement> actions = list
    .getTable(optional_id)                                  // get the table display component object
    .getItems()                                             // get all the items rows
    .stream()
    .map(item -> item.getCell(columnKey).getActions())      // get the title cell
    .flatMap(List::stream)                                  // flatten
    .collect(Collectors.toList());
```

Explanation : getting all title buttons and actions is not a real use case. There are more api method to do more precise things.

### list.getItemActionButton(String label, String listType, String action)

Before
```java
final WebElement actionButton = list.getItemActionButton(label, listType, action);

// move mouse to button to trigger mouseover and click
final Actions action = new Actions(driver);
action.moveToElement(actionButton).click().build().perform();
```

After
```java
final Item item = list
    .getTable(optional_id)      // get the table display component object
    .getItem(titleLabel);       // get item row that fit the provided title label

// if you need to get the title button
final WebElement titleButton = item.getTitle();

// if you need to click on title button
item.clickOnTitle();

// if you need to get an item action
final WebElement actionButton = item.getAction(part_of_id_to_match); // the id was "listType:action" before

// if you need to click on an action
item.clickOnAction(part_of_id_to_match); // the id was "listType:action" before
```

Explanation :
 * the buttons should have ids or part of ids that are similar
 * listType and action parameters are specific to a project. They are used to create the id.


### list.hasItem(String name)

Before
```java
final boolean exists = list.hasItem(titleLabel);
```

After
```java
final boolean exists = list.getTable().hasItem(titleLabel);
```

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
