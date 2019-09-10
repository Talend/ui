# collections selectors

## cmf.selectors.collections.get

How to use:

```javascript
function mapStateToProps(state) {
    return {
        my: cmf.selectors.collections.get(state, 'my.data');
    }
}
```

This selector accept the following arguments:

| name | description |
| -- | -- |
| state| redux state |
| path | a string to get the data into collections (support dotted accessor like lodash get) |
| default value | the default value |

Be warned if you build a new value each time in a mapStateToProps you introduce a performance issue.

## cmf.selectors.collections.toJS

This is the same as above but the results is a POJO and it do not create a new reference on each state mutation, so you keep good performance.
