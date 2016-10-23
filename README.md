# react-talend-components

A set of stateless components which follows the [Talend Guidelines](http://guidelines.talend.com)

[![NPM][npm-icon] ][npm-url]

[![Travis CI][travis-ci-image] ][travis-ci-url]
[![Quality][quality-badge] ][quality-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]
[![peerdependencies][peerdependencies-image] ][peerdependencies-url]
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2dd69f1168bb43f781fee182a67a00f2)](https://www.codacy.com/app/Talend/react-talend-components)

[npm-icon]: https://nodei.co/npm/react-talend-components.svg?downloads=true
[npm-url]: https://npmjs.org/package/react-talend-components
[travis-ci-image]: https://travis-ci.org/Talend/react-talend-components.svg?branch=master
[travis-ci-url]: https://travis-ci.org/Talend/react-talend-components

[dependencies-image]: https://david-dm.org/Talend/react-talend-components.svg
[dependencies-url]: https://david-dm.org/Talend/react-talend-components
[devdependencies-image]: https://david-dm.org/Talend/react-talend-components/dev-status.svg
[devdependencies-url]: https://david-dm.org/Talend/react-talend-components#info=devDependencies
[peerdependencies-image]: https://david-dm.org/Talend/react-talend-components/peer-status.svg
[peerdependencies-url]: https://david-dm.org/Talend/react-talend-components?type=peer

[quality-badge]: http://npm.packagequality.com/shield/react-talend-components.svg
[quality-url]: http://packagequality.com/#?package=react-talend-components

## Conventions

Please look at our [CONTRIBUTING](https://github.com/Talend/react-talend-components/blob/master/CONTRIBUTING.md) first.

Please read our [style guidelines](http://guidelines.talend.com) first.

### How to create a new component

All components are created using the [yeoman talend generator](https://github.com/Talend/generator-talend) using stateless option.

    yo talend:react-component
    > (nature) stateless
    > (tests) snapshot

### No {children}

We want to avoid {children}.
We believe an app should only pass arguments to stateless components.

So please don't do Pull Requests (PR) to add {children}.

If you feel the need to add {children} this means we have forget a use case.
In this case please expose your use case and try to see how
it could be done by passing some props.

### onClick / onEvent

The API we have for all components is the following for an event handler

```javascript
const onClick(event, payload) {
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
please use Action component which accept a *link* prop.

Anchor need href. We are in a single page application, so JavaScript
decides the behavior, not the browser.
So we don't want to see any anchor link in the markup.

If you want to use Button from react-bootstrap don't forget
to add the role + bsStyle="link".

```javascript
const model = {id: ...};
const onClick(event, payload) {
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

We all are used to ```<i className="fa fa-XX" />``` but this is finished now.
We are using ```<Icon name="fa-xx" />``` because with this one we are able
to support svg icons which is on the way to be our next gen icons sets.

If you want you can register an new Icon this way:

```javascript
Icon.register('svg-test', (<svg viewBox="0 0 20 20"><path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03" /></svg>));
```

## LICENSE

Copyright (c) 2006-2016 Talend

Licensed under the Apache V2 License
