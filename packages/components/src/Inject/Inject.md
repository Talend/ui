# **INJECT**

With the Inject components you can instanciate any component anywhere. This allows a great flexibility in your component design.

The concept is to let you define zone using a props in your component so from the outside a user may
inject in a controlled way some other components.

# How to create a components friend with Inject

Your component add a layout structure so it defines `zones`.
One zone is associate to one `prop`.

Let s take a simple example:

```javascript
function ArticlePage({ header, article, footer}) {
	return (
		<header>
			{header}
		</header>
		<article>
			{article}
		</article>
		<footer>
			{footer}
		</footer>
	);
}
ArticlePage.propTypes = {
	header: PropTypes.element,
	article: PropTypes.element,
	footer: PropTypes.element,
};
```

So your component wait for elements.s
But CMF as a component registry so let s make it work with it:

```javascript
function ArticlePage({ getComponent, header, article, footer}) {
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

The possible types are
* react element (pass the test React.isValidElement)
* string (wanted component name)
* object (component name + props)
* Array of any of the three types below

So ArticlePage is only responsible to give the global structure and styles.

`getComponent` is a function which is able to return a component by it's key.

Sometimes you will need to wrap the injected elements.
To support this you can create a CustomInject which can support specific props


```js
function CustomInject(props) {
	return (
		<div className="column-md-4">
			<Inject {...props} />
		</div>
	);
}

function ArticlePage({ getComponent, header, article, footer}) {
	return (
		<header>
			{Inject.getReactElement(getComponent, header)}
		</header>
		<article>
			{Inject.getReactElement(getComponent, article, CustomInject)}
		</article>
		<footer>
			{Inject.getReactElement(getComponent, footer)}
		</footer>
	);
}

function MyPage() {
	const props = {
		header: { component: 'Title', text: 'A well known example' },
		article: [
			{ component: 'Paragraph',  content: 'Hello world'},
			{ component: 'Paragraph',  content: 'I m on a the second column'},
		],
		footer: { component: 'Comments' }
	};
	return <ArticlePage {...props} />;
}
```

# API

## INJECT.MAP

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

## INJECT.ALL

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

## INJECT.GET

You can use also Inject in a different way.

Like always getComponent is the function accessor to the component.

ComponentId is the component id or name of the desired component. Component is the react component as function.

The function will try to return the component associate to the componentId by using the getComponent function, if not found it will return the Component. It's a safe function used to be sure that you will get a component.

It's a perfect use to replace older component and be sure to not break something.

## INJECT.GETALL

Inject.getAll is based on Inject.get, it just changed a parameters to allow to add multiple component.

{ Action, ActionDropdown: 'MySpecialActionDropdown' }

For the first case we will have the component Action directly.

For the second case we will search with getComponent if a MySpecialActionDropdown' exists, and if not we will return ActionDropdown.
