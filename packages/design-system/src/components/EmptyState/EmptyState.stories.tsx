import React from 'react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter, Link } from 'react-router-dom';
import EmptyState, { EmptyStateLarge, EmptyStateMedium, EmptyStateSmall } from '.';
import { StackHorizontal } from '../Stack';
import { EmptyStateProps } from './EmptyState';

export default {
	component: EmptyStateLarge,
};

export const Large = () => (
	<EmptyStateLarge
		title="No preparations yet"
		description="Add a preparation to clean, format, and transform data prior to processing."
		callback={{
			children: 'Create a dataset',
			onClick: () => action('clicked'),
			icon: 'talend-plus',
			callbackType: 'button',
		}}
		docLink={{ href: 'https://talend.com' }}
	/>
);

export const LargeWithLinkButton = () => (
	<BrowserRouter>
		<EmptyStateLarge
			title="No preparations yet"
			description="Add a preparation to clean, format, and transform data prior to processing."
			callback={{
				children: 'Create a preparation',
				icon: 'talend-plus',
				callbackType: 'link',
				as: <Link to="/preparation/new" />,
				'data-feature': 'Preparation empty state clicked',
			}}
			docLink={{ href: 'https://talend.com' }}
		/>
	</BrowserRouter>
);

export const Medium = () => (
	<EmptyStateMedium
		title="No preparations yet"
		description="Add a preparation to clean, format, and transform data prior to processing."
		docLink={{ href: 'https://talend.com' }}
	/>
);

export const Small = () => <EmptyStateSmall title="Create a preparation first" />;

export const Demo = () => (
	<StackHorizontal gap="XS" align="center" justify="spaceBetween">
		<EmptyStateLarge
			title="This space is empty"
			description="Any additional data here"
			callback={{
				children: 'Action',
				onClick: () => action('clicked'),
				callbackType: 'button',
			}}
			docLink={{ href: 'https://talend.com' }}
		/>
		<EmptyStateMedium
			title="This space is empty"
			description="Any additional data here"
			docLink={{ href: 'https://talend.com' }}
		/>
		<EmptyStateSmall title="This space is empty" />
	</StackHorizontal>
);

export const Usage = (args: EmptyStateProps) => {
	switch (args.variant) {
		case 'L': {
			const { ...rest } = args;
			return <EmptyState {...rest} />;
		}

		case 'M': {
			const { callback, ...rest } = args;
			return <EmptyState {...rest} />;
		}

		case 'S': {
			const { variant, title } = args;
			return <EmptyState variant={variant} title={title} />;
		}

		default: {
			return <></>;
		}
	}
};

Usage.argTypes = {
	variant: {
		control: { type: 'select', options: ['L', 'M', 'S'] },
		defaultValue: 'L',
		description:
			'Used for `<EmptyState>`. Use `<EmptyStateLarge>`, `<EmptyStateMedium>` and `<EmptyStateSmall>` instead',
	},
	title: {
		control: { type: 'text' },
		defaultValue: 'Title copy',
		description: 'Mandatory across variants',
	},
	description: {
		control: { type: 'text' },
		defaultValue: 'Description copy',
		description: 'Mandatory for Large and Medium, unavailable for Small',
	},
	docLinkURL: {
		control: { type: 'object' },
		defaultValue: { href: 'https://talend.com', 'data-feature': 'Feature name' },
		description: 'Optional for Large and Medium, unavailable for Small',
	},
	callback: {
		control: { type: 'object' },
		defaultValue: {
			children: 'Action',
			onClick: () => {},
			callbackType: 'button',
			'data-feature': 'Feature name',
		},
		description: 'Optional for Large. Unavailable for Medium and Small',
	},
	illustration: {
		table: {
			disable: true,
		},
	},
};
