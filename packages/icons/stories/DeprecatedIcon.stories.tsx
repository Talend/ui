import React from 'react';
import { Args, Story } from '@storybook/react';

import Icon from './Icon';
import { info as icons } from '../dist/info';

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
		name: 'talend-box',
	},
	argTypes: {
		name: {
			options: Object.keys(icons),
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		(Story: Story) => (
			<>
				<style dangerouslySetInnerHTML={{ __html: 'svg { width: 2.4rem;  height: 2.4rem; }' }} />
				<Story />
			</>
		),
	],
	render: (props: Args) => <Icon {...props} />,
};
