import React from 'react';
import { Args } from '@storybook/react';

import Icon from './Icon';
import { infoFromFigma } from '../dist/info';

export default {
	title: 'Icon',
	component: Icon,
};

// @ts-ignore
export const Usage = {
	args: {
		size: '24',
		name: 'search',
	},
	argTypes: {
		size: {
			// @ts-ignore
			options: [...new Set(Object.values(infoFromFigma))],
			control: {
				type: 'select',
			},
		},
		name: {
			options: Object.keys(infoFromFigma).map(name => name?.split(':')[0]),
			control: {
				type: 'select',
			},
		},
	},
	render: (props: Args) => <Icon {...props} />,
};
