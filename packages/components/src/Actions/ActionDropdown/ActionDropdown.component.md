
# ACTION DROPDOWN COMPONENT

This component display a dropdown with items in it. It used react-bootstrap component DropdownButton, MenuItem.

## How it works

The main part of the component is the list content  of the dropdown.
To display stuff in it you have two props.
#### 1 ) title
The title of the ActionDropdown can be parameterized with the props icon and label/hidelabel
 
#### 2 ) items 
```javascript
	items: [
		{
			icon: 'my-icon-first-item',
			label: 'my-label-firt-item',
			...stuff,
		},
		{
			divider: true,
		},
		{
			label: 'my-label-second-item',
			...stuff,
		},
	],
```
You must at least have a label in your object, also an icon can be provided.
You can create an object with only a boolean 'divider' that will show a line separator between items. 

#### 3 ) components
```javascript
components: {
	beforeItemsDropdown: [] or {},
	itemsDropdown: [] or {},
	afterItemsDropdown: [] or {},
}
``` 
They are 3 'placeholders' in the component to inject new stuff.
'itemsDropdown' is the classic content list of the dropdown, equivalent to where the items props will be rendered.
And you have a 'beforeItemsDropdown' and 'afterItemsDropdown' key, that will be rendered before or after the itemsDropdown in the list, if you need specific stuff that will give you more flexibility.


The object and the items of the array must have at least a component attribute ```{ component: 'MyComponentName' }```.

You can create an object with a divider and no component. It will render a line between items.
```javascript
<MenuItem divider />
```

The components in ActionDropdown supports also a special prop 'withMenuItem' which is a boolean.
If it's true your component will be wrapped
```javascript
<MenuItem><YourComponent /></MenuItem>
```
The MenuItem component came from react-bootstrap.
If false or undefined you will get
```javascript
<li><YourComponent /></li>
```

The ```<li>``` and ```<MenuItem>``` can be deeply customized with menuItemProps and liProps.
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
Props | Usage
------------ | -------------
bsStyle | string used to define DropdownButton bsStyle
hideLabel | boolean that condition the used of overlay
icon | string that defines the icon used in the dropdown button
items | array of items displayed in the dropdown
label | string that defines the title used in the dropdown button
link | boolean which condition the bstyle
onSelect | callback used when dropdown clicked
tooltipPlacement | string ('up', 'down' ...) to position the tooltip overlay
tooltipLabel | string label used to condition the used of overlay and label of overlay
getComponent | please see the Inject doc to have more information.
components | beforeItemsDropdown, itemsDropdown, afterItemsDropdown : arrays of items that will be used in the dropdown.

___
Props | default
------------ | -------------
bsStyle | default
tooltipPlacement| top
items | []




