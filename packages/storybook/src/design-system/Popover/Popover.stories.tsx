import React from 'react';

import { action } from '@storybook/addon-actions';
import { PopoverStateReturn } from 'reakit/ts';
import { Popover, ButtonPrimary, ButtonIcon, StackVertical, Form } from '@talend/design-system';
import { PopoverDisclosureHTMLProps } from 'reakit';

export default {
	component: Popover,
};

const EasyPopover = () => <StackVertical gap="S">Hello hello</StackVertical>;

const OpenPopover = (props: PopoverDisclosureHTMLProps) => (
	<ButtonPrimary onClick={action('Clicked disclosure')} {...props}>
		Open popover
	</ButtonPrimary>
);

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

export const FormDisclosureStory = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover
			aria-label="Custom popover"
			focusOnDisclosure
			disclosure={<Form.Text name="text" label="Text enabled" />}
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
