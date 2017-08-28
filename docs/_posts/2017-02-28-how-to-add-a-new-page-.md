---
layout: page
title: "How to add a new page ?"
category: faq
date: 2017-02-28 10:19:22
order: 3
---

To add a new page on a new route using CMF, you need to perform these steps : 
* Create your connected container that will be displayed on the new route. ([How to connect a container to CMF ?]({{ site.baseurl }}{% link _posts/2017-02-28-how-to-connect-a-container-to-cmf-.md %}))
* [Registry]({{ site.baseurl }}{% link _posts/2017-02-28-core-registry.md %}): register your component
* [Registry]({{ site.baseurl }}{% link _posts/2017-02-28-core-registry.md %}): register your action creators
* [Settings]({{ site.baseurl }}{% link _posts/2017-02-28-core-settings.md %}): add your route configuration
* [Settings]({{ site.baseurl }}{% link _posts/2017-02-28-core-settings.md %}): add your view configuration
* [Settings]({{ site.baseurl }}{% link _posts/2017-02-28-core-settings.md %}): add your actions configuration

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
    static contextTypes = {
        store: PropTypes.object.isRequired,
        registry: PropTypes.object.isRequired,
    };
    
    static propTypes = {
        label: PropTypes.string.isRequired,
        link: PropTypes.bool,
        onClick: PropTypes.string.isRequired, // notice the string here, it's the action id that the container will resolve
    }

    render() {
        const props = {
            ...this.props,
            onClick: getAction(this.context, this.props.onClick), // the context is available, containing the registry
        }
        return (
            <MyComponent {...props} />
        );
    }
}

/**
 * Creates a function that
 * - get the action payload or action creator to call
 * - dispatch the action to the redux store
 */
function getAction(context, actionId) {
    const actionSetting = api.action.getActionInfo(context, actionId);
    return function onClick(event, data) {
        if (actionSetting.actionCreator) {
            const actionCreatorResult = api.action.getActionObject(context, actionSetting.id, event, data);
            context.store.dispatch(actionCreatorResult);
        } else {
            context.store.dispatch(actionSetting.payload));
        }
    };
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
export default connect(mapStateToProps)(MyContainer);
```

## Register you component

In your app configuration phase
 
```javascript
import { api } from 'react-cmf';
import MyContainer from '../components/my-container';

const registerComponent = api.route.registerComponent;
registerComponent('MyContainer', MyContainer);
```

## Register your action creator

In your app configuration phase

```javascript
import { api } from 'react-cmf';
import myAction from '../actions/my-action';

const registerActionCreator = api.action.registerActionCreator;
registerActionCreator('my:action', myAction);
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
        
        "myContainerView": {
            "label": "Click Me",
            "link": true,
            "onClick": "myClickAction"
        },
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
            id: "myClickAction",
            actionCreator: "my:action"
        },
    },
    
    "views": ...,
    
    "routes": ...
}
```
