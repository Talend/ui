# HeaderBar container

This container wraps the `HeaderBar` component to make it `cmfConnected` and extend its capabilities.

## Usage

`HeaderBar` **container** can be used as `HeaderBar` **component**.
All the `props` provided to the **container** will be forwarded downwards to the **component**.

## Examples 

### Load products from backend
Here is an example of how to load remote products from a backend

```
import { HeaderBar } from '@talend/containers';
...

const products = {
	...otherProductsProps,
	url: "/my/backend/endpoint",
};

const props = {
	{ ... myOther props },
	products,
}

<HeaderBar {...props} />
```

Keep in mind that the `brand` prop must be provided (due to internal logic of the `HeaderBar` component).

The backend's response must follow the following format (see **Improvements** section):
```
[
	{
		"icon": "icon-from-ui/icons",
		"url": "http://www.product-url.com",
		"label": "My product name"
	},
	...
]
```

## Improvements
- Allow the alteration of fetched products. This would allow for example data formatting (to make it `HeaderBar` component compliant) or to add static entries.
