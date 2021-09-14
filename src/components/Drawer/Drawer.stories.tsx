import React from 'react';
import { Area } from '../../docs';
import Button from '../Button';

export const defaultProps = {
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
		toggleButton: <Button.Icon icon="talend-panel-opener-right">Toggle drawer</Button.Icon>,
	},
};
