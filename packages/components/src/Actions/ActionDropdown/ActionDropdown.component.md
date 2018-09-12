# ActionDropdown component

This component displays a dropdown with items in it. It uses react-bootstrap component [DropdownButton](https://react-bootstrap.github.io/components/dropdowns/#btn-dropdowns), [MenuItem](https://react-bootstrap.github.io/components/dropdowns/#menu-items) and [TooltipTrigger](https://react-bootstrap.github.io/components/tooltips/#tooltips).

A basic example of use

```javascript
function Example() {
	/**
	 * here item will be rendered
	 * as simple label
	 * a list divider
	 * an icon with a simple label
	 */

	const items = [
		{
			label: 'item 1',
		},
		{
			divider: true,
		},
		{
			label: 'item 2',
			icon: 'talend-another-icon-file',
		},
	];
	return (
		<div>
			<ActionDropdown
				id="my-dropdown"
				label="My Dropdown"
				icon="talend-icon-file"
				items={items}
				tooltipLabel="My tooltip label"
				tooltipPlacement="down"
			/>
		</div>
	);
}
```

## How it works

#### 1 ) title

The `title` of the `ActionDropdown` can be parameterized with the followings props:

| Props     | type            |
| --------- | --------------- |
| label     | Required String |
| hidelabel | Bool            |
| icons     | String          |

#### 2 ) items

The list of `items` that the `ActionDropdown` will display.

| Props | type                               |
| ----- | ---------------------------------- |
| items | Required (array OR Immutable.List) |

each composed item being an object composed of

| Properties | type            |
| ---------- | --------------- |
| label      | Required String |
| hidelabel  | Bool            |
| icons      | String          |

or just {divider: true}

```javascript
	items: [
		{
			label: 'my-label-firt-item',
		},
		{
			divider: true,
		},
		{
			label: 'my-label-second-item',
			icon: 'my-icon-second-item',
		},
	],
```

#### 3 ) components

This component support [Inject](../../Inject/Inject.md) api.

Using this props you can define additionnal component that your `ActionDropdown` will show.
(This do no permit to alter the render of `items`)

They are 3 slots in the `ActionDropdown` component where you can inject your custom components.

* `beforeItemsDropdown` will allow you to inject one or many components before the item list
* `itemsDropdown` will allow you to inject one or many components just after the item list
* `afterItemsDropdown` will allow you to inject one or many components before the item list (this should be deprecated since this exactly what `itemsDropdown` will do)

Each of this component should be defined as an object using the following api :

| properties    | type                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------ |
| component     | String (Required if not a divider)                                                         |
| divider       | Bool                                                                                       |
| withMenuItem  | Bool                                                                                       |
| menuItemProps | [react-bootstrap](https://react-bootstrap.github.io/components/dropdowns/#menu-item-props) |
| liProps       | Object                                                                                     |

Your component will be wrapped into a `MenuItem` if `withMenuItem` property is set to true
This will give you access to customisation of [react-bootstrap](https://react-bootstrap.github.io/components/dropdowns/#menu-items) `MenuItem` component

The `<li>` and `<MenuItem>` can be deeply customized with menuItemProps and liProps.
You can add them to your component object

```javascript
components: {
	itemsDropdown: [
		{
			component: 'MyComponent',
			withMenuItem: true,
			menuItemProps: {
				className: 'MySpecialClassName',
				...moreStuff,
			},
		},
	],
}
```

#### 4 ) overlay

You can have a overlay / tooltip on the ActionDropdown.

#### 5 ) select callback

With the onSelect props you can add a callback when an item is selected.

## REF

| Props            | Usage                                                                                                                        |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| bsStyle          | string used to define DropdownButton bsStyle (default, primary, sucess, info, warning, danger)                               |
| hideLabel        | boolean that condition the used of overlay                                                                                   |
| icon             | string that defines the icon used in the dropdown button                                                                     |
| items            | array of items displayed in the dropdown                                                                                     |
| label            | string that defines the title used in the dropdown button or in the tooltip                                                  |
| link             | boolean which condition the bsStyle                                                                                          |
| loader           | boolean to indicate if we have to display a loader at then end of the dropdown                                               |
| onSelect         | callback used when dropdown clicked                                                                                          |
| onToggle         | callback used when dropdown is opened or hidden                                                                              |
| tooltipPlacement | string ('up', 'down' ...) to position the tooltip overlay                                                                    |
| tooltipLabel     | string label used to condition the used of overlay and label of overlay                                                      |
| getComponent     | please see the component.md in cmf for more information.                                                                     |
| components       | beforeItemsDropdown, itemsDropdown, afterItemsDropdown : arrays of items or simple object that will be used in the dropdown. |

---

| Props            | default |
| ---------------- | ------- |
| bsStyle          | default |
| tooltipPlacement | top     |
| items            | []      |
