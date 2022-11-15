import React from 'react';
import { ComponentStory } from '@storybook/react';

import {
	Skeleton,
	SkeletonButton,
	SkeletonButtonIcon,
	SkeletonHeading,
	SkeletonInput,
	SkeletonParagraph,
	StackHorizontal,
	StackVertical,
} from '@talend/design-system';

import SkeletonPrimitive from '@talend/design-system/lib/components/Skeleton/Primitive/Skeleton.Primitive';

export default {
	component: SkeletonPrimitive,
};

const SkeletonButtonTemplate: ComponentStory<typeof SkeletonButton> = args => {
	return <SkeletonButton {...args} />;
};

const SkeletonButtonIconTemplate: ComponentStory<typeof SkeletonButtonIcon> = args => {
	return <SkeletonButtonIcon {...args} />;
};

const SkeletonHeadingTemplate: ComponentStory<typeof SkeletonHeading> = args => {
	return <SkeletonHeading {...args} />;
};

const SkeletonParagraphTemplate: ComponentStory<typeof SkeletonParagraph> = args => {
	return <SkeletonParagraph {...args} />;
};

const SkeletonInputTemplate: ComponentStory<typeof SkeletonInput> = args => {
	return <SkeletonInput {...args} />;
};

export const SkeletonButtonStory = SkeletonButtonTemplate.bind({});
SkeletonButtonStory.argTypes = {
	size: {
		control: { type: 'select', options: ['M', 'S'] },
		defaultValue: 'M',
		description: 'optional (default is "M")',
	},
};

export const SkeletonButtonIconStory = SkeletonButtonIconTemplate.bind({});
SkeletonButtonIconStory.argTypes = {
	size: {
		control: { type: 'select', options: ['M', 'S', 'XS'] },
		defaultValue: 'M',
		description: 'optional (default is "M")',
	},
};
export const SkeletonHeadingStory = SkeletonHeadingTemplate.bind({});
SkeletonHeadingStory.argTypes = {
	size: {
		control: { type: 'select', options: ['L', 'M', 'S'] },
		defaultValue: 'L',
		description: 'optional (default is "L")',
	},
};

export const SkeletonParagraphStory = SkeletonParagraphTemplate.bind({});
SkeletonParagraphStory.argTypes = {
	size: {
		control: { type: 'select', options: ['M', 'S'] },
		defaultValue: 'M',
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
