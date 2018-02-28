# Datalist

This widget allows you to render a Typeahead.

**Json Schema**

| Property | Description |
|---|---|
| autoFocus | `boolean` |
| id | The id of the typeahead |
| disabled | Disable the input | `false` |
| placeholder | The input placeholder |  |
| readOnly | If the input should be readonly | `false` |
| titleMap | A mapping of value/label to display |  |


```json
{
	"autoFocus": true,
	"disabled": false,
	"placeholder": "search for something ...",
	"readOnly": false,
	"titleMap": [
		{ "name": "foo", value: "foo" },
		{ "name": "bar", value: "bar" },
		{ "name": "foobar", value: "foobar" },
		{ "name": "lol", value: "lol" },
	],
};

```
