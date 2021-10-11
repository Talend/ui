import React from 'react';
import { addDecorator } from '@storybook/react';
import IconProvider from '@talend/react-components/lib/IconsProvider';

addDecorator(storyFn => (
	<div
		style={{
			height: '100%',
			width: '100%',
			overflow: 'auto',
			padding: '3rem',
			backgroundColor: 'rgba(145, 209, 237, 0.1)',
		}}
	>
		<IconProvider
			bundles={['https://statics-dev.cloud.talend.com/@talend/icons/6.4.0/dist/svg-bundle/all.svg']}
		/>
		<React.Suspense fallback={null}>{storyFn()}</React.Suspense>
	</div>
));
