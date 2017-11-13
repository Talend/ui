import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { SelectObject } from '../src';

const ExampleSelectObject = {
	default: () => (
		<div>
			<IconsProvider />
			<SelectObject source="with.data" />
		</div>
	),
};
export default ExampleSelectObject;
