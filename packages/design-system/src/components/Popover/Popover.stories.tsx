import { forwardRef, Ref } from 'react';
import { action } from '@storybook/addon-actions';
import { Popover, ButtonPrimary, StackVertical, Form } from '../../';
import { PopoverTriggerProps } from './';

export default {
	component: Popover,
};

const EasyPopover = () => <StackVertical gap="S">Hello hello</StackVertical>;

/* eslint-disable-next-line react/display-name */
const OpenPopover = forwardRef(({ onClick, ...props }: any, ref: Ref) => {
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

export const ChildrenAsFunctionStory = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover aria-label="Custom popover" popup="Text Content">
			{(props: PopoverTriggerProps) => <OpenPopover {...props} />}
		</Popover>
	</div>
);

export const FormFocusStory = () => (
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

export const WithContentAsFunction = () => (
	<div style={{ padding: '1.2rem' }}>
		<Popover
			aria-label="Custom popover"
			popup={(popover: DisclosureFnProps) => (
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
