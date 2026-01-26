import { useState } from 'react';
import { StoryFn, Story } from '@storybook/react';
import { action } from 'storybook/actions';

import {
	ButtonPrimary,
	ButtonSecondary,
	ButtonDestructive,
	ButtonTertiary,
	Button,
	Skeleton,
	StackHorizontal,
	StackVertical,
	Tooltip,
} from '../../';

import { BaseButtonProps, AvailableSizes } from '../../components/Button/Primitive/ButtonPrimitive';

const commonArgTypes = {
	children: {
		control: { type: 'text' },
	},
	onClick: {
		disabled: true,
		description: 'A callback function',
	},
	icon: {
		control: { type: 'text' },
		description:
			'optional. In regular size, it supports both Icon (legacy) and SizedIcon<"M"> names. In small size, it only supports SizedIcon<"S"> names.',
	},
	isLoading: {
		control: { type: 'boolean' },
		description: 'optional',
	},
	isDropdown: {
		control: { type: 'boolean' },
		description: 'optional',
	},
	disabled: {
		control: { type: 'boolean' },
		description: 'optional',
	},
	focusable: {
		control: { type: 'boolean' },
		description: 'optional',
	},
	size: {
		options: ['M', 'S'],
		control: { type: 'select' },
		description: 'optional (default is "M")',
	},
	type: {
		options: ['button', 'submit', 'reset'],
		control: { type: 'select' },
		description: 'optional (default is "button")',
	},
};

export default {
	component: ButtonPrimary,
	title: 'Clickable/Button',
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
	},
};

const PrimaryTemplate: StoryFn<typeof ButtonPrimary> = args => {
	return <ButtonPrimary {...args} />;
};
const DestructiveTemplate: StoryFn<typeof ButtonDestructive> = args => {
	return <ButtonDestructive {...args} />;
};

const SecondaryTemplate: StoryFn<typeof ButtonSecondary> = args => {
	return <ButtonSecondary {...args} />;
};

const TertiaryTemplate: StoryFn<typeof ButtonTertiary> = args => {
	return <ButtonTertiary {...args} />;
};

export const Primary = PrimaryTemplate.bind({});
Primary.argTypes = commonArgTypes;
Primary.args = {
	children: 'Primary',
	onClick: action('Button clicked'),
	icon: 'talend-plus',
	isLoading: false,
	size: 'M',
};

export const Destructive = DestructiveTemplate.bind({});
Destructive.argTypes = commonArgTypes;
Destructive.args = {
	children: 'Destructive',
	onClick: action('Button clicked'),
	icon: 'talend-plus',
	isLoading: false,
	size: 'M',
};
export const Secondary = SecondaryTemplate.bind({});
Secondary.argTypes = commonArgTypes;
Secondary.args = {
	children: 'Secondary',
	onClick: action('Button clicked'),
	icon: 'talend-plus',
	isLoading: false,
	size: 'M',
};
export const Tertiary = TertiaryTemplate.bind({});
Tertiary.argTypes = commonArgTypes;
Tertiary.args = {
	children: 'Tertiary',
	onClick: action('Button clicked'),
	icon: 'talend-plus',
	isLoading: false,
	size: 'M',
};

export const PrimaryVariations = () => (
	<StackHorizontal gap="S" justify="spaceBetween" align="stretch">
		<StackVertical gap="S" justify="start" align="center">
			<h3>Default</h3>
			<ButtonPrimary onClick={action('Clicked')}>Primary M</ButtonPrimary>
			<ButtonPrimary onClick={action('Clicked')} size="S">
				Primary S
			</ButtonPrimary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>With icon</h3>
			<ButtonPrimary icon="upload" onClick={action('Clicked')}>
				Primary M
			</ButtonPrimary>
			<ButtonPrimary onClick={action('Clicked')} size="S" icon="upload">
				Primary S
			</ButtonPrimary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>With dropdown indicator</h3>
			<ButtonPrimary icon="upload" isDropdown onClick={action('Clicked')}>
				Primary M
			</ButtonPrimary>
			<ButtonPrimary icon="upload" isDropdown onClick={action('Clicked')} size="S">
				Primary S
			</ButtonPrimary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Disabled</h3>
			<ButtonPrimary icon="upload" isDropdown onClick={action('Clicked')} disabled>
				Primary M
			</ButtonPrimary>
			<ButtonPrimary icon="upload" isDropdown onClick={action('Clicked')} size="S" disabled>
				Primary S
			</ButtonPrimary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Loading</h3>
			<ButtonPrimary icon="upload" isDropdown onClick={action('Clicked')} isLoading>
				Primary M
			</ButtonPrimary>
			<ButtonPrimary icon="upload" isDropdown onClick={action('Clicked')} size="S" isLoading>
				Primary S
			</ButtonPrimary>
		</StackVertical>
	</StackHorizontal>
);

