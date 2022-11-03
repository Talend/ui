import React from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentStory } from '@storybook/react';

import { MessagePrimitive } from './Primitive/MessagePrimitive';

import { StackHorizontal } from '../Stack';
import { TagBeta, TagDefault, TagDestructive, TagSuccess, TagWarning } from '../Tag';
import { MessageSuccess } from './variations/MessageSuccess';
import { MessageDestructive } from './variations/MessageDestructive';
import { MessageWarning } from './variations/MessageWarning';
import { MessageInformation } from './variations/MessageInformation';
import { MessageCollectionSuccess } from './variations/MessageCollectionSuccess';
import { MessageCollectionDestructive } from './variations/MessageCollectionDestructive';
import { MessageCollectionWarning } from './variations/MessageCollectionWarning';
import { MessageCollectionInformation } from './variations/MessageCollectionInformation';

export default { component: MessagePrimitive };

export const DefaultMessageDemo = () => (
	<StackHorizontal gap="M">
		<MessageSuccess
			title="All good"
			description="This component is well configured"
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			action={{ children: 'See', onClick: action('action clicked') }}
		>
			<StackHorizontal gap="S">
				<TagSuccess>Good</TagSuccess> <TagDefault>Default</TagDefault>
			</StackHorizontal>
		</MessageSuccess>
		<MessageDestructive
			title="Something went wrong"
			description="There is an issue with the component configuration"
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			action={{ children: 'See', onClick: action('action clicked') }}
		>
			<StackHorizontal gap="S">
				<TagDestructive>Error</TagDestructive> <TagDefault>Default</TagDefault>
			</StackHorizontal>
		</MessageDestructive>
		<MessageWarning
			title="Type incompatibilities"
			description="Maybe resolve this issue before doing anything else"
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			action={{ children: 'See', onClick: action('action clicked') }}
		>
			<StackHorizontal gap="S">
				<TagWarning>Bindings</TagWarning> <TagDefault>Default</TagDefault>
			</StackHorizontal>
		</MessageWarning>
		<MessageInformation
			title="Auto mapping"
			description="Some fields has been auto mapped"
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			action={{ children: 'Dismiss', onClick: action('action clicked') }}
		>
			<StackHorizontal gap="S">
				<TagDefault>Default</TagDefault>
			</StackHorizontal>
		</MessageInformation>
	</StackHorizontal>
);

export const WithPropVariation = () => (
	<StackHorizontal gap="M">
		<MessageSuccess
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="This component is well configured"
		>
			<TagBeta>Beta</TagBeta>
		</MessageSuccess>
		<MessageDestructive
			description="There is an issue with the component configuration"
			action={{ children: 'See', onClick: action('action clicked') }}
		/>
		<MessageWarning description="Maybe resolve this issue before doing anything else" />
		<MessageInformation title="Auto mapping" description="Some fields has been auto mapped" />
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

export const DefaultMessageCollectionDemo = () => (
	<StackHorizontal gap="M">
		<MessageCollectionSuccess
			description="Try resolving it this way or consult the documentation for more info."
			title="Success"
			action={{ children: 'See all (3)', onClick: action('action clicked') }}
			additionalActions={{
				'aria-label': 'Additional actions',
				items: [
					{ label: 'Select all', type: 'button', onClick: action('select all clicked') },
					{ label: 'Dismiss', type: 'button', onClick: action('dismiss clicked') },
					{ label: 'Delete', type: 'button', onClick: action('delete clicked') },
				],
			}}
		/>
		<MessageCollectionDestructive
			title="Error"
			description="(n) input fields have been automatically mapped to an output."
			action={{ children: 'See all (3)', onClick: action('action clicked') }}
			additionalActions={{
				'aria-label': 'Additional actions',
				items: [
					{ label: 'Select all', type: 'button', onClick: action('select all clicked') },
					{ label: 'Dismiss', type: 'button', onClick: action('dismiss clicked') },
					{ label: 'Delete', type: 'button', onClick: action('delete clicked') },
				],
			}}
		/>
		<MessageCollectionWarning
			title="Warning"
			description="Try resolving it this way or consult the documentation for more info."
			action={{ children: 'See all (3)', onClick: action('action clicked') }}
			additionalActions={{
				'aria-label': 'Additional actions',
				items: [
					{ label: 'Select all', type: 'button', onClick: action('select all clicked') },
					{ label: 'Dismiss', type: 'button', onClick: action('dismiss clicked') },
					{ label: 'Delete', type: 'button', onClick: action('delete clicked') },
				],
			}}
		/>
		<MessageCollectionInformation
			description="(n) input fields have been automatically mapped to an output."
			title="Information"
			action={{ children: 'See all (3)', onClick: action('action clicked') }}
			additionalActions={{
				'aria-label': 'Additional actions',
				items: [
					{ label: 'Select all', type: 'button', onClick: action('select all clicked') },
					{ label: 'Dismiss', type: 'button', onClick: action('dismiss clicked') },
					{ label: 'Delete', type: 'button', onClick: action('delete clicked') },
				],
			}}
		/>
	</StackHorizontal>
);

export const MessageCollectionWithPropVariation = () => (
	<StackHorizontal gap="M">
		<MessageCollectionSuccess
			action={{ children: 'See all (3)', onClick: action('action clicked') }}
			title="Success"
			description="(n) input fields have been automatically mapped to an output."
		/>
		<MessageCollectionWarning
			title="Warning"
			description="Try resolving it this way or consult the documentation for more info."
			action={{ children: 'See all (3)', onClick: action('action clicked') }}
			additionalActions={{
				'aria-label': 'Additional actions',
				items: [
					{ label: 'Select all', type: 'button', onClick: action('select all clicked') },
					{ label: 'Dismiss', type: 'button', onClick: action('dismiss clicked') },
					{ label: 'Delete', type: 'button', onClick: action('delete clicked') },
				],
			}}
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
