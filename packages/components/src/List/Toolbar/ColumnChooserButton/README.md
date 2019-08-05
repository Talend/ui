# Column Chooser


1. [Presentation](#presentation)
2. [How to use it](#how-to-use-it)
3. [Components](#components)
	- [ColumnChooserButton](#columnchooserbutton)
	- [ColumnChooser](#columnchooser)
	- [ColumnChooserHeader](#columnchooserheader)
	- [ColumnChooserFooter](#columnchooserfooter)
	- [ColumnChooserBody](#columnchooserbody)
	- [ColumnChooserRowRenderer](#columnchooserrowrenderer)
	- [RowCheckbox](#rowcheckbox)
	- [RowLabel](#rowlabel)
4. [Hooks](#hooks)
	- [ColumnChooserManagerHook](#columnchoosermanagerhook)
5. [Context](#context)
	- [columnChooserContext](#columnchoosercontext)
6. [PropTypes and structure](#proptypes-and-structures)
	- [ColumnChooserPropTypes](#columnchooserproptypes)
	- [ColumnsChooserPropTypes](#columnschooserproptypes)
7. [Utils](#utils)
	- [mergedColumnsChooser](#mergedcolumnschooser)
	- [compareOrder](#compareorder)

## Presentation
The column chooser is an overlay / popover component.
It allows you to edit the columns present in a list.
You can hide and show each column individually or by using the select all button.
The column chooser is present is the list toolbar.
The component uses hooks and context.

[Frontify](http://guidelines.talend.com/document/92132#/navigation-layout/column-chooser)

## How to use it

If you are still using the legacy list (no composition) you have to pass a new props named columnChooser to the list.
The column chooser will appear in the Toolbar component if the props is present.
```javascript
	{columnChooser &&  <ColumnChooserButton  {...columnChooser}/>}
```

You have to pass a columnChooser props to the List.
This object must holds two fields, columns ([ColumnsChooserPropTypes](#columnschooserproptypes))and submit. You can also locked some columns with nbLockedLeftItems.
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
| columns | [ColumnsChooserPropTypes](#columnschooserproptypes) | populate the popover
| submit | function | callback trigger when the form is submit
| nbLockedLeftItems | number | the number of locked items you want, beginning at the left

To keep the columns from the list sync with the inputs of the user, you will need to merge the data from the column chooser with the columns from the list.
There is a service to help you to do that, [mergedColumnsChooser](#mergedcolumnschooser).

```javascript
const columnsMergedWithColumnChooser = {
		...list,
		columns: columnChooserService.utils.mergedColumnsChooser(list.columns, columnsChooser),
};
<List {...rest} columnChooser={...} list={columnsMergedWithColumnChooser} />;
```
If you are using the compound list you just have to import the [ColumnChooserButton](#columnchooserButton), pass the props and place it where you need it. Do not forget to pass an id in this case.


```javascript
<ColumnChooserButton id={id} columns={...} nbLockedLeftItems={...} submit={...} />
```

Either way you will have to update the columns props given to the list with the submitted values in order to keep everybody sync.

## Components
### ColumnChooserButton

The button which will trigger the popover with the form and content.
If you pass children you will override the default column chooser renderer.

| Props | Type | Info
|---|---|---|
| children | React.element | the content of the popover
| columns | array | these columns comes from the list, they will populate the popover
| filterValue | string | value of the filter at mounting
| id | string | Use as prefix for all the children components
| initialOpenedPopover | bool | state of the popover at mounting, show / hide
| placement | string | Position of the popover
| nbLockedLeftItems | number | the number of locked columns you want, beginning at the left
| submit | function | callback trigger when the form is submit
| t | function | i18n translate

### ColumnChooser

The base of the popover component.
This component holds the form. If you pass children you will override the default column chooser renderer.
A filterbar is also present and helps searching the column you need.
The [columnChooserContext](#columnchoosercontext) is initialized here.

The component holds reference :
* Header : [ColumnChooserHeader](#columnchooserheader)
* Body: [ColumnChooserBody](#columnchooserbody)
* Footer :[ColumnChooserFooter](#columnchooserfooter)

| Props | Type | Info
|---|---|---|
| children | React.element, [React.element] | the content of the popover
| columns | array |  these columns comes from the list, they will populate the popover
| filterValue | string | the current value of the filter
| id | string | Use as prefix for all the children components
| nbLockedLeftItems | number | the number of locked items you want, beginning at the left
| submit | function | callback trigger when the form is submit, passed to the column manager hook (see hook)
| t | function | i18n translate

### ColumnChooserHeader

The header of the column chooser.
Title by default is "Modify columns". The number of selected columns is displayed here.
You can pass children to the header to customize it.
By default, it consumes the [columnChooserContext](#columnchoosercontext).

| Props | Type | Info
|---|---|---|
| className | string | class passed to the tooltip header
| children | React.element, [React.element] | the header's content of the popover

### ColumnChooserFooter

Footer of the column chooser.
The apply button is here and it submit the form.
You can pass children and override the default render.
By default, it consumes the [columnChooserContext](#columnchoosercontext).

The component holds reference :
* Submit : [SubmitButton](#SubmitButton)
* SelectAll: [SelectAllCheckbox](#SelectAllCheckbox)

| Props | Type | Info
|---|---|---|
| className | string | class passed to the tooltip header
| children | React.element, [React.element] | the footer  content of the popover

### ColumnChooserBody

Body of the column chooser.
It renders the different column row.
You can pass children to override it. Children use the render props pattern. It receives the columns as parameters.
By default, it consumes the [columnChooserContext](#columnchoosercontext).

The component holds reference :
* Row : [ColumnChooserRowRenderer](#columnchooserrowrenderer)

| Props | Type | Info
|---|---|---|
| children | function | the body's  content of the popover, called with the columns as arguments.

### ColumnChooserRowRenderer

The row renderer only render its children.
It holds reference to other components: , .
By default, it consumes the [columnChooserContext](#columnchoosercontext).

The component holds reference :
* Visibility: [RowCheckbox](#rowcheckbox)
* Label: [RowLabel](#rowlabel)

| Props | Type | Info
|---|---|---|
| className | string | class passed to div wrapper row
| children | React.element, [React.element] | the row's  content of the popover

### RowCheckbox

Add a checkbox to switch the visibility of a column.
If the column is locked, a locked icon replaces the checkbox.
	dataFeature,
	describedby,
	description,
	id,
	label,
	locked = false,
	onClick,
	checked = false,

| Props | Type | Info
|---|---|---|
| dataFeature | string | data-feature attribute of the input
| describedby | string | the id of the markup holding the description
| description | string | the description
| id | string | id of the checkbox input
| label | string | label used
| locked | bool | indicates if the column is locked or not
| onChange | func | trigger when the checkbox is clicked
| checked | bool | indicates the visibility value, and if the checkbox is checked

### RowLabel

Add the label of the column to the row.

| Props | Type | Info
|---|---|---|
| label | string | the label of the column

## Hooks
### ColumnChooserManagerHook

This hook manages all the logic behavior in the [ColumnChooser](#columnchooser).
It holds the state of the columns edited by the user.

| Parameters | Type | Info
|---|---|---|
| initColumns | array | array of columns object from the list
| nbLockedLeftItems | number | the number of columns that will be locked, left to right

And it returns an object with hook state values and handlers to manipulate them.

| Fields | Type | Info
|---|---|---|
| onChangeVisibility | function | change the visibility of the given column index|
| onSelectAll | function | change the visibility of every columns
| columnsChooser | [ColumnsChooserPropTypes](#columnschooserproptypes) | the hook columns
| selectAll | bool | state of the select all button, checked or not.

## Context

### columnChooserContext

The column chooser uses a context to pass some props to its children and avoid props drilling.
By default the context is initialized in [ColumnChooser](#columnchooser).
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
| locked | PropTypes.bool | indicates the locked state
| order | PropTypes.number | indicates the ordering of the column
| visible | PropTypes.bool | the state of visibility of the column


### ColumnsChooserPropTypes

An array of [ColumnChooserPropTypes](#columnchooserproptypes)

## Utils
### mergedColumnsChooser
Helper to merge the columns chooser collection into the columns list.

### compareOrder
Compare the order of the columns chooser collection and order them ascending
