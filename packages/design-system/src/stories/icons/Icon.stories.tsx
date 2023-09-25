import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { IconGallery, IconItem } from '@storybook/blocks';

import { StackHorizontal, Icon } from '../../';
import { AllIconsTemplate } from './Icons';

export default {
	title: 'Icons/Icon',
};

type UsageProps = {
	name: string;
};

export const Usage = (args: UsageProps) => (
	<StackHorizontal gap="XS">
		<Icon name={args.name} style={{ width: '1.2rem', height: '1.2rem' }} />
		<Icon name={args.name} />
		<Icon name={args.name} style={{ width: '2.4rem', height: '2.4rem' }} />
	</StackHorizontal>
);

Usage.args = {
	name: 'talend-cross',
};
Usage.argTypes = {
	name: {
		control: 'string',
	},
};

export const AllIcons = () => (
	<AllIconsTemplate>
		{({ name, size, transform, border, filter, useCurrentColor }) => (
			<Icon
				name={name}
				size={size}
				transform={transform}
				border={border}
				filter={filter}
				useCurrentColor={useCurrentColor}
			/>
		)}
	</AllIconsTemplate>
);
