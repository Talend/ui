import React from 'react';
import { storiesOf } from '@storybook/react';
import FormatValue from './FormatValue.component';

storiesOf('Data/Formatter/FormatValue', module).add('default', () => {
	return (
		<FormatValue
			value={`   Show special     chars and newline
	  `}
		/>
	);
});
