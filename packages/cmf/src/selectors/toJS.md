# cmf.selectors.toJS

With CMF we want all data structure to be Immutable into the store for performance reason.

But many components want POJO, so a solution is to use toJS but it's known as a bad pratice because:

* it's slow
* it creates a new object on every mutation of the store so react-redux re-render the component

source: https://redux.js.org/faq/immutable-data

The solution comes with the following practice:

* you should write a selector to get your data from the state (without any other params than the state).
* then call the cmf.selectors.toJS(selector) to get your memoized selector

This memoized selector will return you the result of  `toJS` but it will be called only once.
This garantie to do not have memory leak (only one instance is kept in cache)

And you keep good performances !

So if you have the following kind of code:

```javascript
function mapStateToProps(state) {
  return {
    mystuff: state.cmf.collections.get('mycollection').toJS(),
  };
}
```

which is very bad for performance, you should rewrite it like this:

```javascript
import cmf from '@talend/react-cmf';

function mapStateToProps(state) {
  return {
    mystuff: cmf.selectors.collections.toJS(state, pathToCollection),
  };
}
```
