# How to add a new page

To add a new page on a new route using CMF, you need to perform these steps :

* [Create your connected container](#create-your-connected-container) that will be displayed on the new route.
* [Register you component](#register-your-component)
* [Register your action creator](#register-your-action-creator)
* [Add your route Settings configuration](#add-your-route-settings-configuration)
* [Add your views Settings configuration](#add-your-views-settings-configuration)
* [Add your actions Settings configuration](#add-your-actions-settings-configuration)

Then your component will be rendered in your new route.
The examples below configure
* a `/newRoute` route
* display a connected `<MyContainer />` container
* dispatch a click action via the `my:action` action creator

## Create your connected container

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import cmf, { cmfConnect } from 'react-cmf';

/**
 * Pure component
 */
function MyComponent(props) {
    return (
        <Button
            onClick={(event) => props.onClick(event)}
            role={props.link ? 'link' : null}
        >
            {props.label}
        </Button>
    );
}
MyComponent.propTypes = {
    label: PropTypes.string.isRequired,
    link: PropTypes.bool,
    onClick: PropTypes.func.isRequired, // the pure component waits for the dispatch action
};

/**
 * The container will resolve the action from actionId and pass the dispatcher to the pure component
 */
class MyContainer extends React.Component {
    static displayName = 'MyContainer';
    static propTypes = {
        label: PropTypes.string.isRequired,
        link: PropTypes.bool,
        ...cmfConnect.propTypes,
    }

    onClick(event) {
        this.props.dispatchActionCreator('my:action');
    }

    render() {
        return (
            <MyComponent {...this.props} onClick={this.onClick} />
        );
    }
}

/**
 * Get the component view state
 */
function mapStateToProps(state, ownProps) {
    return {
        //... your sub state
    };
}

// connect your container to redux
export default cmfConnect({mapStateToProps})(MyContainer);
```

To learn more on that take a look at [cmfConnect](../src/cmfConnect.md)

## Register your component

In your app configuration phase, _configure.js_

```javascript
import cmf from 'react-cmf';
import MyContainer from '../components/my-container';

cmf.component.register('MyContainer', MyContainer);
```

## Register your action creator

In your app configuration phase, _configure.js_

```javascript
import cmf from 'react-cmf';
import myAction from '../actions/my-action';

cmf.actionCreator.register('my:action', myAction);
```

## Add your route Settings configuration

In your app _settings.json_

```json
{
    "routes": {
        "path": "/",
        "component": "App",
        "childRoutes": [
            {
                "path": "newRoute",
                "component": "MyContainer",
                "view": "myContainerView"
            }
        ]
    }
}
```

## Add your props settings configuration

In your app _settings.json_

```json
{
    "props": {
        "MyContainer#myContainerView": {
            "label": "my action",
            "link": true
        }
    }
}
```

## Add your actions settings configuration

In your app _settings.json_

Here we rely on an actionCreator, but you can pass a `payload` object property instead of the `actionCreator` that would be dispatched to redux.

```json
{
    "actions": {
        "myClickAction": {
            "id": "myClickAction",
            "actionCreator": "my:action"
        }
    }
}
```
