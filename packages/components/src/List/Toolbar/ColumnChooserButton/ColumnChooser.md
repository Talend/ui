# Column Chooser

The column chooser component allows you to edit the columns list. You can redorder them, or hide them.
You can acces it from a button in the list toolbar.

This component uses hooks.

## ColumnChooserButton props

```markdown
|          id         	|    id button / overlay    	|		string
|      ariaLabel      	|     aria-label button     	|		string
|       columns       	| columns displayed chooser 	|		array
| submitColumnChooser 	|   modify button callback  	|		function
|          t          	|     translate function    	|		function
```

#### columns shape

```json
{
 label: 'myLabel',
 order: 1,
 locked: false,
 hidden: false,
}
```

## ColumnChooserManagerHook

This hook manages all the intelligence in the column chooser.
You have to pass the columns you want to manage at initialization and a custom submit that will be trigger
when click on the modify button.
If not custom submit is passed nothing happened.

#### function useColumnChooserManager(columns, customSubmit)

```markdown
|       columns         |    	initial columns    								| array	
|      customSubmit    	|     	custom callback trigger on modify button  		| function
```

## ColumnChooserClientHook

This hook is an helper. You can use it in your parent component to configure the column chooser easily
(see stories/list for a complete example).
This will automatically merged the collection you pass with the edited ones.
If you need to read the columns from local storage or redux, do not use this.

#### function  useColumnChooserClient(columns, submitCustomColumnChooser )

```markdown
|       columns         |    	initial columns    								| array	
|      customSubmit    	|     	custom callback trigger on modify button  		| function
```
