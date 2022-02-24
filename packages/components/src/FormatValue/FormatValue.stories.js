import React from 'react';
import FormatValue from './FormatValue.component';

export default {
	title: 'Data/Formatter/FormatValue',
};

export const Default = () => {
	return (
		<FormatValue
			value={`   Show special     chars and newline
      `}
		/>
	);
};

Default.story = {
	name: 'default',
};
