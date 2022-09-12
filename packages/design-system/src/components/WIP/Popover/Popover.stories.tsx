import React, { forwardRef, Ref } from 'react';

import Popover from './Popover';
import { ButtonPrimary } from '../../Button';
import { action } from '@storybook/addon-actions';
import { PopoverStateReturn } from 'reakit/ts';
import { StackVertical } from '../../Stack';
import { PopoverDisclosureHTMLProps } from 'reakit';
import { ButtonIcon } from '../../ButtonIcon';

export default {
	component: Popover,
};

const EasyPopover = () => <StackVertical gap="S">Hello hello</StackVertical>;

const OpenPopover = forwardRef((props: PopoverDisclosureHTMLProps, ref: Ref<HTMLButtonElement>) => {
	function handleClick(event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) {
		action('Clicked disclosure');
		if (props.onClick) {
			props.onClick(event as React.MouseEvent<any>);
		}
	}
	return (
		<ButtonPrimary {...props} onClick={handleClick} ref={ref}>
			Open popover
		</ButtonPrimary>
	);
});

export const DefaultStory = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover aria-label="Custom popover" disclosure={<OpenPopover />}>
			Text Content
		</Popover>
	</div>
);

export const DisclosureStory = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover
			aria-label="Custom popover"
			disclosure={
				<ButtonIcon onClick={action('Clicked disclosure')} icon="question-filled">
					Open popover
				</ButtonIcon>
			}
		>
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
			{(popover: PopoverStateReturn) => (
				<StackVertical gap="S">
					There is some content
					<ButtonPrimary onClick={() => popover?.hide()}>Close Me please</ButtonPrimary>
				</StackVertical>
			)}
			<EasyPopover />
		</Popover>
	</div>
);
