# ACTION DROPDOWN COMPONENT

This component display a dropdown with items in it. It used react-bootstrap component DropdownButton, MenuItem.

## RENDERING

#### CORE
The main component used DopdownButton from react-bootstrap
```javascript
	<DropdownButton
			title={title}
			bsStyle={style}
			role="button"
			onSelect={onItemSelect}
			className={classNames(theme['tc-dropdown-button'], 'tc-dropdown-button')}
			{...rest}
		>
			{chooseMenuItemRendering(getComponent, items, components)}
		</DropdownButton>
```
You can define a title, bsStyle etc...

A onSelect callback can be used 
```javascript
	function onItemSelect(object, event) {
		if (onSelect) {
			onSelect(event, object);
		}
	}
```

#### OVERLAY
You can add an overlay to the main dropdown button. It will used TooltipTrigger from react-bootstrap.
```javascript
	if (hideLabel || tooltipLabel) {
		return (
			<TooltipTrigger label={tooltipLabel || label} tooltipPlacement={tooltipPlacement}>
				{dropdown}
			</TooltipTrigger>
		);
	}
```


#### DOPDOWN ITEMS
Will choose the right function to render dropdown items (items or components props).
If the props are empty, the func will return a MenuItem with no options label. 
```javascript
    function chooseMenuItemRendering(getComponent, items, components) {
	if (
		getComponent &&
		Array.isArray(get(components, 'itemsDropdown')) &&
		components.itemsDropdown.length > 0
	) {
		return components.itemsDropdown.map((component, index) =>
			injectMenuItem(getComponent, component, index),
		);
	}
	if (items.length > 0) {
		return items.map(getMenuItem);
	}
	return <MenuItem disabled>No options</MenuItem>;
}
```
## DROPDOWN ITEMS

You have two different ways to defines this items. 
Also there is some kind of special item, the divider. It will be a simple ```javascript { divider: true } ```, it will create a divider between your items.
##### 1 ) With items props
```javascript
    	items: [
		{
			id: 'context-dropdown-item-document-1',
			icon: 'talend-file-json-o',
			label: 'document 1',
			onClick: action('document 1 click'),
		},
		{
			divider: true,
		},
		{
			id: 'context-dropdown-item-document-2',
			label: 'document 2',
			onClick: action('document 2 click'),
		},
	],
```
This items will be consume by 
```javascript
function getMenuItem(item, index) {
	if (item.divider) {
		return <MenuItem key={index} divider />;
	}
	return (
		<MenuItem key={index} eventKey={item} {...item} onClick={wrapOnClick(item)}>
			{item.icon && <Icon name={item.icon} />}
			{item.label}
		</MenuItem>
	);
}
```
##### 2 ) With components props

With components you have to give a getComponent function (if you used a cmf connected container, it will be passed for), it will be used to retrieve the component you ask for.
And a components object with the attribute itemsDropdown. ItemsDropdown key is a placeholder for the content of the dropdown. 
```javascript
	components: {
		itemsDropdown: [
			{
				component: 'Action',
				label: 'First item',
			},
			{
				divider: true,
			},
			{
				component: 'FilterBar',
				dockable: false,
				docked: false,
			},
			{
				component: 'Action',
				label: 'Second item',
			},
		],
	},
```
The components items will be consume by
```javascript
function injectMenuItem(getComponent, { component, divider, ...rest }, index) {
	if (divider) {
		return <MenuItem key={index} divider />;
	}
	return (
		<MenuItem key={index}>
			<Inject component={component} getComponent={getComponent} {...rest} />
		</MenuItem>
	);
}
```

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
getComponent | function used to retrieve component passed by components
components | itemsDropdown : an array of items that will be used in the dropdown

___
Props | default
------------ | -------------
bsStyle| default
tooltipPlacement| top
items | []




