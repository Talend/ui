# CMF Expressions

## setup

you have to do the following in your configure.js to activate this

```javascript
import cmf from '@talend/react-cmf';

cmf.registerInternals();
```

Then you can use all internal expressions.
For all the following example we take this component as example:

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { cmfConnect } from '@talend/react-cmf';

const DEFAULT_STATE = new Immutable.Map({
	like: false,
});

class Article extends React.Component {
	static propTypes = {
		...cmfConnect.propsTypes,
		title: PropTypes.string,
		description: PropTypes.string,
	}
	constructor(props) {
		super(props);
		this.onLike = this.onLike.bind(this);
	}

	onLike() {
		this.props.setState({ like: !this.props.state.get('like') });
	}

	render() {
		const like = this.props.state.get('like');
			return (
			<article>
				<h1>{props.title}</h1>
				<p>{props.description}</h1>
				<button onClick={this.onLike}>{like ? 'unlike': 'like'}</button>
			</article>
		);
	}
}
function mapStateToProps(state) {
	return {
		model: state.cmf.collections.get('article');
	};
}
export cmfConnect({mapStateToProps})(MyComponent)
```

## cmf.collections

### get

```json
	"props": {
		"MyArticle#default": {
			"titleExpression": {
				"id": "cmf.collections.get",
				"args": ["article.label", "no title"]
			},
			"descriptionExpression": {
				"id": "cmf.collections.get",
				"args": ["article.meta.description", "no description"]
			},
		}
	}
```

### includes

```json
	"props": {
		"MyArticle#default": {
			"renderIfExpression": {
				"id": "cmf.collections.includes",
				"args": ["identity.entitlements", "ARTICLE_READ"]
			},
		}
	}
```

### oneOf

```json
	"props": {
		"MyArticle#default": {
			"renderIfExpression": {
				"id": "cmf.collections.oneOf",
				"args": ["identity.entitlements", [ "ARTICLE_PREVIEW", "ARTICLE_READ" ]]
			},
		}
	}
```
### allOf

```json
	"props": {
		"MyArticle#default": {
			"renderIfExpression": {
				"id": "cmf.collections.allOf",
				"args": ["identity.entitlements", [ "ARTICLE_READ", "ARTICLE_CREATE" ]]
			},
		}
	}
```

## cmf.components

### get

let say you want to know the state of component

```json
	"props": {
		"AnOtherComponent#default": {
			"activeExpression": {
				"id": "cmf.components.get",
				"args": ["MyArticle.default.like", false]
			}
		}
	}
```

### includes

```json
	"props": {
		"AnOtherComponent#default": {
			"enabledExpression": {
				"id": "cmf.components.includes",
				"args": ["MyArticle.default.myList","myAttriubte", false]
			}
		}
	}
```
