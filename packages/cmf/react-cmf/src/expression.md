# Expression

Expression is a tool to get some data from the store.
They are called after each state mutation so they follow the same rules as mapStateToProps.

Under the hood they are called into the mapStateToProps of cmf.

## How to use expressions

You can use them to handle dynamic configuration like disabling buttons if a user doesn't have a permission.

Given `MyComponent` you can use expression to fill the `title` from the store

```json
{
	"props": {
		"MyComponent#default": {
			"titleExpression": {
				"id": "cmf.collections.get",
				"args": ["article.data.title", "default title"]
			}
		}
	}
}
```

So adding `Expression` to a prop *name* of a component is resolved by `cmfConnect`
during the `mapStateToProps` evaluation. So the `title` props will be resolved.

During settings aggregation, expressions will have greater priority than hardcoded props. Thus `whateverExpression` evaluation result would overwrite `whatever` setting.

## Expressions

CMF register some [expressions](./expressions/index.md) for you. And for sure you can build your own.
