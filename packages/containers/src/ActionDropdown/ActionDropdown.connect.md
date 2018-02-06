
# ACTION DROPDOWN CONTAINER

This container helps to create the actions that will be used in the [ActionDropdown.component](https://github.com/Talend/ui/blob/master/packages/components/src/Actions/ActionDropdown/ActionDropdown.component.js)

The container
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
An example of use
```javascript
cmf.settings.actions : {
	my-dropdown-action: {
		label: 'My dropdown label',
	},
	'first-item': {
		label: 'My First Item',
		icon: 'talend-icon-file',
	},
	'second-item': {
		label: 'Second Item',
		icon: 'talend-icon-file',
		hideLabel: true,
	},
	'third-item': {
		label: 'Third item',
	},
}
function Example() {
const actionIds = [
	'first-item',
	'second-item',
];
const components = {
		itemsDropdown: [
			{
				component: 'Action',
				actionId: 'third:item',
			},
			{
				divider: true,
			},			
			{
				component: 'FilterBar',
				dockable: false,
				docker: false,
			},
		],
	};
return (
	<div>
		<ActionDropdown 
			actionId="my-dropdown-action"
			actionIds={actionIds}
			components={components}
		/>
	</div>
	)
}
```

## How it works

The container get the object value from the action id in the registry.
You can pass a simple actionId

 ```mySimpleAction: { label: 'MyLabel', ...stuff}```

You can add actionIds to your actionId

 ```myActionWithActionIds : { hideLabel: true, tooltipLabel: 'myToolTipLabel', actionIds: ['first-item', 'second-item'], ...stuff }```
 The actions ids will be evaluated and given as items to the component.
 
You can pass only actionIds

```myActionIds: ['first-item', 'secondItem', ...]```

You can have ActionCreator associate to the items of the dropdown, the onClick will be valorised.




## REF
Props | Usage
------------ | -------------
actionId | a string that match an action in the registry
actionIds | an array of string that match actions in the registry. They will be transform in items props for the component.
components | see ActionDropdown.component markdown






