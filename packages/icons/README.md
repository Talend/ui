# Talend icons

Icons set designed to be simple, modern, friendly, and curvy.
Each icon is reduced to its minimal form, expressing essential characteristics.

## Usage

```bash
yarn add @talend/icons
```

```jsx
import React, { Suspense } from 'react';
import { importIcon } from '@talend/icons';

const Icon = ({ size, name }) => {
	const LazyIcon = React.lazy(() => importIcon(size, name));
	return (
		<Suspense fallback={<IconSkeleton size={size} />}>
			<LazyIcon />
		</Suspense>
	);
};
```
