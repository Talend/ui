import { StoryFn } from '@storybook/react';
import { BrowserRouter, Link } from 'react-router-dom';

import {
	ButtonAsLink,
	ButtonDestructiveAsLink,
	ButtonPrimaryAsLink,
	ButtonSecondaryAsLink,
	ButtonTertiaryAsLink,
	StackHorizontal,
	StackVertical,
	Tooltip,
} from '../../';

const defaultArgs = {
	children: 'Link label',
	href: './',
	target: '_blank',
	icon: 'talend-plus',
	size: 'M',
};

const commonLinkArgTypes = {
	children: {
		control: { type: 'text' },
	},
	href: {
		control: { type: 'text' },
	},
	target: {
		options: ['_blank', '_self', '_parent', '_top'],
		control: { type: 'select' },
		description: 'optional',
	},
	icon: {
		control: { type: 'text' },
		description: 'optional',
	},
	size: {
		options: ['M', 'S'],
		control: { type: 'select' },
		description: 'optional (default is "M")',
	},
};

export default {
	component: ButtonPrimaryAsLink,
	title: 'Clickable/ButtonAsLink',
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
	},
	args: defaultArgs,
	argTypes: commonLinkArgTypes,
};

const PrimaryLinkTemplate: StoryFn<typeof ButtonPrimaryAsLink> = args => {
	return <ButtonPrimaryAsLink {...args} />;
};

const SecondaryLinkTemplate: StoryFn<typeof ButtonSecondaryAsLink> = args => {
	return <ButtonSecondaryAsLink {...args} />;
};

const TertiaryLinkTemplate: StoryFn<typeof ButtonTertiaryAsLink> = args => {
	return <ButtonTertiaryAsLink {...args} />;
};

const DestructiveLinkTemplate: StoryFn<typeof ButtonDestructiveAsLink> = args => {
	return <ButtonDestructiveAsLink {...args} />;
};

export const PrimaryAsLink = PrimaryLinkTemplate.bind({});

Object.assign(PrimaryAsLink, {
	args: defaultArgs,
	argTypes: commonLinkArgTypes,
});

export const DestructiveAsLink = DestructiveLinkTemplate.bind({});
Object.assign(DestructiveAsLink, {
	args: defaultArgs,
	argTypes: commonLinkArgTypes,
});

export const SecondaryAsLink = SecondaryLinkTemplate.bind({});
Object.assign(SecondaryAsLink, {
	args: defaultArgs,
	argTypes: commonLinkArgTypes,
});

export const TertiaryAsLink = TertiaryLinkTemplate.bind({});
Object.assign(TertiaryAsLink, {
	args: defaultArgs,
	argTypes: commonLinkArgTypes,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TooltipButton = (props: any) => (
	<Tooltip title="Relevant information about contacting the support">
		<ButtonPrimaryAsLink href="/support" target="_blank" icon="talend-bubbles" {...props}>
			Contact support
		</ButtonPrimaryAsLink>
	</Tooltip>
);

export const VariantComponent = () => (
	<StackHorizontal gap="S">
		<ButtonAsLink variant="primary" href="https://talend.com">
			Primary Button as link
		</ButtonAsLink>
		<ButtonAsLink variant="destructive" href="https://talend.com">
			Destructive Button as link
		</ButtonAsLink>
		<ButtonAsLink variant="secondary" href="https://talend.com">
			Secondary Button as link
		</ButtonAsLink>
		<ButtonAsLink variant="tertiary" href="https://talend.com">
			Tertiary Button as link
		</ButtonAsLink>
	</StackHorizontal>
);

export const ButtonAsRouterLink = () => (
	<BrowserRouter>
		<ButtonSecondaryAsLink as={<Link to="home" />}>Home</ButtonSecondaryAsLink>
	</BrowserRouter>
);

export const ButtonAsRouterLinkVariant = () => (
	<BrowserRouter>
		<ButtonAsLink variant="destructive" icon="talend-plus-circle" as={<Link to="home" />}>
			Home
		</ButtonAsLink>
	</BrowserRouter>
);

export const Variations = () => (
	<StackHorizontal gap="S" justify="spaceBetween" align="stretch">
		<StackVertical gap="S" justify="spaceAround" align="center">
			<p>&nbsp;</p>
			<h3>M</h3>
			<h3>S</h3>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Primary</h3>
			<ButtonPrimaryAsLink icon="upload" href="/">
				Label
			</ButtonPrimaryAsLink>
			<ButtonPrimaryAsLink icon="upload" href="/" size="S">
				Label
			</ButtonPrimaryAsLink>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Destructive</h3>
			<ButtonDestructiveAsLink icon="upload" href="/">
				Label
			</ButtonDestructiveAsLink>
			<ButtonDestructiveAsLink icon="upload" href="/" size="S">
				Label
			</ButtonDestructiveAsLink>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Secondary</h3>
			<ButtonSecondaryAsLink icon="upload" href="/">
				Label
			</ButtonSecondaryAsLink>
			<ButtonSecondaryAsLink icon="upload" href="/" size="S">
				Label
			</ButtonSecondaryAsLink>
		</StackVertical>
		<StackVertical gap="S" justify="start" align="center">
			<h3>Tertiary</h3>
			<ButtonTertiaryAsLink icon="upload" href="/">
				Label
			</ButtonTertiaryAsLink>
			<ButtonTertiaryAsLink icon="upload" href="/" size="S">
				Label
			</ButtonTertiaryAsLink>
		</StackVertical>
	</StackHorizontal>
);
