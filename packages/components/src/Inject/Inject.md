### **INJECT**

With the Inject components you can instanciate any component anywhere. This allows a great flexibility in your component design.

The Inject component looks like this

```js
function Inject({ getComponent, component, ...props })

    if (!getComponent || !component) {
        return null;
    }
    try {
        const Component = getComponent(component);
        return <Component {...props} />;
    } catch (error) {
        return <NotFoundComponent error={error.message} />;
    }
}

Inject.propTypes = {
    getComponent: PropTypes.func,
    component: PropTypes.string,
};
```

```js
function Example({getComponent, actionProps, filterProps }) {
    <div>
        <Inject getComponent={getComponent} component="Action" {...actionProps} />
        <Inject getComponent={getComponent} component="FilterBar" {...filterProps} />        
    </div>
}
```

If you used cmfConnect in your component, the getComponent props will automatically valorised with the api.get.component \( it is the default accessor to the cmf registry\). If a component is not found it will return  a NotFoundComponent that allows a displayed feedback.

If you decide to use your own getComponent, you need to add a throwing error when the component is not found to use the Inject properly.

The Inject component comes with some api function to cover multiple cases.

### INJECT.MAP

```js
Inject.map = function injectMap(getComponent, array) {
    return array.map(props => <Inject getComponent={getComponent} {...props} />);
};
```

This function is quite simple, same as before, we have getComponent, and an array of component, it need to have a shape describe at the bottom.

It will consume the array and return an array of component using the Inject component.

```js
const array = [
{ component: 'Action', label: 'LabelAction1', icon: 'IconAction1' },
{ component: 'Action', label: 'LabelAction2', icon: 'IconAction2' },
];
```

```js
function Example({ getComponent, arrayComponents }) {
return (
    <div>
        {Inject.map(getComponent, arrayComponents)}
    </div>
    )
}
```

### INJECT.ALL

```js
Inject.all = function injectAll(getComponent, components) {
    if (!getComponent || !components) {
        return nothing;
    }
    return key => {
        if (Array.isArray(components[key])) {
            return components[key].map(props => <Inject getComponent={getComponent} {...props} />);
        } else if (typeof components[key] === 'object') {
            return <Inject getComponent={getComponent} {...components[key]} />;
        }
        return null;
    };
};
```

This function helps to instanciate a all bunch of components.

getComponent still the same. For components you can pass something like this

```js
    const components = {
        col1: [
            { component: 'Action', label: 'LabelAction1', icon: 'IconAction1' },
            { component: 'Action', label: 'LabelAction2', icon: 'IconAction2' },
        ],
        col2: { component: 'Action', label: 'LabelAction3', icon: 'IconAction3' },
    };
```

You will have in return a function which accept a string as an argument. This string is a key to match your object attribute name and return the asked component. You will receive an array or a single component of Inject.

```js
function Example({ getComponent, components }) {
    const inject = Inject.all(getComponent, components);
    return(
        <div>
            {inject('col1')}
            <Something />
            {inject('col2')}
            <Anything />          
        </div>
    )
}
```

### INJECT.GET

You can use also Inject in a different way.

```js
Inject.get = function injectGet(getComponent, componentId, Component) {
    if (!getComponent) {
        return Component;
    }
    try {
        return getComponent(componentId);
    } catch (error) {
        return Component;
    }
};
```

Like always getComponent is the function accessor to the component.

ComponentId is the component id or name of the desired component. Component is the react component as function.

The function will try to return the component associate to the componentId by using the getComponent function, if not found it will return the Component. It's a safe function used to be sure that you will get a component.

It's a perfect use to replace older component and be sure to not break something.

### INJECT.GETALL

```js
Inject.getAll = function injectGetAll(getComponent, config) {
    const components = {};
    Object.keys(config).forEach(key => {
        components[key] = Inject.get(getComponent, key, config[key]);
    });
    return components;
};
```

Inject.getAll is based on Inject.get, it just changed a parameters to allow to add multiple component.

{ Action, ActionDropdown: 'MySpecialActionDropdown' }

For the first case we will have the component Action directly.

For the second case we will search with getComponent if a  MySpecialActionDropdown' exists, and if not we will return ActionDropdown.

### REFERENCE

```js
function Inject({ getComponent, component, ...props })
Inject.map = function injectMap(getComponent, array)
Inject.all = function injectAll(getComponent, components)
Inject.get = function injectGet(getComponent, componentId, Component)
Inject.getAll = function injectGetAll(getComponent, config)
```



