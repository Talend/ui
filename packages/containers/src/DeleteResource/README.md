# DeleteResource Container

This peculiar component need some preparation and make some assomption about your resource shape to properly work.
It better to read the following documentation to avoid headache and hair loss.

## Breaking changes log

## Content

This package provides tools to deal with resource deletion :

* a dialog component to display a message and choose a course of action, cancel or validate the action
* a suite of action, to open the dialog, cancel or validate the deletion
* a saga that handle the deletion operation behind the scene, this without cluttering your store with temporary information

## How it works

#### resource shape
your resource need to have the following minimal shape
```json
{
    id,
    label,
    ...
}
```

id will be used to identify the resource, and label will be used in the action dispatched when the resource will be succesfully deleted, allowing you to create a custom notification containing the resource name.

### association of the component with a route

First you have to association the display of the component with a route

```JSON
{
    "path": "connections",
    "component": "HomeListView",
    "childRoutes": [
        {
            "path": ":id/delete",
            "component": "DeleteResource",
        }
    ]
}
```

### association of the saga with a route

next you have to associate the saga with the same route using SagaRouter present in cmf package

```javascript
const route = {
	'/connections/:datastoreId/delete': DeleteResource.sagas(uri, resourceType),
};
```

**uri** : is the base url where the deletion service will make a request to delete the resource
**resourceType** : is the name of the resource category
**resourcePath** : optional array of string, is appended to resourceType key to deep location of a subset of a collection element
the delete service will use it to check if the resource exist in your application state tree

example with resourceType only
```javascript
const route = {
	'/connections/:datastoreId/delete': DeleteResource.sagas(uri, 'resourceType'),
};
```

```JSON
{
    cmf: {
        collection: {
            resourceType: List<Resource>
        }
    }
}
```

example with resourcepath

```javascript
const route = {
	'/connections/:datastoreId/delete': DeleteResource.sagas(uri, 'resourceType', ['data']),
};
```

```JSON
{
    cmf: {
        collection: {
            resourceType: {
                status: 'loaded',
                data: List<Resource>
            }
        }
    }
}
```


and also use it to append to the uri to call
```javascript
`${uri}/${resourceType}/${id}`
```

### general configuration
In your cmf application configuration file, you should map the action creators to a cmf interactive action

And default view where you map those to props that will be injected, the connected modal component will automatically retrieve this configuration, to properly display a message and bind redux action to cmf interactive actions

```JSON
{
    "actions": {
        "dialog:delete:validate": {
            "id": "dialog:delete:validate",
            "label": "Yes",
            "bsStyle": "danger",
            "actionCreator": "deleteResource:validate"
        },
        "dialog:delete:cancel": {
            "id": "dialog:delete:cancel",
            "label": "No",
            "actionCreator": "deleteResource:cancel"
        }
    },
    "ref": {
        "Container(DeleteResource)#default": {
            "header": "Are you sure you want to delete this object ?",
            "cancel-action": "dialog:delete:cancel",
            "validate-action": "dialog:delete:validate"
        }
    }
}
```