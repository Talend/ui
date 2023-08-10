import { forwardRef, Ref } from 'react';

import { action } from '@storybook/addon-actions';

import {
	ButtonPrimary,
	ButtonIcon,
	StackVertical,
	Form,
	CollapsiblePanel,
	PopoverTriggerProps,
	Popover,
} from '@talend/design-system';

export default {
	component: Popover,
};

const EasyPopover = () => <StackVertical gap="S">Hello hello</StackVertical>;

/* eslint-disable-next-line react/display-name */
const OpenPopover = forwardRef(({ onClick, ...props }: any, ref: Ref<HTMLButtonElement>) => {
	return (
		<ButtonPrimary
			onClick={() => {
				if (onClick) {
					onClick();
				}
				action('Clicked disclosure');
			}}
			{...props}
			ref={ref}
		>
			Open popover
		</ButtonPrimary>
	);
});

export const DefaultStory = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover aria-label="Custom popover" popup="Text Content">
			<OpenPopover />
		</Popover>
	</div>
);

export const DisclosureStory = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover aria-label="Custom popover" popup="Text Content">
			<ButtonIcon onClick={action('Clicked disclosure')} icon="question-filled" size="M">
				Open popover
			</ButtonIcon>
		</Popover>
	</div>
);

export const InInteractiveComponentStory = () => (
	<CollapsiblePanel
		title="panel"
		metadata={[
			<Popover key="my.popover" data-testid="my.popover" popup={<p>Popover content</p>}>
				<ButtonPrimary onClick={() => {}} data-testid="my.button">
					Open popover
				</ButtonPrimary>
			</Popover>,
		]}
	>
		Some text
	</CollapsiblePanel>
);

export const ChildrenAsFunctionStory = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover aria-label="Custom popover" popup="Text Content">
			{(props: PopoverTriggerProps) => <OpenPopover {...props} />}
		</Popover>
	</div>
);

export const FormDisclosureStory = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover aria-label="Custom popover" popup="Text Content">
			<Form.Text name="text" label="Text enabled" />
		</Popover>
	</div>
);

export const FixedStory = () => (
	<div>
		<Popover aria-label="Custom popover" popup="Text Content" isFixed hasPadding={false}>
			<OpenPopover />
		</Popover>
	</div>
);

export const WithFunctionAsChildren = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover
			aria-label="Custom popover"
			popup={popover => (
				<>
					<StackVertical gap="S">
						There is some content
						<ButtonPrimary onClick={() => popover?.setOpen(false)}>Close Me please</ButtonPrimary>
					</StackVertical>
					<EasyPopover />
				</>
			)}
		>
			<OpenPopover />
		</Popover>
	</div>
);

export const WithoutPaddingStory = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover
			aria-label="Custom popover"
			popup="Text Content without padding"
			isFixed
			hasPadding={false}
		>
			<OpenPopover />
		</Popover>
	</div>
);
