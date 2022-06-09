import React from 'react';

import Popover from './Popover';
import { ButtonPrimary } from '../Button';
import { action } from '@storybook/addon-actions';

export default {
	component: Popover,
};

export const DefaultStory = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover
			aria-label="Custom popover"
			disclosure={
				<ButtonPrimary onClick={action('Clicked disclosure')}>Open popover</ButtonPrimary>
			}
		>
			Custom popover
		</Popover>
	</div>
);
