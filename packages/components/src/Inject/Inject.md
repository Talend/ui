# **INJECT**

With the Inject components you can instanciate any component anywhere. This allows a great flexibility in your component design.

The concept is to let you add `slot` in your component so from the outside a user may
inject in a controlled way some other components.

# How to customize components as a user

For components you can pass props like this one:

```js
const props = {
	components: {
		'before-something': [
			{ component: 'Action', label: 'LabelAction1', icon: 'IconAction1' },
			{ component: 'Action', label: 'LabelAction2', icon: 'IconAction2' },
		],
		'after-anything': { component: 'Action', label: 'LabelAction3', icon: 'IconAction3' },
	},
};
return <MyCustomizableComponent components={components} />;
```

The most important here is to understand the structure of the components props.
The attributes keys are the `slot` key which is exposed in the component documentation.
The value should always be an Array of Object.

Each object should have the component key which is the string of the registred Component.
The mecanism inside is to call the props.getComponent function with this component key as only argument.

All other will attributes of this object will be pass as props of the given components.

```js
<Action label="LabelACtion1" icon="IconAction1 />
```

Good practice: If you are using CMF you can use `componentId` props in combination here to then use
props['Action#componentId'] in the settings.

# How to create a customizable components

You have to add two props:

* getComponent: a function which is able to return a component by it's key.
* components: an object with slots as a key and array of props as value.

```js
function Example({ getComponent, components, children }) {
	const inject = Inject.all(getComponent, components);
	const Renderer = Inject.getAll(getComponent, { Something, Anything });
	return (
		<div>
			{inject('before-something')}
			<Renderer.Something />
			{inject('after-something')}
			{inject('before-anything')}
			<Renderer.Anything />
			{inject('after-anything', children)}
		</div>
	);
}
```

could use some more information geared toward the component user like "before-something" is the slot name in which you wish to inject a component, you can find those in the component documentation.

The slots name should be listed in the documentation so a User can easly find them.
For example you can check the documentation of the [SubHeaderBar](../SubHeaderBar/SubHeaderBar.md)

In most of the case you would like to wrap the injection.
To support this you can create a CustomInject which can support specific props

```js
function CustomInject({ nowrap, ...props }) {
	if (nowrap) {
		return <Inject {...props} />;
	}
	return (
		<div className="maclass">
			<Inject {...props} />
		</div>
	);
}

function Example({ getComponent, components }) {
	const inject = Inject.all(getComponent, components, CustomInject);
	return (
		<div>
			{inject('before-something')}
			<Something />
			{inject('before-anything')}
			<Anything />
			{inject('after-anything')}
		</div>
	);
}

function MyUse() {
	const props = {
		components: {
			'before-something': [{ nowrap: true, component: 'Action' }, { component: 'WhatEver' }],
		},
	};
	return <Example {...props} />;
}
```

In this case Action will not be wrapped but WhatEver will be.

# How to support props with React Element and Inject fallback.

Sometimes we want a component which is just a layout structure.
So its props should only be the element we want in each part.

The possible types
* react element (pass the test React.isValidElement)
* string (wanted component name)
* object (component name + props)
* Array of the three types below

So Inject component provide the getReactElement api.
You can use it this way:

```javascript
function ArticlePage({ header, article, footer}) {
	return (
		<header>
			{Inject.getReactElement(getComponent, header)}
		</header>
		<article>
			{Inject.getReactElement(getComponent, article)}
		</article>
		<footer>
			{Inject.getReactElement(getComponent, footer)}
		</footer>
	);
}
ArticlePage.propTypes = {
	header: Inject.getReactElement.propTypes,
	article: Inject.getReactElement.propTypes,
	footer: Inject.getReactElement.propTypes,
};
```

So ArticlePage is only responsible to give the global structure.

# How it works

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
function Example({ getComponent, actionProps, filterProps }) {
	<div>
		<Inject getComponent={getComponent} component="Action" {...actionProps} />
		<Inject getComponent={getComponent} component="FilterBar" {...filterProps} />
	</div>;
}
```

If you used cmfConnect in your component, the getComponent props will automatically valorised with the api.get.component \( it is the default accessor to the cmf registry\). If a component is not found it will return a NotFoundComponent that allows a displayed feedback.

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
function Example({ getComponent, components }) {
	return <div>{Inject.map(getComponent, components)}</div>;
}
```

### INJECT.ALL

```js
const components = {
	'injected-component': [{ nowrap: true, component: 'Action' }],
	'other-component': [{ nowrap: true, component: 'Action' }],
};

const inject = Inject.all(getComponent, components);
{
	inject('injected-component', { customProps: 'customProps' });
}
// return <Action customProps nowrap />
{
	inject('other-component');
}
// retun <Action nowrap />
```

This function helps to instanciate a all bunch of components.
You can pass specific props when you insert the injected component.

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

For the second case we will search with getComponent if a MySpecialActionDropdown' exists, and if not we will return ActionDropdown.

### REFERENCE

```js
function Inject({ getComponent, component, ...props })
Inject.map = function injectMap(getComponent, array)
Inject.all = function injectAll(getComponent, components)
Inject.get = function injectGet(getComponent, componentId, Component)
Inject.getAll = function injectGetAll(getComponent, config)
```
