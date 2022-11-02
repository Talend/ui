import React from 'react';
import { action } from '@storybook/addon-actions';

import {
	MessagePrimitive,
	SharedMessageCollectionProps,
	SharedMessageProps,
} from './Primitive/MessagePrimitive';

import { StackHorizontal } from '../Stack';
import { TagBeta, TagDefault } from '../Tag';
import { MessageSuccess } from './variations/MessageSuccess';
import { MessageDestructive } from './variations/MessageDestructive';
import { MessageWarning } from './variations/MessageWarning';
import { MessageInformation } from './variations/MessageInformation';
import { MessageCollectionSuccess } from './variations/MessageCollectionSuccess';
import { MessageCollectionDestructive } from './variations/MessageCollectionDestructive';
import { MessageCollectionWarning } from './variations/MessageCollectionWarning';
import { MessageCollectionInformation } from './variations/MessageCollectionInformation';

export default { component: MessagePrimitive };

const defaultMessageCollectionProps: SharedMessageCollectionProps = {
	title: 'Lorem ipsum',
	description:
		'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac.',
	action: { children: 'See all (3)', onClick: action('action clicked') },
	additionalActions: {
		'aria-label': 'Additional actions',
		items: [
			{ label: 'Select all', type: 'button', onClick: action('select all clicked') },
			{ label: 'Dismiss', type: 'button', onClick: action('dismiss clicked') },
			{ label: 'Delete', type: 'button', onClick: action('delete clicked') },
		],
	},
};

const defaultMessageProps: SharedMessageProps = {
	title: 'Type incompatibilities',
	link: { href: 'https://talend.com', children: 'Learn more' },
	description: 'Maybe resolve this issue before doing anything else',
	action: { children: 'Action', onClick: action('action clicked') },
	children: (
		<StackHorizontal gap="S">
			<TagBeta>Beta</TagBeta> <TagDefault>Default</TagDefault>
		</StackHorizontal>
	),
};

export const DefaultMessageDemo = () => (
	<StackHorizontal gap="M">
		<MessageSuccess {...defaultMessageProps} />
		<MessageDestructive {...defaultMessageProps} />
		<MessageWarning {...defaultMessageProps} />
		<MessageInformation {...defaultMessageProps} />
	</StackHorizontal>
);

export const DefaultMessageCollectionDemo = () => (
	<StackHorizontal gap="M">
		<MessageCollectionSuccess
			{...defaultMessageCollectionProps}
			description="Try resolving it this way or consult the documentation for more info."
			title="Success"
		/>
		<MessageCollectionDestructive
			{...defaultMessageCollectionProps}
			title="Error"
			description="(n) input fields have been automatically mapped to an output."
		/>
		<MessageCollectionWarning
			{...defaultMessageCollectionProps}
			title="Warning"
			description="Try resolving it this way or consult the documentation for more info."
		/>
		<MessageCollectionInformation
			{...defaultMessageCollectionProps}
			description="(n) input fields have been automatically mapped to an output."
			title="Information"
		/>
	</StackHorizontal>
);

export const WithPropVariation = () => (
	<StackHorizontal gap="M">
		<MessageSuccess
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		>
			<TagBeta>Beta</TagBeta>
		</MessageSuccess>
		<MessageDestructive description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac." />
		<MessageWarning
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
		<MessageInformation
			title="Lorem ipsum"
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
	</StackHorizontal>
);
