# SidePanel connected

This connected component give the possibility to handle the routing in the menu internally. In one hand the menu actions handle the change of route and in the other hand, it will define the currently selected/active action of the menu.


## props

| name    |  description                    |
| ------- | ------------------------------- |
| actions | A required array of Action props |

The sidepanel will parse theses props and will manage the selected item using `action.href` and the router current path.

The fact that you add href to the action props will

- add the onClickDispatch that will change the route
- It will render a link instead of a button but the UI is the same (not the UX)
- use this prop to match against the current route and define the `selected` action base on it which is the props used by the pure component to make the corresponding <li> as the selected one


## Example of use

In a cmf setting :

```json
{
	"props": {
		"SidePanel#main": {
			"dockable": true,
			"actions": [
				{
					"componentId": "menu:feature1",
					"href": "/feature1"
				},
				{
					"componentId": "menu:feature2",
					"href": "/feature2"
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
