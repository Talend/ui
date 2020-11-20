import React from 'react';
import { storiesOf } from '@storybook/react';
import IconsProvider from '../IconsProvider';
import ActionIntercom from './Intercom.component';

const config = { app_id: 'fyq3wodw', email: 'toto@gmail.com' };

storiesOf('Messaging & Communication/Intercom', module).add('default', () => (
	<React.Fragment>
		<IconsProvider
			bundles={['https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg']}
		/>
		<ActionIntercom id="intercom" config={config} />
	</React.Fragment>
));
