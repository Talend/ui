# @talend/react-components

A set of stateless components which follows the [Talend Guidelines](http://guidelines.talend.com)

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![peerdependencies][peerdependencies-image] ][peerdependencies-url]

[npm-icon]: https://nodei.co/npm/@talend/react-components.png?downloads=true
[npm-url]: https://npmjs.org/package/@talend/react-components
[travis-ci-image]: https://travis-ci.org/Talend/react-talend-components.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/react-talend-components
[dependencies-image]: https://david-dm.org/Talend/ui/status.svg?path=packages/components
[dependencies-url]: https://david-dm.org/Talend/ui?path=packages/components
[devdependencies-image]: https://david-dm.org/Talend/ui/dev-status.svg?path=packages/components
[devdependencies-url]: https://david-dm.org/Talend/ui?path=packages/components&type=dev
[peerdependencies-image]: https://david-dm.org/Talend/ui/peer-status.svg?path=packages/components
[peerdependencies-url]: https://david-dm.org/Talend/ui?path=packages/components&type=peer

## Conventions

Please look at our [CONTRIBUTING](https://github.com/Talend/tools/blob/master/tools-root-github/CONTRIBUTING.md) first.

Please read our [style guidelines](http://guidelines.talend.com) first.

## Supported browsers

<img src="https://camo.githubusercontent.com/46a1f6891a7e0d7f74956a056b19d6ba5b76a3be/68747470733a2f2f7777772e62726f77736572737461636b2e636f6d2f696d616765732f6c61796f75742f62726f77736572737461636b2d6c6f676f2d363030783331352e706e67" alt="BrowserStack logo" width="120" height="63">

Thanks to [BrowserStack](https://www.browserstack.com/) for providing real browser testing infrastructure.

### How to create a new component

All components are created using the [yeoman talend generator](https://github.com/Talend/generator-talend) using stateless option.

    yo talend:react-component
    > (nature) stateless
    > (tests) snapshot

### No {children} for leaf

We want to avoid {children} as much as possible.
We believe an app should only pass arguments to stateless components.

So please don't do Pull Requests (PR) to add {children} on leaf components.

But what is a leaf component ?
It's a component that is not supposed to contain another component.
For example the following components are leaf components:

* AppHeaderBar
* SidePanel
* List
* Breadcrumb
* Icon
* Action(s)

But the following are not leaf:

* Layout

If you feel the need to add {children} this means we have forget a use case.
In this case please expose your use case and try to see how
it could be done by passing some props.

### Different state in a component

The components have to manage the different state defined in the [guidelines](https://company-57688.frontify.com/document/92132#/messaging-communication/loading-feedback).

| State      | Description                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| default    | render the component                                                                                   |
| loading    | State when the component is loading (waiting data from the server). It shows the skeleton or a spinner |
| inProgress | State when the component is waiting (waiting data to refresh the component). It shows the heatbeat     |

### onClick / onEvent

The API we have for all components is the following for an event handler

```javascript
function onClick(event, payload) {
	//do what ever you want
}
return <APureComponents onClick={onClick} />
```

### Write tests + docs

Our tests are using the react-test-renderer aka snapshot testing.
This is by far the best tool to test pure components.

For the documentation and developpement environnement
we are using [React StoryBook](https://getstorybook.io).

```shell
    npm start
```

### No anchor

If you want to create a link
please use Action component which accept a _link_ prop.

Anchor need href. We are in a single page application, so JavaScript
decides the behavior, not the browser.
So we don't want to see any anchor link in the markup.

If you want to use Button from react-bootstrap don't forget
to add the role + bsStyle="link".

```javascript
const model = {id: 'my-id'};
function onClick(event, payload) {
	//do what ever you want
	payload.action.label === 'click me';
	payload.model === model;
};
<Action
	label="click me"
	icon="svg-yeah"
	onClick={onClick}
	model={model}
/>
```

### Use Icon for icon

We all are used to `<i className="fa fa-XX" />` but this is finished now.
We are using `<Icon name="fa-xx" />` because with this one we are able
to support svg icons which is on the way to be our next gen icons sets.

If you want you can register an new Icon this way:

```javascript
Icon.register(
	'svg-test',
	<svg viewBox="0 0 20 20">
		<path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03" />
	</svg>
);
```

### Add component into screenshot CI

open screenshots.config.json file.

The top of the file should stay unchanged.
The stories are registred this way:

```json
{
    "Action": {
      "default": [
        {
          "name": "action-default",
          "selector": ["#default", "#hidelabel"]
        }
      ]
    }
}
```

* _Action_ is the string name of 'storiesOf(' call
* _default_ is the exact string of the .add / .add call
* the content is an array of Object with name + selector
* _name_ will be the name of the screenshot(s)
* _selector_ is a string or an array of string which is behind used to call document.querySelect(_selector_) so you can try your selector.

## npm scripts

* npm start -> launch storybook on localhost:6006
* npm run prepublish -> build the sources into the lib folder
* npm test -> to execute unit test
* npm run lint -> check the code style
* npm run watch -> watch the source to trigger a build

## LICENSE

Copyright (c) 2006-2016 Talend

Licensed under the Apache V2 License

# List of components

You can find full demo at http://talend.surge.sh/components

* [SubHeaderBar](src/SubHeaderBar/SubHeaderBar.md)
