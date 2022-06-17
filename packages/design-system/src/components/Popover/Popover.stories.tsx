import React from 'react';

import Popover from './Popover';
import { ButtonPrimary } from '../Button';
import { action } from '@storybook/addon-actions';
import { PopoverStateReturn } from 'reakit/ts';
import { StackVertical } from '../Stack';

export default {
	component: Popover,
};

function EasyPopover() {
	return <StackVertical gap="S">Hello hello</StackVertical>;
}

function ChildrenAsFunctionPopoverContent({ popover }: { popover?: PopoverStateReturn }) {
	return (
		<StackVertical gap="S">
			There is some content
			<ButtonPrimary onClick={() => popover?.hide()}>Close Me please</ButtonPrimary>
		</StackVertical>
	);
}

export const DefaultStory = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover
			aria-label="Custom popover"
			disclosure={
				<ButtonPrimary onClick={action('Clicked disclosure')}>Open popover</ButtonPrimary>
			}
		>
			Text Content
		</Popover>
	</div>
);

export const WithFunctionAsChildren = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover
			aria-label="Custom popover"
			disclosure={
				<ButtonPrimary onClick={action('Clicked disclosure')}>Open popover</ButtonPrimary>
			}
		>
			{(popover: PopoverStateReturn) => <ChildrenAsFunctionPopoverContent popover={popover} />}
			<EasyPopover />
		</Popover>
	</div>
);
