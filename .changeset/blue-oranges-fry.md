---
'@talend/react-components': major
'@talend/react-containers': major
'@talend/bootstrap-theme': major
---

## Breaking changes :
Specific application themes are beeing removed. They were no longer imported by the webpack config, and now we won't be able to import them manually.
- SidePanel icon is no more handled by the application theme
- HeaderBar icon is no more handled by the application theme

### HeaderBar
Use either `icon` or `iconUrl` in the header `brand` property
``` diff
<HeaderBar
    ...
	brand={{
		...props.brand,
+       icon: 'talend-tmc-positive',
	}}
    ...
};
```

### SidePanel
Use `backgroundIcon` in the sidepanel properties
``` diff
+import assetsApi from '@talend/assets-api';

<SidePanel
    ...
+    backgroundIcon={assetsApi.getURL('/src/svg/products/tmc-negative.svg', '@talend/icons')}
    ...
/>
```
