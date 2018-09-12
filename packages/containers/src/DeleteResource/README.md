# DeleteResource Container

This peculiar component need some preparation and make some assumption about your resource shape to properly work.
It better to read the following documentation to avoid headache and hair loss.

## Breaking changes log

Before this component use the sagaRouter, so you may have the following kind of configuration:

```javascript
import { DeleteResource } from '@talend/react-containers';
export default {
    '/foo/:id/delete': DeleteResource.sagas({
        uri: '/api/v1',
        resourceType: 'datasets',
        routerParamAttribute: 'id',
    })
}
```

Those informaton should now be provided directly in props of the DeleteResource.

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

id will be used to identify the resource, and label will be used in the action dispatched when the resource will be successfully deleted, allowing you to create a custom notification containing the resource name.

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
            "componentId": "connections"
        }
    ]
}
```

Then add information as props

```JSON
{
    "props":{
        "DeleteResource#connections":{
            "uri": "/api/v1",
            "resourceType": "connections"
        }
    }
}
```

#### Params

Required :

* **uri** : is the base url where the deletion service will make a request to delete the resource
* **resourceType** : is the name of the collection where to find the resource
* **redirectUrl** : is the url to redirect when delete is complete or cancel action is triggered

Optional :

* **resourceLabel** : is the parameter to show the type to remove if the resourceType is not readable by the user
* **routerParamAttribute** : is the attribute defined in the route to give the resource id. default is 'id'
* **resourcePath** : array of string, is appended to resourceType key to deep location of a subset of a collection element
the delete service will use it to check if the resource exist in your application state tree
* **female** : Only for i18n, allow to set the i18nkey to tell of the resource type if female or not
* **collectionId** : specify the collection which stores resource. if not provided, then use `resourceType` as collection name
* **resourceUri** : is the backend api to delete resource. if not provided, then `${uri}/${resourceType}/${id}` will be used.
* **onCancelRedirectUrl** : is the url to redirect when cancel delete. if not provided then `redirectUrl` will be used.


Example with resourcePath

```JSON
{
    "props":{
        "DeleteResource#connections":{
            "uri": "/api/v1",
            "resourceType": "connections",
            "resourcePath": ["data"],
            "routerParamAttribute": "deletedId",
        }
    }
}
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

Example with collectionId:
as default, DeleteResource component use `resourceType` as collection name when remove resource from Redux store.
but sometimes, the collection name can be different with `resourceType`. then you can specify collection with prop `collectionId`.
```JSON
{
    "props":{
        "DeleteResource#connections":{
            "uri": "/api/v1",
            "resourceType": "collections",
            "collectionId": "items",
        }
    }
}
```
so DeleteResource will try to remove resource from `items` collection in store.

Example with resourceUri:
DeleteResource will use `${uri}/${resourceType}/${id}` as backend api for deleting resource, as default.
If you have a different uri structure, then you can specify it with `resourceUri`.
```JSON
{
    "props":{
        "DeleteResource#run-profiles":{
            "resourceType": "run-profiles",
            "resourceUri": "/ipaas-services/run-profiles/type/id"
        }
    }
}
```
then DeleteResource will send request to `/ipaas-services/run-profiles/type/id` to delete resource.
