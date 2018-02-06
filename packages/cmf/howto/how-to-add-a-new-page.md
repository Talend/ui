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
import { connect } from 'react-redux';
import { api } from 'react-cmf';

/**
 * Pure component
 */
function MyComponent(props) {
    return (
        <Button
            onClick={(event) => this.props.onClick(event)}
            role={this.props.link ? 'link' : null}
        >
            {this.props.label}
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
        ... // your substate
    };
}

// connect your container to redux
export default cmfConnect(mapStateToProps)(MyContainer);
```

To learn more on that take a look at [cmfConnect](../src/cmfConnect.md)

## Register your component

In your app configuration phase

```javascript
import { api } from 'react-cmf';
import MyContainer from '../components/my-container';

api.component.register('MyContainer', MyContainer);
```

## Register your action creator

In your app configuration phase

```javascript
import { api } from 'react-cmf';
import myAction from '../actions/my-action';

api.action.registerActionCreator('my:action', myAction);
```

## Add your route Settings configuration

In your app settings

```json
{
    "actions": ...,

    "views": ...,

    "routes": {
        "path": "/",
        "component": "App",
        ...
        "childRoutes": [
            ...,
            {
                "path": "newRoute",
                "component": "MyContainer",
                "view": "myContainerView"
            }
        ]
    }
}
```

## Add your views Settings configuration

In your app settings

```json
{
    "actions": ...,

    "views": {
        ...,

        "MyContainer#myContainerView": {
            "label": "my action",
            "link": true,
        }
    },
    "routes": ...
}
```

## Add your actions Settings configuration

In your app settings. Here we rely on an actionCreator, but you can pass a `payload` object property instead of the `actionCreator` that would be dispatched to redux

```json
{
    "actions": {
        ...,

        "myClickAction": {
            "id": "myClickAction",
            "actionCreator": "my:action"
        },
    },

    "views": ...,

    "routes": ...
}
```
