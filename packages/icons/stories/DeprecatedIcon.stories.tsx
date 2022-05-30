import React from 'react';
import { Story } from '@storybook/react';

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
				<style
					dangerouslySetInnerHTML={{
						__html: '.sb-docs.sb-docs-svg svg { width: 2.4rem; height: 2.4rem; }',
					}}
				/>
				<Story />
			</>
		),
	],
};
