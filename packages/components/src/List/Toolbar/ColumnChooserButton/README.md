# Column Chooser


1. [Presentation](readme.md#Presentation)
2. [How to use it](#How to use it)
3. [Components](#Components)
	a. [ColumnChooserButton](#ColumnChooserButton)
	b. [ColumnChooser](#ColumnChooser)
	c. [ColumnChooserHeader](#ColumnChooserHeader)
	d. [ColumnChooserFooter](#ColumnChooserFooter)
	f. [ColumnChooserBody](#ColumnChooserBody)
	e. [ColumnChooserRowRenderer](#ColumnChooserRowRenderer)
	g. [RowVisibilityCheckbox](#RowVisibilityCheckbox)
	h. [RowLabel](#RowLabel)
4. [Hooks](#Hooks)
	a. [ColumnChooserManagerHook](#ColumnChooserManagerHook)
5. [Context](#Context)
	a. [columnChooserContext](#columnChooserContext)
6. [PropTypes and structure](#PropTypes and Structures)
	a [ColumnChooserPropTypes](#ColumnChooserPropTypes)
	b. [ColumnsChooserPropTypes](#ColumnsChooserPropTypes)
7. [Utils](#Service)
	a. [mergedColumnsChooser](#mergedColumnsChooser)
	b. [compareOrder](#compareOrder)

## Presentation
The column chooser is an overlay / popover component.
It allows you to edit the columns present in a list.
You can hide and show each column individually or by using the select all button.
The column chooser is present is the list toolbar.
The component uses hooks and context.

## How to use it

If you are still using the legacy list (no composition) you have to pass a new props named columnChooser to the list.
The column chooser will appear in the Toolbar component if the props is present.
```javascript
	{columnChooser &&  <ColumnChooserButton  {...columnChooser}/>}
```

You have to pass a columnChooser props to the List.
This object must holds two fields, columns ([ColumnsChooserPropTypes](#ColumnsChooserPropTypes))and submit. You can also locked some columns with nbLockedLeftItems.
```javascript
import { List } from '@talend/react-components';
...
<List {...rest} columnChooser={{
	columns: [
		{
			label: 'first column',
			order: 1,
		},
		{
			label: 'second column',
			order: 2,
		},
	],
	nbLockedLeftItems: 1,
	submit: () => { my function triggered at submit event },
}} />;
```

This settings will create a column chooser with two columns. The first one will be locked, because of nbLockedLeftItems: 1.

| Fields | Type | Info
|---|---|---|
| columns | [ColumnsChooserPropTypes](#ColumnsChooserPropTypes) | populate the popover
| submit | function | callback trigger when the form is submit
| nbLockedLeftItems | number | the number of locked items you want, beginning at the left

To keep the columns from the list sync with the inputs of the user, you will need to merge the data from the column chooser with the columns from the list.
There is a service to help you to do that, [mergedColumnsChooser](#mergedColumnsChooser).

```javascript
const columnsMergedWithColumnChooser = {
		...list,
		columns: columnChooserService.utils.mergedColumnsChooser(list.columns, columnsChooser),
};
<List {...rest} columnChooser={...} list={columnsMergedWithColumnChooser} />;
```
If you are using the compound list you just have to import the [ColumnChooserButton](#ColumnChooserButton) and place it where you need it.
Do not forget to pass an id in this case.

Either way you will have to update the columns props given to the list with the submitted values.

## Components
### ColumnChooserButton

The button which will trigger the popover with the form and content.
If you pass children you will override the default column chooser renderer.

| Props | Type | Info
|---|---|---|
| children | React.element | the content of the popover
| columns | array | these columns comes from the list, they will populate the popover
| id | string | Use as prefix for all the children components
| submit | function | callback trigger when the form is submit
| nbLockedLeftItems | number | the number of locked columns you want, beginning at the left
| t | function | i18n translate

### ColumnChooser

The base of the popover component.
This component holds the form. If you pass children you will override the default column chooser renderer.
The [columnChooserContext](#columnChooserContext) is initialized here.

The component holds reference :
* Header : [ColumnChooserHeader](#ColumnChooserHeader)
* Body: [ColumnChooserBody](#ColumnChooserBody)
* Footer :[ColumnChooserFooter](#ColumnChooserFooter)

| Props | Type | Info
|---|---|---|
| children | React.element, [React.element] | the content of the popover
| columns | array |  these columns comes from the list, they will populate the popover
| id | string | Use as prefix for all the children components
| onClose | function | callback trigger when the submit is done.
| nbLockedLeftItems | number | the number of locked items you want, beginning at the left
| submit | function | callback trigger when the form is submit, passed to the column manager hook (see hook)
| t | function | i18n translate

### ColumnChooserHeader

The header of the column chooser.
Title by default is "Modify columns".
You can pass children to the header to customize it.
It consumes the [columnChooserContext](#columnChooserContext).

| Props | Type | Info
|---|---|---|
| className | string | class passed to the tooltip header
| children | React.element, [React.element] | the header's content of the popover

### ColumnChooserFooter

Footer of the column chooser.
There is two inputs, the select all, which select / unselect all the columns.
And the apply button, which submit the form.
You can pass children and override the default render.
It consumes the [columnChooserContext](#columnChooserContext).

The component holds reference :
* Submit : [SubmitButton](#SubmitButton)
* SelectAll: [SelectAllCheckbox](#SelectAllCheckbox)

| Props | Type | Info
|---|---|---|
| className | string | class passed to the tooltip header
| children | React.element, [React.element] | the footer  content of the popover

### ColumnChooserBody

Body of the column chooser.
It renders the different column row, by default [ColumnChooserRowRenderer](#ColumnChooserRowRenderer).
You can pass children to override it. Children use the render props pattern. It receives the columns as parameters.
It consumes the [columnChooserContext](#columnChooserContext).

The component holds reference :
* Row : [ColumnChooserRowRenderer](#ColumnChooserRowRenderer)

| Props | Type | Info
|---|---|---|
| children | function | the body's  content of the popover, called with the columns as arguments.

### ColumnChooserRowRenderer

The row renderer only render its children.
It holds reference to other components: , .
It consumes the [columnChooserContext](#columnChooserContext).

The component holds reference :
* Visibility: [RowVisibilityCheckbox](#RowVisibilityCheckbox)
* Label: [RowLabel](#RowLabel)

| Props | Type | Info
|---|---|---|
| children | React.element, [React.element] | the row's  content of the popover

### RowVisibilityCheckbox

Add a checkbox to switch the visibility of a column.
If the column is locked, a locked icon replaces the checkbox.
It consumes the [columnChooserContext](#columnChooserContext).

| Props | Type | Info
|---|---|---|
| index | number | the index of the column
| locked | bool | indicates if the column is locked or not
| value | bool | indicates the visibility value, and if the checkbox is checked

### RowLabel

Add the label of the column to the row.

| Props | Type | Info
|---|---|---|
| label | string | the label of the column

## Hooks
### ColumnChooserManagerHook

This hook manages all the logic behavior in the [ColumnChooser](#ColumnChooser).
It holds the state of the columns edited by the user.

| Parameters | Type | Info
|---|---|---|
| initColumns | array | array of columns object from the list
| nbLockedLeftItems | number | the number of columns that will be locked, left to right

And it returns an object with some values and handlers

| Fields | Type | Info
|---|---|---|
| onChangeVisibility | function | change the visibility of the given column index|
| onSelectAll | function | change the visibility of every columns
| columnsChooser | [ColumnsChooserPropTypes](#ColumnsChooserPropTypes) | the hook columns
| selectAll | bool | state of the select all button, checked or not.

## Context

### columnChooserContext

The column chooser uses a context to pass some props to its children and avoir props drilling.
By default the context is initialized in [ColumnChooser](#ColumnChooser).
You can import directly the provider and the consumer from columnChooser.context
```
import { columnChooserContext, ColumnChooserProvider } 
															from '.../columnChooserContext'
```

## PropTypes and Structures

### ColumnChooserPropTypes

| Props | Type | Info
|---|---|---|
| label | PropTypes.string | the label of the column
| hidden | PropTypes.bool | the state of visibility of the column
| order | PropTypes.number | indicates the ordering of the column

### ColumnChooserPropTypes

An array of [ColumnChooserPropTypes](#ColumnChooserPropTypes)

## Utils
### mergedColumnsChooser
Helper to merge the columns chooser collection into the columns list.

### compareOrder
Compare the order of the columns chooser collection and order them ascending
