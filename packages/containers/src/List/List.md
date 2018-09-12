# List container

## How to make a custom sort in the list for one column

For some use functional cases, you may want to use a custom sort on a column. To make it, you have to follow theses steps :

1.  create the sort function

The function you have to create must be a curry function in order to get the "sortBy" parameter, this parameter is required because the a & b values are filled with a row each. As we want to sort on only a column, we have to know on what column the current sort is asked.

```javascript
function sortByLength(sortBy) {
	return function sort(a, b) {
		return a.get(sortBy).length - b.get(sortBy).length;
	};
}
```

2.  Register the function in the cmf registry

Next, we have to register the function, here, there is no prefix required, but it could be easier if you want next to look in the registry to see one

```javascript
api.registry.addToRegistry('_list_sort:sortByLength', sortByLength);
```

3.  Reference the custom sort in the list's columns

The we have to give to the column the sort function we want to apply.

```javascript
{ key: 'label', label: 'Name', sortFunction: '_list_sort:sortByLength' },
```

It's all done. The list would apply the custom sort.

## Custom action support for filterBar and sorting

1. custom action for filterBar

The custom actions for filterBar allows to override default actions onToggle or onFilter (ex: for a server side filter).
Following sagas are dispatched to perform server side operations onToggle or onFilter,
```
	LIST_TOGGLE_FILTER: 'LIST_TOGGLE_FILTER',
	LIST_FILTER_CHANGE: 'LIST_FILTER_CHANGE'
```
Setting the following attributes in cmf settings will disable the default filter and paging,
```
	"toolbar": {
              "filter": {
                "defaultFiltering": false
              }
              "pagination": {
                "defaultPaging": false
              }
            }
```

2. custom action for sorting

The custom actions on sort allows to override default action onSorting (ex: for a server side sorting).
Following sagas are dispatched to perform server side operations onSorting,

```
	LIST_CHANGE_SORT_ORDER: 'LIST_CHANGE_SORT_ORDER'
```
Setting the following attributes in cmf settings will disable the default sorting,
```
	"sort": {
               "defaultSorting": false
            }
```
