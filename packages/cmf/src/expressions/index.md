# CMF Expressions

## setup

you have to do the following in your configure.js to activate this

```javascript
import { api } from '@talend/react-cmf';

api.registerInternals();
```

Then you can use all internal expressions.
For all the following example we take this component as example:


```javascript
import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { api, cmfConnect } from '@talend/react-cmf';

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
export api.cmfConnect({mapStateToProps})(MyComponent)
```

## cmf.immutable

This is nice to read content in existing props (here model)


```json
	"props": {
		"MyArticle#default": {
			"titleExpression": {
				"id": "Immutable.get",
				"args": ["model", "label"]
			},
			"descriptionExpression": {
				"id": "Immutable.getIn",
				"args": ["model", ["meta", "description"]]
			},
			// variante
			"descriptionExpression": {
				"id": "Immutable.get",
				"args": ["model", "meta.description"]
			},
		}
	}
```

## cmf.collections

```json
	"props": {
		"MyArticle#default": {
			"titleExpression": {
				"id": "cmf.collections.getIn",
				"args": [["article", "label"]]
			},
			"descriptionExpression": {
				"id": "cmf.collections.getIn",
				"args": [["article", "meta", "description"]]
			},
			// variante
			"descriptionExpression": {
				"id": "cmf.collections.get",
				"args": ["article.meta.description"]
			},
		}
	}
```

## cmf.components

let say you want to know the state of component

```json
	"props": {
		"AnOtherComponent#default": {
			"active": {
				"id": "cmf.components.getIn",
				"args": [["MyArticle", "default", "like"]]
			}
		}
	}
```
