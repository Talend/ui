# Build Service to let dev organize code in app

Original Jira: https://jira.talendforge.org/browse/TUI-252

Objective: let dev organize their code by feature.
Constraints: must work in react-redux, thunk and redux-saga environment.

## Why do we need service

When a frontend need to implement a feature he needs to split the needs in two parts:

* how do I display it (aka components)
* how do I handle the business (aka services)

The word `service` is very often used to point out two things:

* the state, or the business data
* the api exposed to handle the business objects.

## How should we see service in our environment

A feature mean the following technical *items* to be defined:

* **initial state** to store your business objects
* action **TYPES** constant to handle changes in that data structure
* **reducer** which recieve the action and do the write in the redux state
* **action creators** to trigger those changes. They will be dispatched by component event handler or internal life cycle
* **selectors** to be able to read the data and access it without having to know where it is
* **saga** are started with the app to handle effects

Theses *items* need boiler plate depending from where they are called and need the developer to perfectly know the redux echo system.

Action *TYPE*, *Action creators*, *selectors* are considered as external API. They must be exposed to be used.
The reducer and the saga, must be passed to cmf.bootstrap for the setup.

So the main idea here is so to provide higher level API which generate the boiler plate for you.
The user must be able to write at anytime any custom items.

We can see that as a code *generator*. To create good generators we need to cover some usefull case on well known patterns.

## How to write a service

```javascript
export const cmfModule = {
    id: 'userService', // must be uniq accross the app
    saga: function* mainSaga() {},
    reducer: {
        // TODO: should we force only one path in redux store ?
        // If not, generator must take the attr name as param.
        // so here the path in the store will be state.user
        user: function (state, action) {
            // reduce the action
            // it will be composed with generated reducer
        },
};
const service = {
    // you can write here your custom stuff
    actionCreators: {
        doFetch: function() {},
    },
    selectors: {
        getItems: function(state) {},
    },
};
// call a generator to init boilerplate
cmf.service.generators.simpleItem(service, cmfModule);

// if you want to register exposed api into CMF registry
cmf.service.registerService(service, cmfModule)
// this will be equivalen to write
cmfModule.actionCreators = {
    'userService.get': service.actionCreators.get,
};

export default service;
```

## How to use a service

```javascript
import React from 'react';
import { connect } from 'react-redux';
import datasetService from '@talend/dataset/lib/service';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getDataset();
    }

    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        items: datasetService.selectors.get(state),
    };
}

const mapDispatchToProps = {
    getDataset: datasetService.actionCreators.get,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyComponent);
```

## Usefull Features / needed generators

By default we should have the following available generators:

* one simple structure which will be the base use case
* a list of items with a current item in it
* rest service (generate GET, POST, PUT, PATCH)
