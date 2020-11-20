import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconsProvider from '../../IconsProvider';

import InputDateTimePicker from '.';

storiesOf('Deprecated/LegacyDteTimePicker', module).add('Legacy - form mode', () => (
	<div>
		<IconsProvider
			bundles={['https://statics-dev.cloud.talend.com/@talend/icons/6.1.4/dist/svg-bundle/all.svg']}
		/>
		<div style={{ width: 150 }}>
			<InputDateTimePicker
				id="my-date-picker"
				name="Datetime"
				onBlur={action('onBlur')}
				onChange={action('onChange')}
				useTime
				formMode
				required={false}
				useSeconds
			/>
		</div>
	</div>
));
