---
id: howto-addpage
title: How to a add a new page
sidebar_label: add a new page
---

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

you can use our component generator with the command `yo talend:react-component` and choose cmfConnect option.

Then in your component just do the following:

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { cmfConnect } from 'react-cmf';

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
    static displayName = 'MyContainer'; // this is mandatory
    static propTypes = {
        label: PropTypes.string.isRequired,
        link: PropTypes.bool,
        ...cmfConnect.propTypes,
    }

    onClick(event) {
        this.props.dispatchActionCreator('my:action');
        if (props.onClick) {
            props.onClick(event);
        }
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
export default cmfConnect({
    mapStateToProps
    withDispatchActionCreator: true,
})(MyContainer);
```

To learn more on that take a look at [cmfConnect](https://github.com/Talend/ui/tree/master/packages/cmf/src/cmfConnect.md)

## Register your component

In your app _index.js_ add in the bootstrap your new component:

```javascript
import cmf from 'react-cmf';
import MyContainer from '../components/my-container';

cmf.bootstrap({
    components: {
        'MyContainer': MyContainer,
    },
});
```

## Register your action creator

In your app index.js_ add the actionCreator:

```javascript
import cmf from 'react-cmf';
import myAction from '../actions/my-action';

cmf.bootstrap({
    actionCreators: {
        'my:action': myAction,
    },
    components: {
        //...
    }
});
```

## Add your route Settings configuration

In your app src/settings/_routes.json_ you can add the new route to that page

```json
{
    "routes": {
        "path": "/",
        "component": "App",
        "childRoutes": [
            {
                "path": "newRoute",
                "component": "MyContainer",
                "componentId": "my"
            }
        ]
    }
}
```

## Add your props settings configuration

In your app _MyContainer.json_

```json
{
    "props": {
        "MyContainer#my": {
            "label": "my action",
            "link": true
        }
    }
}
```
