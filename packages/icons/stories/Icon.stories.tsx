import React from 'react';
import { Story } from '@storybook/react';

import Icon, { realIconNames, realIconSizes } from './Icon';

export default {
	title: 'Icon',
	component: Icon,
};

export const Usage = {
	args: {
		size: 'L',
		name: 'check',
	},
	argTypes: {
		size: {
			options: realIconSizes,
			control: {
				type: 'select',
			},
		},
		name: {
			options: realIconNames,
			control: {
				type: 'select',
			},
		},
	},
	render: (props: Story<typeof Icon>) => <Icon {...props} />,
};
