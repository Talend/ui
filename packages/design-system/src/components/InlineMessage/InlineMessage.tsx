import React, { PropsWithChildren } from 'react';
import { StyledProps } from 'styled-components';
import { IconName } from '@talend/icons';

import { Icon } from '../Icon/Icon';

import * as S from './InlineMessage.style';
import { light } from '../../themes';

export type InlineMessageProps = PropsWithChildren<any> &
	StyledProps<any> & {
		/** The icon element to display */
		icon: IconName;
		/** The title of the message */
		title?: string;
		/** The content of the message */
		description: string;
		/** Size variant */
		small: boolean;
		/** Link element at the end */
		link?: React.ReactElement;
		/** If it is an inline message or a block with a background */
		withBackground?: boolean;
	};

/**
 Inline message highlights information necessary to display for the user in many different contexts.
 It can be additional information related to system status, it can be a required action to complete the current task.
 @link https://inclusive-components.design/notifications
 * */
const InlineMessage = React.forwardRef(
	(
		{ icon, title, description, link, small, withBackground, theme, ...rest }: InlineMessageProps,
		ref,
	) => (
		<S.InlineMessage
			role="status"
			aria-live="polite"
			{...rest}
			small={small}
			withBackground={withBackground}
			theme={withBackground ? light : theme}
			ref={ref}
		>
			{icon && (
				<S.Icon small={small}>
					<Icon name={icon} />
				</S.Icon>
			)}
			<S.Content>
				{title && (
					<>
						<S.Title>{title}</S.Title>{' '}
					</>
				)}
				<>
					<S.Description>{description}</S.Description>{' '}
				</>
				{link && (
					<S.Link>{React.cloneElement(link, { theme: withBackground ? light : theme })}</S.Link>
				)}
			</S.Content>
		</S.InlineMessage>
	),
);

export default InlineMessage;
