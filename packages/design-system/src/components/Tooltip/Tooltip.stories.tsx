import React from 'react';
import { Story } from '@storybook/react';

import Tooltip from './Tooltip';

import Button from '../Button';

export default { component: Tooltip };

export const render = (props: Story<typeof Tooltip>) => (
	<Tooltip {...props}>
		<Button>Lorem ipsum</Button>
	</Tooltip>
);

const defaultProps = {
	title: 'Relevant information about this basic button',
};

export const Top = { args: { ...defaultProps, placement: 'top' }, render };

export const Right = { args: { ...defaultProps, placement: 'right' }, render };

export const Bottom = { args: { ...defaultProps, placement: 'bottom' }, render };

export const Left = { args: { ...defaultProps, placement: 'left' }, render };
