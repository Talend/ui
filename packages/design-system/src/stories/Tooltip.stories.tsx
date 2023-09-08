import { Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ButtonPrimary, Tooltip } from '../';

export default { component: Tooltip, title: 'Messaging/Tooltip' };

// eslint-disable-next-line storybook/prefer-pascal-case
export const render = (props: Story<typeof Tooltip>) => (
	<Tooltip {...props}>
		<ButtonPrimary onClick={action('clicked')}>Lorem ipsum</ButtonPrimary>
	</Tooltip>
);

const defaultProps = {
	title: 'Relevant information about this basic button',
};

export const Top = { args: { ...defaultProps, placement: 'top' }, render };

export const Right = { args: { ...defaultProps, placement: 'right' }, render };

export const Bottom = { args: { ...defaultProps, placement: 'bottom' }, render };

export const Left = { args: { ...defaultProps, placement: 'left' }, render };
