import React from 'react';
import { IconsProvider } from '@talend/react-components';
import { SubHeaderBar } from '../src';

const ExampleSubHeaderBar = {
	default: () => (
		<div>
			<IconsProvider />
			<SubHeaderBar />
		</div>
	),
};
export default ExampleSubHeaderBar;
