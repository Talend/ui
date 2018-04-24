# GenericViewer

This object viewer is a flexible object viewer.
It can be customized through utility functions passed as props.

[getDataType(value)](#getdatatype-value-))
[getDisplayKey(infos)](#getdisplaykey-infos-))
[getDisplayValue(infos)](#getDdisplayvalue-infos-))
[getFields(data, type)](#getfields-data-type-))
[getJSONPath(infos)](#getjsonpath-infos-))
[getQuality(infos)](#getquality-infos-))
[getIcon(infos)](#geticon-infos-))

## getDataType(value)

Get data technical type.  
Technical means not the avro type for example, but the javascript one. This is useful internally when it's an array or an object, to have special treatments (fields, etc).

*Default implementation*

The data is the real value, so it is the data js type, exception for array.

## getDisplayKey(infos)

Get the key to display.  
This can be a component instance. The `infos` parameter is in fact the whole props for this item, not to limit in the possibilities.

*Default implementation*

`infos.dataKey` is returned.

## getDisplayValue(infos)

Get the value tu display.  
Same here, `infos` is the whole props.

*Default implementation*

`info.value` is considered a simple value. If it's a string, double quotes are inserted. If it's a boolean, it is converted to string to be printed by react with jsx.

## getFields(data, type)

This is called for objects and arrays. It must return an array of fields `{ dataKey, value }`.  
On arrays, a badge is displayed, indicating the number or items. 

*Default implementation*

For array, the array items are converted into `{ dataKey: index, value: item }`.  
For objects, the properties are converted into an array of `{ dataKey: propertyKey, value: propertyValue }`.

# getJSONPath(infos)

The json path is used to identify the info in the tree we display. 
* it is passed to all callbacks.
* it is used to check if the object/array is opened
* it is used to check if the node is highlighted

`infos` is `{ dataKey, parent }` where `parent` contains useful infos about the parent node.

*Default implementation*

A string is generated
* starts with `$`
* each field has the format `["key"]`
* each array item has the format `[index]`

Example : `$["ingredients"][0]["poo"]`

## getQuality(infos)

It is possible to display a quality indicator on invalid values.  
It must return 
* -1 for invalid values
* 0 for empty values (not used today)
* 1 for valid values (not used today)

*Default implementation*

No quality indicator is displayed.

## getIcon(infos)

Returns the icon used as caret to open objects/arrays.  
`infos` is the whole props, so it is possible to return a different icons depending on the case.

*Default implementation*

A caret right is displayed on closed items.  
A caret down is displayed on opened items.

## Accessibility

Accessibiliy has been pushed, adding explicit alternatives on each non text elements.  
Example : on the toggle icons, you'll have a title indicating `Collapse ${attribute_name} (${jsonpath})` if the object is opened, `Expand ${attribute_name} (${jsonpath})` otherwise.

When providing components as a result of the customisation functions, you must manage your own accessibility.

## TODO

* nice to have for accessibility but not a must have for now : focus on next/previous item with up/down key
* what would be nice is that JSONLike is based on that, but that's a difficult path.
* improvement : each children fields is calculated at each node render, even if the node is not opened. This is used in the current node to display a badge containing the number of children. What can be done is to get a `props.getFieldsCount()` that is called at each node render, but `props.getFields` is called before `FieldComponent` render (`<FieldsComponent fields={getFields(...)} />`);
