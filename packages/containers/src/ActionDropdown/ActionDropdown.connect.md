# ACTION DROPDOWN CONNECT

Connect the ActionDropdow container.

#### MAP STATE TO PROPS
```javascript
	let props = {};
	const context = {
		registry: api.registry.getRegistry(),
		store: {
			getState: () => state,
		},
	};
	if (ownProps.actionId) {
		props = api.action.getActionInfo(context, ownProps.actionId);
	}
	const actionIds = ownProps.actionIds || props.actionIds;
	if (actionIds) {
		props.items = actionIds.map(itemId => api.action.getActionInfo(context, itemId));
	}
	return props;
```
Some choices  here.
```javascript
actions = {
'simple-action': {
stuff,
}
 'simple-action-with-actions-ids': {
	 stuff,
	 actionIds: ['first-item', 'second-item'],
 },
 'first-item': {
	 stuff,
 },
'second-item': {
	stuff,
 },
}
```
1 ) You can pass an actionId. It will be evaluate with getActionInfo and assign to props.
If this action have actionIds they will be evaluate.
```javascript
<ActionDropdown actionId="simple-action-with-actions-ids" /> 
```
2 ) Second you can pass directly an actionIds.
```javascript
<ActionDropdown actionIds={['first-item', 'second-item']} /> 
```
3) Or you define the DropdownButton with actionId, and his MenuItem with actionIds.
```javascript
<ActionDropdown actionId="simple-action" actionIds={['first-item', 'second-item']} /> 
```

#### MERGE PROPS
```javascript
export function mergeProps(stateProps, dispatchProps, ownProps) {
	const props = Object.assign({}, ownProps, stateProps, dispatchProps);
	if (props.actionId) {
		delete props.actionId;
	}
	if (props.actionIds) {
		delete props.actionIds;
	}
	return props;
}
```
Here we just delete the unecessary props before passing them to the container.

# ACTION DROPDOWN CONTAINER

#### RENDER

```javascript
export function ContainerActionDropdown({ items, ...props }) {
	if (items) {
		const clikableItems = items.map(item => ({
			...getOnClick(item, props),
			...item,
		}));
		return <ActionDropdown items={clikableItems} {...props} />;
	}
	return <ActionDropdown {...props} />;
}
```

If we have items, we passed them to a function to attach onClick action on them if they have ActionCreator for example.

##### Render with components and Inject approach
The component support Inject approach.
The getComponent function is given by cmfConnect.
The components shape look like this
```javascript
const propsInjectedItems = {
		id: 'injected-items',
		displayMode: 'dropdown',
		label: 'my injected items',
		components: {
			itemsDropdown: [
				{
					component: 'Action',
					actionId: 'menu:first',
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
					actionId: 'menu:second',
				},
			],
		},
	};
```
'itemsDropdown' is the placeholder in ActionDropdown component of the dropdown items.

#### REF
Props | usage
------------ | -------------
items | an array of items that will render in the component ActionDropdown.

