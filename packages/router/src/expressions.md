# cmf.router expressions

## cmf.router.matchPath

There are two use cases to use this expression, you may want a boolean to know if you match a path:

```javascript
{
    "props": {
        "MyComponent#my-id": {
            "renderIfExpression": {
                "id": "cmf.router.matchPath",
                "args": [
                    {
                        "path": "/foo/:bar",
                        "isExact": true
                    }
                ]
            }
        }
    }
}
```

The second use case is to get a params value:

```javascript
{
    "props": {
        "MyComponent#my-id": {
            "barExpression": {
                "id": "cmf.router.matchPath",
                "args": [
                    {
                        "path": "/foo/:bar"
                    },
                    "params.bar",
                    false
                ]
            }
        }
    }
}
```

API:

| args | description |
|--|--|
| options | [react-router API](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/matchPath.md) |
| getPath | string to get into the match object |
| defaultValue | in the case of get the default value you want |

## cmf.router.location

Location represent where the app is now.
Please first read the [react-router documation about this object](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/location.md)

So this expression will return you that object.
Most of the time you want it to be sure you component is re-rendered when the route change

```javascript
{
    "props": {
        "MyComponent#my-id": {
            "locationExpression": "cmf.router.location"
            // or just a part of it
            "searchExpression": {
                "id": "cmf.router.location",
                "args": ["search"]
            }
        }
    }
}
```
