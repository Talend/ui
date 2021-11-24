import React from 'react';
import { action } from '@storybook/addon-actions';

import Tooltip from './Tooltip';
import Button from '../Button';

export const Template = props => (
	<Tooltip {...props}>
		<Button onClick={action('clicked')}>Lorem ipsum</Button>
	</Tooltip>
);

const defaultProps = {
	title: 'Relevant information about this basic button',
};

export const Top = Template.bind({});
Top.args = { ...defaultProps, placement: 'top' };

export const Right = Template.bind({});
Right.args = { ...defaultProps, placement: 'right' };

export const Bottom = Template.bind({});
Bottom.args = { ...defaultProps, placement: 'bottom' };

export const Left = Template.bind({});
Left.args = { ...defaultProps, placement: 'left' };
