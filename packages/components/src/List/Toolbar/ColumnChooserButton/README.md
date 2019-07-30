# Column Chooser


1. [Presentation](#Presentation)
2. [How to use it](#How to use it)
3. [Components](#Components)
	a. [ColumnChooserButton](#ColumnChooserButton)
	b. [ColumnChooser](#ColumnChooser)
	c. [ColumnChooserHeader](#ColumnChooserHeader)
	d. [ColumnChooserFooter](#ColumnChooserFooter)
	f. [ColumnChooserBody](#ColumnChooserBody)
	e. [ColumnChooserRowRenderer](#ColumnChooserRowRenderer)
4. [Hooks](#Hooks)
5. [Context](#Context)
6. [PropTypes and structure](#PropTypes and structure)

##Presentation
The column chooser is an overlay / popover component.
It allows you to edit the columns present in a list.
You can hide and show each column individually or by using the select all button.
The column chooser is present is the list toolbar.

The component uses hooks and context.

##How to use it

If you are still constraints with inject api you have to pass an object columnChooser to the list.
This object must holds two fields, columns and submit. You can also locked some columns with nbLockedLeftItems.

| Fields | Type | Info
|---|---|---|
| columns | array | populate the popover
| submit | function | callback trigger when the form is submit
| nbLockedLeftItems | number | the number of locked items you want, beginning at the left


If you are using the compound list you just have to import the [ColumnChooserButton](#ColumnChooserButton) and place it where you need it.

Either way you will have to update the columns props given to the list with the submitted values.

##Components
### ColumnChooserButton

The button wich will trigger the popover with the form and content.
If you pass children you will override the default column chooser renderer.

| Props | Type | Info
|---|---|---|
| children | React.element | the content of the popover
| columns | array | populate the popover
| id | string | Use as prefix for all the subcomponents
| submit | function | callback trigger when the form is submit
| nbLockedLeftItems | number | the number of locked items you want, beginning at the left
| t | function | i18n translate

###ColumnChooser

The base of the popover component.
This component holds the form. If you pass children you will override the default column chooser renderer.
The [columnChooserContext](#columnChooserContext) is initialized here.

| Props | Type | Info
|---|---|---|
| children | React.element, [React.element] | the content of the popover
| columns | array | populate the popover
| id | string | Use as prefix for all the subcomponents
| onClose | function | callback trigger when the submit is done.
| nbLockedLeftItems | number | the number of locked items you want, beginning at the left
| submit | function | callback trigger when the form is submit, passed to the column manager hook (see hook)
| t | function | i18n translate

###ColumnChooserHeader

The header of the column chooser.
Title by default is "Modify columns".
You can pass children to the header to customize it.
It consumes the [columnChooserContext](#columnChooserContext).

| Props | Type | Info
|---|---|---|
| className | string | class passed to the tooltip header
| children | React.element, [React.element] | the header's content of the popover

###ColumnChooserFooter

Footer of the column chooser.
There is two inputs, the select all, which select / unselect all the columns.
And the apply button, which submit the form.
You can pass children and override the default render.
It consumes the [columnChooserContext](#columnChooserContext).

| Props | Type | Info
|---|---|---|
| className | string | class passed to the tooltip header
| children | React.element, [React.element] | the footer's  content of the popover

###ColumnChooserBody

Body of the column chooser.
It renders the differents column row, by default [ColumnChooserRowRenderer](#ColumnChooserRowRenderer).
You can pass children to override it. Children use the render props pattern. It receives the columns as parameters.
It consumes the [columnChooserContext](#columnChooserContext).

| Props | Type | Info
|---|---|---|
| children | function | the body's  content of the popover, called with the columns as arguments.

###ColumnChooserRowRenderer

The row renderer only render its children.
It holds reference to other components: [RowVisibilityCheckbox](#RowVisibilityCheckbox), [RowLabel](#RowLabel).
It consumes the [columnChooserContext](#columnChooserContext).

| Props | Type | Info
|---|---|---|
| children | React.element, [React.element] | the row's  content of the popover

###RowVisibilityCheckbox

Add a checkbox to swith the visibility of a column.
If the column is locked, a locked icon replaces the checkbox.
It consumes the [columnChooserContext](#columnChooserContext).

| Props | Type | Info
|---|---|---|
| index | number | the index of the column
| locked | bool | indicates if the column is locked or not
| value | bool | indicates the visibility value, and if the checkbox is checked

###RowLabel

Add the label's column to the row.

| Props | Type | Info
|---|---|---|
| label | string | the label of the column

##Hooks
### ColumnChooserManagerHook

This hook manages all the intelligence in the column chooser.
You have to pass the columns you want to manage at initialization and a custom submit that will be trigger
when click on the modify button.
If not custom submit is passed nothing happened.

#### function useColumnChooserManager(columns, customSubmit)

```markdown
|       columns         |    	initial columns    								| array	
|      customSubmit    	|     	custom callback trigger on modify button  		| function
```

### ColumnChooserClientHook

This hook is an helper. You can use it in your parent component to configure the column chooser easily
(see stories/list for a complete example).
This will automatically merged the collection you pass with the edited ones.
If you need to read the columns from local storage or redux, do not use this.

#### function  useColumnChooserClient(columns, submitCustomColumnChooser )

```markdown
|       columns         |    	initial columns    								| array	
|      customSubmit    	|     	custom callback trigger on modify button  		| function
```
##Context