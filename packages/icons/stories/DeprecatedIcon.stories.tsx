import React from 'react';

import Icon from './Icon';
import * as IconTypes from '../src/icon';

export default {
	title: 'Deprecated/Icon',
	parameters: {
		docs: {
			description: {
				component: 'Deprecated icons will be removed in the next major version.',
			},
		},
	},
	component: Icon,
};

export const Usage = {
	args: {
		name: 'logo-square',
	},
	argTypes: {
		name: {
			options: Object.keys(IconTypes.legacyIcons).reduce((acc, key) => {
				// eslint-disable-next-line no-param-reassign
				acc = acc.concat(IconTypes.legacyIcons[key]);
				return acc;
			}, []),
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		Story => (
			<div style={{ width: '2.4rem', height: '2.4rem' }}>
				<Story />
			</div>
		),
	],
	render: props => <Icon {...props} />,
};