export const DestructiveVariations = () => (
	<StackHorizontal gap="S" justify="spaceBetween" align="stretch">
		<StackVertical gap="S" justify="start" align="center">
			<h3>Default</h3>
			<ButtonDestructive onClick={action('Clicked')}>Destructive M</ButtonDestructive>
			<ButtonDestructive onClick={action('Clicked')} size="S">
				Destructive S
			</ButtonDestructive>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>With icon</h3>
			<ButtonDestructive icon="upload" onClick={action('Clicked')}>
				Primary M
			</ButtonDestructive>
			<ButtonDestructive icon="upload" onClick={action('Clicked')} size="S">
				Primary S
			</ButtonDestructive>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>With dropdown indicator</h3>
			<ButtonDestructive icon="upload" isDropdown onClick={action('Clicked')}>
				Destructive M
			</ButtonDestructive>
			<ButtonDestructive icon="upload" isDropdown onClick={action('Clicked')} size="S">
				Destructive S
			</ButtonDestructive>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Disabled</h3>
			<ButtonDestructive icon="upload" isDropdown onClick={action('Clicked')} disabled>
				Destructive M
			</ButtonDestructive>
			<ButtonDestructive icon="upload" isDropdown onClick={action('Clicked')} size="S" disabled>
				Destructive S
			</ButtonDestructive>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Loading</h3>
			<ButtonDestructive icon="upload" isDropdown onClick={action('Clicked')} isLoading>
				Destructive M
			</ButtonDestructive>
			<ButtonDestructive icon="upload" isDropdown onClick={action('Clicked')} size="S" isLoading>
				Destructive S
			</ButtonDestructive>
		</StackVertical>
	</StackHorizontal>
);

export const SecondaryVariations = () => (
	<StackHorizontal gap="S" justify="spaceBetween" align="stretch">
		<StackVertical gap="S" justify="start" align="center">
			<h3>Default</h3>
			<ButtonSecondary onClick={action('Clicked')}>Secondary M</ButtonSecondary>
			<ButtonSecondary onClick={action('Clicked')} size="S">
				Secondary S
			</ButtonSecondary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>With icon</h3>
			<ButtonSecondary icon="upload" onClick={action('Clicked')}>
				Primary M
			</ButtonSecondary>
			<ButtonSecondary icon="upload" onClick={action('Clicked')} size="S">
				Primary S
			</ButtonSecondary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>With dropdown indicator</h3>
			<ButtonSecondary icon="upload" isDropdown onClick={action('Clicked')}>
				Secondary M
			</ButtonSecondary>
			<ButtonSecondary icon="upload" isDropdown onClick={action('Clicked')} size="S">
				Secondary S
			</ButtonSecondary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Disabled</h3>
			<ButtonSecondary icon="upload" isDropdown onClick={action('Clicked')} disabled>
				Secondary M
			</ButtonSecondary>
			<ButtonSecondary icon="upload" isDropdown onClick={action('Clicked')} size="S" disabled>
				Secondary S
			</ButtonSecondary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Loading</h3>
			<ButtonSecondary icon="upload" isDropdown onClick={action('Clicked')} isLoading>
				Secondary M
			</ButtonSecondary>
			<ButtonSecondary icon="upload" isDropdown onClick={action('Clicked')} size="S" isLoading>
				Secondary S
			</ButtonSecondary>
		</StackVertical>
	</StackHorizontal>
);

