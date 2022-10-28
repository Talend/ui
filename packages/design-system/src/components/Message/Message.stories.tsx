import React from 'react';

import { MessagePrimitive } from './Primitive/MessagePrimitive';

import { StackVertical } from '../Stack';
import { MessageSuccess } from './variations/MessageSuccess';
import { MessageDestructive } from './variations/MessageDestructive';
import { MessageWarning } from './variations/MessageWarning';
import { MessageInformation } from './variations/MessageInformation';

export default { component: MessagePrimitive };

export const DefaultDemo = () => (
	<StackVertical gap="M">
		<MessageSuccess
			icon="file-code"
			title="Lorem ipsum"
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
		<MessageDestructive
			title="Lorem ipsum"
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
		<MessageWarning
			title="Lorem ipsum"
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
		<MessageInformation
			title="Lorem ipsum"
			link={{ href: 'https://talend.com', children: 'Learn more' }}
			description="dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim tposuere ac."
		/>
	</StackVertical>
);
