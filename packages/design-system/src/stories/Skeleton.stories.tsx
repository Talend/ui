import { StoryFn } from '@storybook/react';

import {
	Skeleton,
	SkeletonButton,
	SkeletonButtonIcon,
	SkeletonHeading,
	SkeletonInput,
	SkeletonParagraph,
	StackHorizontal,
	StackVertical,
} from '../';

import SkeletonPrimitive from '../components/Skeleton/Primitive/Skeleton.Primitive';

export default {
	title: 'Feedback/Skeleton',
	component: SkeletonPrimitive,
};

const SkeletonButtonTemplate: StoryFn<typeof SkeletonButton> = args => {
	return <SkeletonButton {...args} />;
};

const SkeletonButtonIconTemplate: StoryFn<typeof SkeletonButtonIcon> = args => {
	return <SkeletonButtonIcon {...args} />;
};

const SkeletonHeadingTemplate: StoryFn<typeof SkeletonHeading> = args => {
	return <SkeletonHeading {...args} />;
};

const SkeletonParagraphTemplate: StoryFn<typeof SkeletonParagraph> = args => {
	return <SkeletonParagraph {...args} />;
};

const SkeletonInputTemplate: StoryFn<typeof SkeletonInput> = args => {
	return <SkeletonInput {...args} />;
};

export const SkeletonButtonStory = SkeletonButtonTemplate.bind({});
SkeletonButtonStory.args = {
	size: 'M',
};
SkeletonButtonStory.argTypes = {
	size: {
		options: ['M', 'S'],
		control: { type: 'select' },
		description: 'optional (default is "M")',
	},
};

export const SkeletonButtonIconStory = SkeletonButtonIconTemplate.bind({});
SkeletonButtonIconStory.args = {
	size: 'M',
};
SkeletonButtonIconStory.argTypes = {
	size: {
		options: ['M', 'S', 'XS'],
		control: { type: 'select' },
		description: 'optional (default is "M")',
	},
};
export const SkeletonHeadingStory = SkeletonHeadingTemplate.bind({});
SkeletonHeadingStory.args = {
	size: 'L',
};
SkeletonHeadingStory.argTypes = {
	size: {
		options: ['L', 'M', 'S'],
		control: { type: 'select' },
		description: 'optional (default is "L")',
	},
};

export const SkeletonParagraphStory = SkeletonParagraphTemplate.bind({});
SkeletonParagraphStory.args = {
	size: 'M',
};
SkeletonParagraphStory.argTypes = {
	size: {
		options: ['M', 'S'],
		control: { type: 'select' },
		description: 'optional (default is "M")',
	},
};

export const SkeletonInputStory = SkeletonInputTemplate.bind({});

export const SkeletonButtons = () => (
	<StackHorizontal gap="XS" align="center">
		<SkeletonButton />
		<SkeletonButton size="S" />
	</StackHorizontal>
);

export const SkeletonButtonIcons = () => (
	<StackHorizontal gap="XS" align="center">
		<SkeletonButtonIcon />
		<SkeletonButtonIcon size="S" />
		<SkeletonButtonIcon size="XS" />
	</StackHorizontal>
);

export const ButtonVariants = () => (
	<StackVertical gap="XS" align="stretch">
		<Skeleton variant="heading" />
		<Skeleton variant="paragraph" />
		<StackVertical gap="XS" padding={{ y: 'XS', x: 0 }}>
			<Skeleton variant="heading" size="M" />
			<Skeleton variant="paragraph" />
			<Skeleton variant="paragraph" />
			<Skeleton variant="button" />
		</StackVertical>
	</StackVertical>
);

export const CompositionExample = () => (
	<StackVertical gap="XS" align="stretch">
		<SkeletonHeading />
		<StackVertical gap="XXS">
			<SkeletonParagraph />
			<SkeletonParagraph />
			<SkeletonParagraph />
		</StackVertical>
		<StackHorizontal gap="XS" justify="end">
			<div style={{ width: '50%' }} />
			<StackHorizontal gap="XS" align="center">
				<SkeletonParagraph size="S" />
				<SkeletonButton />
			</StackHorizontal>
		</StackHorizontal>
	</StackVertical>
);
