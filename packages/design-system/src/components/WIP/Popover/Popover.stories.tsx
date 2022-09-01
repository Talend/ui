import React from 'react';

import Popover from './Popover';
import { ButtonPrimary } from '../../Button';
import { action } from '@storybook/addon-actions';
import { PopoverStateReturn } from 'reakit/ts';
import { StackVertical } from '../../Stack';

export default {
	component: Popover,
};

const EasyPopover = () => <StackVertical gap="S">Hello hello</StackVertical>;
const OpenPopover = () => (
	<ButtonPrimary onClick={action('Clicked disclosure')}>Open popover</ButtonPrimary>
);

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
		<Popover aria-label="Custom popover" disclosure={<OpenPopover />}>
			Text Content
		</Popover>
	</div>
);

export const WithoutPaddingStory = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover aria-label="Custom popover" disclosure={<OpenPopover />} isFixed hasPadding={false}>
			Text Content without padding
		</Popover>
	</div>
);

export const WithFunctionAsChildren = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover aria-label="Custom popover" disclosure={<OpenPopover />}>
			{(popover: PopoverStateReturn) => <ChildrenAsFunctionPopoverContent popover={popover} />}
			<EasyPopover />
		</Popover>
	</div>
);