export const TertiaryVariations = () => (
	<StackHorizontal gap="S" justify="spaceBetween" align="stretch">
		<StackVertical gap="S" justify="start" align="center">
			<h3>Default</h3>
			<ButtonTertiary onClick={action('Clicked')}>Tertiary M</ButtonTertiary>
			<ButtonTertiary onClick={action('Clicked')} size="S">
				Tertiary S
			</ButtonTertiary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>With icon</h3>
			<ButtonTertiary icon="upload" onClick={action('Clicked')}>
				Primary M
			</ButtonTertiary>
			<ButtonTertiary icon="upload" onClick={action('Clicked')} size="S">
				Primary S
			</ButtonTertiary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>With dropdown indicator</h3>
			<ButtonTertiary icon="upload" isDropdown onClick={action('Clicked')}>
				Tertiary M
			</ButtonTertiary>
			<ButtonTertiary icon="upload" isDropdown onClick={action('Clicked')} size="S">
				Tertiary S
			</ButtonTertiary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Disabled</h3>
			<ButtonTertiary icon="upload" isDropdown onClick={action('Clicked')} disabled>
				Tertiary M
			</ButtonTertiary>
			<ButtonTertiary icon="upload" isDropdown onClick={action('Clicked')} size="S" disabled>
				Tertiary S
			</ButtonTertiary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Loading</h3>
			<ButtonTertiary icon="upload" isDropdown onClick={action('Clicked')} isLoading>
				Tertiary M
			</ButtonTertiary>
			<ButtonTertiary icon="upload" isDropdown onClick={action('Clicked')} size="S" isLoading>
				Tertiary S
			</ButtonTertiary>
		</StackVertical>
	</StackHorizontal>
);

export const SkeletonButton = () => {
	return (
		<StackHorizontal gap="XS">
			<Skeleton variant="button" />
			<Skeleton variant="button" size="S" />
		</StackHorizontal>
	);
};

export const TooltipButton = (props: Story<BaseButtonProps<AvailableSizes>>) => (
	<Tooltip title="Relevant information about contacting the support">
		<ButtonPrimary onClick={action('I have been clicked')} icon="talend-bubbles" {...props}>
			Contact support
		</ButtonPrimary>
	</Tooltip>
);

export const Loading = {
	render: (props: Story<BaseButtonProps<AvailableSizes>>) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [loading, isLoading] = useState(false);
		return (
			<Tooltip title="Relevant description of the basic button">
				<ButtonPrimary
					icon="talend-check"
					isLoading={loading}
					onClick={() => {
						isLoading(true);
						setTimeout(() => isLoading(false), 3000);
					}}
					{...props}
				>
					Async call to action
				</ButtonPrimary>
			</Tooltip>
		);
	},
};

export const Variations = () => (
	<StackHorizontal gap="S" justify="spaceBetween" align="stretch">
		<StackVertical gap="S" justify="spaceAround" align="center">
			<p>&nbsp;</p>
			<h3>M</h3>
			<h3>S</h3>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Primary</h3>
			<ButtonPrimary icon="upload" onClick={action('Clicked')} isDropdown>
				Label
			</ButtonPrimary>
			<ButtonPrimary icon="upload" onClick={action('Clicked')} size="S" isDropdown>
				Label
			</ButtonPrimary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Destructive</h3>
			<ButtonDestructive icon="upload" onClick={action('Clicked')} isDropdown>
				Label
			</ButtonDestructive>
			<ButtonDestructive icon="upload" onClick={action('Clicked')} size="S" isDropdown>
				Label
			</ButtonDestructive>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Secondary</h3>
			<ButtonSecondary icon="upload" onClick={action('Clicked')} isDropdown>
				Label
			</ButtonSecondary>
			<ButtonSecondary icon="upload" onClick={action('Clicked')} size="S" isDropdown>
				Label
			</ButtonSecondary>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Tertiary</h3>
			<ButtonTertiary icon="upload" onClick={action('Clicked')} isDropdown>
				Label
			</ButtonTertiary>
			<ButtonTertiary icon="upload" onClick={action('Clicked')} size="S" isDropdown>
				Label
			</ButtonTertiary>
		</StackVertical>
	</StackHorizontal>
);

export const VariantComponent = () => (
	<StackHorizontal gap="S">
		<Button variant="primary" onClick={action('Clicked')}>
			Primary Button
		</Button>
		<Button variant="destructive" onClick={action('Clicked')}>
			Destructive Button
		</Button>
		<Button variant="secondary" onClick={action('Clicked')}>
			Secondary Button
		</Button>
		<Button variant="tertiary" onClick={action('Clicked')}>
			Tertiary Button
		</Button>
	</StackHorizontal>
);
