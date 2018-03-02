# Datalist

This widget allows you to render a Typeahead.

**Json Schema**

| Property | Description |
|---|---|
| autoFocus | `boolean` |
| id | The id of the typeahead |
| disabled | Disable the input | `false` |
| multiSection | whether the data list will display with sections |
| placeholder | The input placeholder |  |
| readOnly | If the input should be readonly | `false` |
| titleMap | A mapping of value/label to display |  |


```json single selection
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
```json multi section
{
	autoFocus: true,
	disabled: false,
	multiSection: true,
	placeholder: 'search for something ...',
	readOnly: false,
	titleMap: [
		{ title: 'cat 1', suggestions: [{ name: 'foo', value: 'foo' }, { name: 'faa', value: 'foo' }] },
		{ title: 'cat 2', suggestions: [{ name: 'bar', value: 'bar' }] },
		{ title: 'cat 3', suggestions: [{ name: 'foobar', value: 'foobar' }] },
		{ title: 'cat 4', suggestions: [{ name: 'lol', value: 'lol' }] },
	],
	onFinish: (event, payload) => {},
	onChange: (event, payload) => {},
};

```


