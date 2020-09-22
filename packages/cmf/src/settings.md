# settings

This API is very internal. You should not need to use it.

It expose the internal mecahnism that let cmfConnect map the settings during the mapStateToProps step. If you read the code you will understand why displayName and componentId are mandatory.

It is just a mapStateToProps !

## let's create withSettings HOC

So cmfConnect include this feature to let your component read it s settings.

Let s hack the API to create an HOC that just do that. Please don't do that in your project this is useless and this API is internal so it may change in the future.

```javascript
import cmf from '@talend/react-cmf';
import connect from 'react-redux';

export default function withSettings(MyComponent) {
  function mapStateToProps(state, ownProps) {
    return cmf.settingsAPI.mapStateToProps(state, ownProps, MyComponent.displayName, ownProps.componentId);
  }
  return connect(mapStateToProps)(MyComponent);
}
```
