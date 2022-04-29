import React from 'react';

import Icon from './Icon';
import * as IconTypes from '../src/icon';

export default {
	title: 'Icon',
	component: Icon,
};

export const Usage = {
	args: {
		size: 'L',
		name: 'abc',
	},
	argTypes: {
		size: {
			options: Object.keys(IconTypes.icons),
			control: {
				type: 'select',
			},
		},
		name: {
			options: IconTypes.icons.L,
			control: {
				type: 'select',
			},
		},
	},
	render: props => <Icon {...props} />,
};
