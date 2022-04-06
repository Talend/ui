# plugin-import-from-index

This module is a babel plugin that transform default imports from specific file, into named imports from index.

Before

```javascript
import React from 'react';
import { SidePanel } from '@talend/react-components';
import Actions, { ActionButton, ActionDropdown } from '@talend/react-components/lib/actions';
import List from '@talend/react-components/lib/List';
```

After

```javascript
import React from 'react';
import { SidePanel, Actions, ActionButton, ActionDropdown, List } from '@talend/react-components';
```

## How to use

Installation

```bash
npm i --dev @talend/babel-plugin-import-from-index
```

```bash
yarn add -D @talend/babel-plugin-import-from-index
```

Configuration

```json
// .babelrc.json
{
	"plugins": ["@talend/babel-plugin-import-from-index"]
}
```
