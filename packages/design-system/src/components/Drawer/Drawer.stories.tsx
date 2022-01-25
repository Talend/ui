import React from 'react';
import { Area } from '~docs';

import Drawer from '.';
import { ButtonIcon } from '../ButtonIcon';

export default {
	component: Drawer,
};

const defaultProps = {
	heading: <Area>Heading</Area>,
	children: <Area>Body</Area>,
	footer: <Area>Footer</Area>,
	visible: true,
};

export const Simple = {
	args: defaultProps,
};

export const WithToggleButton = {
	args: {
		...defaultProps,
		toggleButton: (
			<ButtonIcon icon="talend-panel-opener-right" onClick={() => {}}>
				Toggle drawer
			</ButtonIcon>
		),
	},
};
