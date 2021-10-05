# Display mode

UIForm accept a `displayMode` props. The value `text` will switch display to a definition list, following the ui specs.

```javascript
import React from 'react';
import { UIForm } from '@talend/react-forms/lib/UIForm';
import MyWidget, { MyWidgetTextMode } from './MyWidget';

function MyComponent(props) {
	return (<UIForm
		{...props}
		displayMode="text"
		widgets={{ myWidget: MyWidget, myWidget_text: MyWidgetTextMode }}
	/>);
}
```

The rendered widgets will be selected with the name `${widgetId}_${displayMode}`.
For example, the textarea will be the one registered under `textarea_text` id.
You can pass custom widgets for text mode with the `widgets` props.


## Next

[Go to next step: Triggers](./triggers.md)
