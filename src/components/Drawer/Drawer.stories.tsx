import React from 'react';
import { Area } from '../../docs';

export const defaultProps = {
	heading: <Area>Heading</Area>,
	children: <Area>Body</Area>,
	footer: <Area>Footer</Area>,
	visible: true,
};

export const Simple = {
	args: defaultProps,
};
