
# ACTION ICON TOGGLE CONTAINER

This container helps to create the actions that will be used in the [ActionIconToggle.component](https://github.com/Talend/ui/blob/master/packages/components/src/Actions/ActionIconToggle/ActionIconToggle.component.js)

An example of use
```javascript
cmf.settings.actions = {
	'my-awesome-action-from-registry': {
        // will get action registered in CMF and spread it in component's props 
        // it must follow the settings defined in the next actions
    	actionId: 'toggle-my-awesome-action',		
	},
	
	'my-awesome-action-from-creator': {
		className: 'my-awesome-classname',
		icon: 'talend-awesome-icon',
		id: 'my-awesome-action-id',
		label: 'My awesome label',
		tooltipPlacement: 'top',
		
		// will resolve the expression registered in CMF to set the active props
		activeExpression: 'is-my-awesome-action-active',
		
		// will resolve the action creator registered in CMF
		actionCreator: 'toggle-my-awesome-action-creator',
	},
	
	'my-awesome-action-from-pure-settings': {
		className: 'my-awesome-classname',
		icon: 'talend-awesome-icon',
		id: 'my-awesome-action-id',
		label: 'My awesome label',
		tooltipPlacement: 'top',
		
		// will resolve the expression registered in CMF to set the active props
		activeExpression: 'is-my-awesome-action-active',
		
		// will dispatch this payload
		payload: {
			type: 'TOGGLE-MY-AWESOME-ACTION'
		},
	},
};

function Example() {
	// from action id
    return (
        <ActionIconToggle
            actionId={'toggle-my-awesome-action'}
        />
    );
    
    // static props
    return (
        <ActionIconToggle
            className={'my-awesome-classname'}
            icon={'talend-awesome-icon'}
            id={'my-awesome-action-id'}
            label={'My awesome label'}
            tooltipPlacement={'top'}
            payload={{ type: 'TOGGLE-MY-AWESOME-ACTION' }}
            active
        />
    );
    
    // active expression
    return (
        <ActionIconToggle
            {...staticProps}
            activeExpression={'is-my-awesome-action-active'}
        />
    );
    
    // action creator
    return (
        <ActionIconToggle
            {...staticProps}
            actionCreator={'toggle-my-awesome-action-creator'}
        />
    );
}
```

## REF
Props | Usage
------------ | -------------
actionId | a string that match an action in the registry
actionIds | an array of string that match actions in the registry. They will be transform in items props for the component.
components | see ActionDropdown.component markdown






