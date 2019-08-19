# Column Chooser

1. [Presentation](#presentation)
2. [How to use it](#how-to-use-it)
   - [legacy-list](#legacy-list)
   - [compound-list](#compound-list)
3. [Components](#components)
   - [ColumnChooserButton](#columnchooserbutton)
   - [ColumnChooser](#columnchooser)
   - [ColumnChooserHeader](#columnchooserheader)
   - [ColumnChooserFooter](#columnchooserfooter)
   - [ColumnChooserBody](#columnchooserbody)
   - [ColumnChooserRow](#columnchooserrow)
   - [RowCheckbox](#rowcheckbox)
   - [RowLabel](#rowlabel)
4. [Hooks](#hooks)
   - [ColumnChooserManagerHook](#columnchoosermanagerhook)
5. [Context](#context)
   - [columnChooserContext](#columnchoosercontext)
6. [PropTypes and structure](#proptypes-and-structures)
   - [ColumnChooserPropTypes](#columnchooserproptypes)
   - [ColumnsPropTypes](#columnsproptypes)
7. [Utils](#utils)
   - [mergeWithColumnChooserCollection](#mergeWithColumnChooserCollection)
   - [compareOrder](#compareorder)

## Presentation

The column chooser is an overlay / popover component.
It allows you to choose the visible columns in a list.
You can hide and show each column individually or by using the select all button.
The column chooser is present is the list toolbar.

[UX Guideline](http://guidelines.talend.com/document/92132#/navigation-layout/column-chooser)

## How to use it

### Legacy list

If you are still using the legacy list (no composition) you have to pass a new props named columnChooser to the list.
The column chooser will appear in the Toolbar component if the props is present.

```javascript
{
	columnChooser && <ColumnChooserButton {...columnChooser} />;
}
```

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

| Fields            | Type                                  | Info                                                       |
| ----------------- | ------------------------------------- | ---------------------------------------------------------- |
| columns           | [ColumnsPropTypes](#columnsproptypes) | populate the popover                                       |
| onSubmit          | function                              | callback when the form is submitted                        |
| nbLockedLeftItems | number                                | the number of locked items you want, beginning on the left |

To keep the columns from the list sync with the inputs of the user, you will need to merge the data from the column chooser with the columns from the list.
There is a service to help you to do that, [mergeWithColumnChooserCollection](#mergeWithColumnChooserCollection).

```javascript
const mergedColumns = {
		...list,
        columns: columnChooserService.mergeWithColumnChooserCollection(columnsFromList, columnsFromColumnChooser),
};
<List {...rest} columnChooser={...} list={mergedColumns} />;
```

### Compound list

If you are using the compound list you just have to import the [ColumnChooserButton](#columnchooserButton), pass the props and place it where you need it. Do not forget to pass an id in this case.

```javascript
<ColumnChooserButton 
    id={id}
    columns={...} 
    nbLockedLeftItems={...} 
    onSubmit={...} />
```

Either way you will have to update the columns props given to the list with the submitted values in order to keep everybody in sync.

## Components

### ColumnChooserButton

The button triggers the column chooser popover.
If you pass children you will override the default column chooser renderer.

| Props                | Type          | Info                                                                     |
| -------------------- | ------------- | ------------------------------------------------------------------------ |
| children             | react.element | the content of the popover                                               |
| columns              | array         | these columns come from the list, they will populate the chooser popover |
| initialFilterValue   | string        | value of the filter at mounting                                          |
| id                   | string        | use as prefix for all the children components                            |
| initialOpenedPopover | bool          | state of the popover at mounting, show / hide                            |
| placement            | string        | Position of the popover                                                  |
| nbLockedLeftItems    | number        | the number of locked columns you want, beginning on the left             |
| onSubmit             | function      | callback when the form is submitted                                      |

### ColumnChooser

The base of the popover component.
This component renders the form, a default layout and a column search field. If you pass children you will override this default renderer.
A filterbar is also present and helps searching the column you need.
The [columnChooserContext](#columnchoosercontext) is initialized here.

The component holds references :

- Header : [ColumnChooserHeader](#columnchooserheader)
- Body: [ColumnChooserBody](#columnchooserbody)
- Footer :[ColumnChooserFooter](#columnchooserfooter)

| Props              | Type                           | Info                                                                  |
| ------------------ | ------------------------------ | --------------------------------------------------------------------- |
| children           | react.element, [react.element] | the content of the popover                                            |
| columnsFromList    | array                          | these columns come from the list, they will help populate the popover |
| initialFilterValue | string                         | value of the filter at mounting                                       |
| id                 | string                         | Use as prefix for all the children components                         |
| nbLockedLeftItems  | number                         | the number of locked items you want, beginning on the left            |
| onSubmit           | function                       | callback when the form is submitted                                   |

### ColumnChooserHeader

The component holds references :

- SelectAll: [SelectAllCheckbox](#SelectAllCheckbox)

The header of the column chooser.
Title and number of selected columns is displayed here.
You can pass children to the header to customize it.
By default, it consumes the [columnChooserContext](#columnchoosercontext).

| Props     | Type                           | Info                               |
| --------- | ------------------------------ | ---------------------------------- |
| className | string                         | class passed to the tooltip header |
| children  | react.element, [react.element] | the header content of the popover  |

### ColumnChooserFooter

Footer of the column chooser.
The apply button is here and it submit the form.
You can pass children and override the default render.
By default, it consumes the [columnChooserContext](#columnchoosercontext).

The component holds references :

- Submit : [SubmitButton](#SubmitButton)

| Props     | Type                           | Info                               |
| --------- | ------------------------------ | ---------------------------------- |
| className | string                         | class passed to the tooltip header |
| children  | react.element, [react.element] | the footer content of the popover  |

### ColumnChooserBody

Body of the column chooser.
It renders the column rows.
You can pass children as React.elements or a function that will receive the columns as arguments.
It consumes the [columnChooserContext](#columnchoosercontext).

The component holds reference :

- Row : [ColumnChooserRow](#columnchooserrow)

| Props    | Type     | Info                                                                     |
| -------- | -------- | ------------------------------------------------------------------------ |
| children | function | the body's content of the popover, called with the columns as arguments. |

### ColumnChooserRow

It only renders its children.
It holds reference to other components:
By default, it consumes the [columnChooserContext](#columnchoosercontext).

The component holds reference :

- Visibility: [RowCheckbox](#rowcheckbox)
- Label: [RowLabel](#rowlabel)

| Props     | Type                           | Info                            |
| --------- | ------------------------------ | ------------------------------- |
| className | string                         | class passed to the row wrapper |
| children  | react.element, [react.element] | the row content of the popover  |

### RowCheckbox

Add a checkbox to switch the visibility of a column.
If the column is locked, a locked icon replaces the checkbox.

| Props       | Type   | Info                                     |
| ----------- | ------ | ---------------------------------------- |
| dataFeature | string | input data-feature attribute             |
| description | string | the description                          |
| id          | string | id of the checkbox input                 |
| label       | string | the input label                          |
| locked      | bool   | indicates if the column is locked or not |
| onChange    | func   | triggered when the checkbox is clicked   |
| checked     | bool   | the current visibility value             |

### RowLabel

Add the label of the column to the row.

| Props | Type   | Info                    |
| ----- | ------ | ----------------------- |
| label | string | the label of the column |

## Hooks

### ColumnChooserManagerHook

This hook manages all the logic behavior in the [ColumnChooser](#columnchooser).
It holds the state of the columns edited by the user.

| Parameters        | Type   | Info                                                 |
| ----------------- | ------ | ---------------------------------------------------- |
| initialColumns    | array  | the columns provided by the list component           |
| nbLockedLeftItems | number | the number of locked columns, starting from the left |

And it returns an object with hook state values and handlers to manipulate them.

| Fields             | Type                                  | Info                                                                                                                                             |
| ------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| onChangeVisibility | function                              | change the visibility of the given column index                                                                                                  |
| onSelectAll        | function                              | change the visibility of every columns                                                                                                           |
| columns            | [ColumnsPropTypes](#columnsproptypes) | the columns derived from the initial columns (from the list), it is the entity used in the column chooser component to keep state of each column |
| selectAll          | bool                                  | state of the select all button, checked or not.                                                                                                  |

## Context

### columnChooserContext

The column chooser uses a context to pass some props to its children and avoid props drilling.
By default the context is initialized in [ColumnChooser](#columnchooser).
You can import directly the provider and the consumer from [columnChooserContext](#columnchoosercontext)

```javascript
import { columnChooserContext, ColumnChooserProvider } from '../columnChooserContext';
```

## PropTypes and Structures

### ColumnChooserPropTypes

| Props   | Type             | Info                                  |
| ------- | ---------------- | ------------------------------------- |
| label   | PropTypes.string | the label of the column               |
| locked  | PropTypes.bool   | indicates the locked state            |
| order   | PropTypes.number | indicates the ordering of the column  |
| visible | PropTypes.bool   | the state of visibility of the column |

### ColumnsPropTypes

An array of [ColumnPropTypes](#columnproptypes)

## Utils

### mergeWithColumnChooserCollection

The columns you will receive from the column chooser are not synced with the one from the list.
So you will have to use this helper to merge the content given by the column chooser with the one from the list.
