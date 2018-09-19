# SidePanel connected

This connected component give the possibility to handle the routing in the menu internally. In one hand the menu actions handle the change of route and in the other hand, it will define the currently selected/active action of the menu.

## props

| name        |  description                    |
| ----------- | ------------------------------- |
| menuActions | An optional array of menuAction |

A menuAction is an object of action props with some overloaded props used just at this layer :

- `path` : If set, it will :
  - create internally the onClickDispatch with a route change
  - use this prop to match against the current route and define the `selected` action base on it

## Example of use

In a cmf setting :

```json
{
	"props": {
		"SidePanel#main": {
			"dockable": true,
			"menuActions": [
				{
					"componentId": "menu:feature1",
					"path": "/feature1"
				},
				{
					"componentId": "menu:feature2",
					"path": "/feature2"
				}
			]
		},
		"ActionButton#menu:feature1": {
			"id": "main-menu-item:feature1",
			"label": "My feature 1",
			"icon": "talend-datastore"
		},
		"ActionButton#menu:feature2": {
			"id": "main-menu-item:feature2",
			"label": "My feature 2",
			"icon": "talend-datastore"
		}
	}
}
```
