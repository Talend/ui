import React from 'react';
import {
	InlineMessage,
	InlineMessageInformation,
	InlineMessageDestructive,
	InlineMessageWarning,
	InlineMessageSuccess,
} from '.';
import { StackVertical, StackHorizontal } from '../Stack';
import InlineMessageBeta from './variations/InlineMessageBeta';
import { ComponentStory } from '@storybook/react';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';

export default { component: InlineMessage };

export const DefaultDemo = () => (
	<StackVertical gap={'XS'}>
		<InlineMessageInformation
			title="Lorem ipsum"
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
		<InlineMessageSuccess
			title="Lorem ipsum"
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
		<InlineMessageWarning
			title="Lorem ipsum"
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
		<InlineMessageDestructive
			title="Lorem ipsum"
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
		<InlineMessageBeta
			title="Lorem ipsum"
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
	</StackVertical>
);

export const BackgroundDemo = () => (
	<StackVertical gap={'XS'}>
		<InlineMessageInformation
			title="Lorem ipsum"
			withBackground
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
		<InlineMessageSuccess
			title="Lorem ipsum"
			withBackground
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
		<InlineMessageWarning
			title="Lorem ipsum"
			withBackground
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
		<InlineMessageDestructive
			title="Lorem ipsum"
			withBackground
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
		<InlineMessageBeta
			title="Lorem ipsum"
			withBackground
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
	</StackVertical>
);

const VariantTemplate: ComponentStory<typeof InlineMessage> = args => {
	const { variant = 'information', ...rest } = args;
	return <InlineMessage {...rest} variant={variant} />;
};
export const Variant = VariantTemplate.bind({});
Variant.args = {
	variant: 'information',
	title: 'Lorem ipsum',
	description:
		'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac.',
};

export const WithRouterLink = () => (
	<BrowserRouter>
		<InlineMessage
			withBackground
			description="Inline message with a Router Link"
			variant="information"
			link={{
				as: <RouterLink to="/documentation" />,
				children: 'See more',
			}}
		/>
	</BrowserRouter>
);
