import React from 'react';

import { MessagePrimitive, SharedMessageProps } from './Primitive/MessagePrimitive';

import { StackHorizontal } from '../Stack';
import { MessageSuccess } from './variations/MessageSuccess';
import { MessageDestructive } from './variations/MessageDestructive';
import { MessageWarning } from './variations/MessageWarning';
import { MessageInformation } from './variations/MessageInformation';
import { TagBeta, TagDefault } from '../Tag';
import { action } from '@storybook/addon-actions';

export default { component: MessagePrimitive };

const defaultMessageProps: SharedMessageProps = {
	title: 'Lorem ipsum',
	link: { href: 'https://talend.com', children: 'Learn more' },
	description:
		'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac.',
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
