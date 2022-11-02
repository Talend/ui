import React from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentStory } from '@storybook/react';

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

export const WithPropVariation = () => (
	<StackHorizontal gap="M">
		<MessageSuccess link={defaultMessageProps.link} description={defaultMessageProps.description}>
			<TagBeta>Beta</TagBeta>
		</MessageSuccess>
		<MessageDestructive
			description={defaultMessageProps.description}
			action={defaultMessageProps.action}
		/>
		<MessageWarning link={defaultMessageProps.link} description={defaultMessageProps.description} />
		<MessageInformation
			title={defaultMessageProps.title}
			description={defaultMessageProps.description}
		/>
	</StackHorizontal>
);

const MessageInformationTemplate: ComponentStory<typeof MessageInformation> = args => {
	return <MessageInformation {...args} />;
};

export const MessageInformationTemplateStory = MessageInformationTemplate.bind({});
MessageInformationTemplateStory.argTypes = {
	action: {
		control: { type: 'object' },
		defaultValue: { children: 'See', onClick: () => {} },
	},
	title: {
		control: { type: 'text' },
		defaultValue: 'Information Title',
	},
	description: {
		control: { type: 'text' },
		defaultValue: 'Maybe resolve this issue before doing anything else',
	},
	link: {
		control: { type: 'object' },
		defaultValue: { href: 'https://talend.com', children: 'Learn more' },
	},
	children: {
		control: { type: 'text' },
		defaultValue: undefined,
		description: 'optional',
	},
};

// Message Collection

const defaultMessageCollectionProps: SharedMessageCollectionProps = {
	title: 'Lorem ipsum',
	description: 'Try resolving it this way or consult the documentation for more info.',
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

export const MessageCollectionWithPropVariation = () => (
	<StackHorizontal gap="M">
		<MessageCollectionSuccess
			action={defaultMessageCollectionProps.action}
			title="Success"
			description={defaultMessageCollectionProps.description}
		/>
		<MessageCollectionWarning
			title="Warning"
			description={defaultMessageCollectionProps.description}
			action={defaultMessageCollectionProps.action}
			additionalActions={defaultMessageCollectionProps.additionalActions}
		/>
	</StackHorizontal>
);

const MessageCollectionInformationTemplate: ComponentStory<
	typeof MessageCollectionInformation
> = args => {
	return <MessageCollectionInformation {...args} />;
};

export const MessageCollectionInformationTemplateStory = MessageCollectionInformationTemplate.bind(
	{},
);
MessageCollectionInformationTemplateStory.argTypes = {
	action: {
		control: { type: 'object' },
		defaultValue: { children: 'See', onClick: () => {} },
	},
	title: {
		control: { type: 'text' },
		defaultValue: 'Information Title',
	},
	description: {
		control: { type: 'text' },
		defaultValue: 'Maybe resolve this issue before doing anything else',
	},
	additionalActions: {
		control: { type: 'object' },
		defaultValue: {
			'aria-label': 'Additional actions',
			items: [
				{ label: 'Select all', type: 'button', onClick: action('select all clicked') },
				{ label: 'Dismiss', type: 'button', onClick: action('dismiss clicked') },
				{ label: 'Delete', type: 'button', onClick: action('delete clicked') },
			],
		},
	},
};
