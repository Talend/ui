## Talend DataMapper

This library provides a mapper to connect some input data to output data.
It is a graphical mapper, and it is limited to flat schema.

## Guidelines

[DataMapper](https://company-57688.frontify.com/document/92132#/specific-features/mapper)

## Basic usage

```javascript
import DataMapper from '@talend/react-data-mapper'; //use the DataMapper Container
```  

## DataMapper Component

The dataMapper component is used to display and perform mapping between two flat schema. The schema are displayed with the [Table](https://github.com/Talend/ui/tree/master/packages/components/src/Table) component.
The mapping is displayed with SVG arrows.

Features:

* Connection by drag & drop or by keyboard
* filtering and sorting
* Row selection keyboard/mouse
* Undo/redo

The DataMapper uses default renderer for cell and header, but custom renderers can be provided.

### Concept

In entry, the DataMapper component waits two schema (input and output) and a mapping.

The format of a schema is like this:

    {
    	id: 'fd1574dsd5',
    	name: 'CUSTOMERS PREP',
    	elements: [
    		{
    			id: 'elem_1',
    			name: 'Firstname',
    			type: 'string',
    			description: 'The firstname of the customer (optional)',
    			mandatory: false,
    		},
    		{
    			id: 'elem_2',
    			name: 'Lastname',
    			type: 'string',
    			description: 'The lastname of the customer (mandatory)',
    			mandatory: true,
    		},
    		{
    			id: 'elem_3',
    			name: 'Birthday',
    			type: 'date',
    			description: 'The birthday of the customer (optional)',
    			mandatory: false,
    		},
    		{
    			id: 'elem_4',
    			name: 'Address',
    			type: 'address',
    			description: 'The address of the customer (mandatory)',
    			mandatory: true,
    		}
    	]
    }

A schema must have at least an unique identifier (string), a name (string) and an array of elements.
An element must have at least an unique identifier (string).

### Props

Below are the props of the mapper component:

| property              | description                                                                               | type     | default                  |
| --------------------- | ----------------------------------------------------------------------------------------- | -------- | ------------------------ |
| dataAccessor          | This object provides methods to read data from schema, edit mapping and manage undo/redo  | object   |                          |
| mapping               | An array which contains mapping items, i.e. connections between input and output elements | array    |                          |
| mappingActions        | Custom actions displayed on top of the mapping area                                       | array    |                          |
| input                 | An object providing all the configuration for input schema                                | object   |                          |
| output                | An object providing all the configuration for output schema                               | object   |                          |
| onFilterChange        | Function called when a filter parameter is changed                                        | function |                          |
| onSortChange          | Function called when the direction of a sorter has changed                                | function |                          |
| selection             | This object stores information about the current selection                                | object   |                          |
| onSelect              | Function called when a click event occurs on a schema element                             | function |                          |
| focused               | This object provides information about the current focused element                        | object   |                          |
| dnd                   | This object provides information about the current drag and drop process                  | object   |                          |
| dndListener           | This object provides callback methods related to the drag and drop                        | object   |                          |
| pendingItem           | This object stores information about                                                      | object   |                          |
| onEnterElement        | Function called when an onMouseEnter event is emitted from a schema element               | function |                          |
| onLeaveElement        | Function called when an onMouseLeave event is emitted from a schema element               | function |                          |
| preferences           | This object provides some preferences                                                     | object   |                          |
| trigger               | This object stores information about the last event which lead to an update of the mapper | object   |                          |
| status                | This provides information about the last modification of the state of the mapper          | number   |                          |

### DataAccessor

The dataAccessor object has several responsabilities:

 * it stores the result of filtering and sorting and provides some convenient methods to access to filtered and sorted elements;
 * it provides methods to read and edit the current mapping;
 * it allows undo/redo by storing all the executed commands in dedicated undo/redo stacks.

### Input/Output props

Below is the content of the input and output props:

| property              | description                                                                               | type     | default                  |
| --------------------- | ----------------------------------------------------------------------------------------- | -------- | ------------------------ |
| schema                | This object provides information about the schema (id, name, elements)                    | object   |                          |
| columns               | This array provides information about the displayed columns                               | array    |                          |
| rowsClassName         | This object provides classes for schema elements                                          | object   |                          |
| withTitle             | This boolean indicates if the name of the schema is displayed as the table title          | boolean  |                          |
| withHeader            | This boolean indicates if the header of table is displayed                                | boolean  |                          |
| filters               | This array provides the filters                                                           | array    |                          |
| sorters               | This object provides the sorters                                                          | object   |                          |

Below is an example of rowsClassName:

    {
    	'elem_1': 'highlighted mapped',
    	'elem_3': 'selected',
    }

In this example 'elem_1' and 'elem_3' are identifier of elements. So the element identified by 'elem_1' has custom classes 'highlighted mapped'.

### Columns props

Below is the content of column props:

| property              | description                                                                               | type     | default                  |
| --------------------- | ----------------------------------------------------------------------------------------- | -------- | ------------------------ |
| key                   | This string must be an element key. It is used to get the displayed values in column      | string   |                          |
| label                 | The label displayed in the header of the column                                           | string   |                          |
| headRenderer          | A custom renderer used to display the header of the column                                | function |                          |
| headExtraProps        | An optional object providing props for the custom renderer defined above                  | object   |                          |
| cellRenderer          | A custom renderer used to display the value of a cell in the column                       | function |                          |
| cellExtraProps        | An optional object providing props for the custom renderer defined above                  | object   |                          |

Below is an example of columns:

    [
    	NAME: {
    		key: 'name',
    		label: 'Name',
    	},
    	TYPE: {
    		key: 'type',
    		label: 'Type',
    	},
    	DESC: {
    		key: 'description',
    		label: 'Description',
    	}
    ]

If we apply these props to the schema 'CUSTOMERS PREP' defined above, the result is:

| Name           | Type       | description                                                                 |
| -------------- | ---------- | --------------------------------------------------------------------------- |
| Firstname      | string     | The firstname of the customer (optional)                                    |
| Lastname       | string     | The lastname of the customer (mandatory)                                    |
| Birthday       | date       | The birthday of the customer (optional)                                     |
| Address        | address    | The address of the customer (mandatory)                                     |

### Filters props

Below is the content of filter props:

| property              | description                                                                               | type     | default                  |
| --------------------- | ----------------------------------------------------------------------------------------- | -------- | ------------------------ |
| id                    | An unique identifier of a filter                                                          | string   |                          |
| active                | A boolean indicating if the filter is active or not                                       | boolean  |                          |
| params                | This object stores the parameters of the filter                                           | object   |                          |
| match                 | This function implements the filter logic and returns the visibility of an element        | function |                          |
| renderer              | Component used to display the filter                                                      | function |                          |
| rendererProps         | This object provides props for the filter component defined above                         | function |                          |

The match function is called for each element of the schema. If it returns true, then the element is visible. if it returns false, then the element is filtered and not visible.
The filter params are used to store any information used to compute the filtering result.

### Sorters props

Sorters are provided as an object in which keys correspond to column keys.
Each sorter must be defined with the following props:

| property              | description                                                                               | type     | default                  |
| --------------------- | ----------------------------------------------------------------------------------------- | -------- | ------------------------ |
| direction             | This defines the direction of the sort. It has three values: none, ascending, descending  | string   | none                     |
| icons                 | This object provides the icons used to display the sort direction                         | object   |                          |

Below is an example of sorter props for the 'name' column:

    {
    	name: {
    		direction: 'none',
    		icons: {
    			none: null,
    			ascending: 'talend-sort-asc',
    			descending: 'talend-sort-desc',
    		}
    	}
    }

## Container DataMapper

The container DataMapper holds the global state and implements all the logic needed by the user interactions.

### API

| property              | description                                                                                    | type     | default                  |
| --------------------- | ---------------------------------------------------------------------------------------------- | -------- | ------------------------ |
| mappingActions        | Custom actions displayed on top of the mapping area                                            | array    |                          |
| mappingKey            | This defines the element key used to detect possible mapping between input and output elements | string   |                          |
| input                 | An object providing all the configuration for input schema                                     | object   |                          |
| output                | An object providing all the configuration for output schema                                    | object   |                          |
| preferences           | This object provides some preferences                                                          | object   |                          |

### Drag & Drop

The drag & drop is implemented by using [react-dnd](https://github.com/react-dnd/react-dnd).

The dnd props provides the current status of a drag & drop process. The steps of a drag & drop process are:

##### no drag & drop in progress: the dnd props is null.

##### begin drag: move of an element is started. The dnd props is:

    {
       source: { sourceElement, sourceSide },
       target: null,
       inProgress: false,
    }
    
where sourceElement is the dragged element and sourceSide specify the source schema (INPUT or OUTPUT).

##### drag in progress: the dragged element is moved in the mapping area. The dnd props is:

    {
       source: { sourceElement, sourceSide },
       target: null,
       inProgress: true,
    }

##### can drop: the dragged element is moved onto a target element. The dnd props is:

    {
       source: { sourceElement, sourceSide },
       target: { targetElement, targetSide },
       inProgress: false,
    }

where targetElement is the target element and targetSide specify the target schema (INPUT or OUTPUT).

##### drop: the dragged element is dropped onto a target element. The dnd props is null.

##### end drag: the drag & drop process is finished. The dnd props is null.

 