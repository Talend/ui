import React from 'react';

import Icon, { IconName } from '../Icon/Icon';

import * as S from './InlineMessage.style';

export type InlineMessageProps = {
	/** The icon element to display */
	icon: IconName;
	/** The title of the message */
	title?: string;
	/** The content of the message */
	description: string;
	/** Size variant */
	small: boolean;
	/** Link element at the end */
	link?: React.ReactNode;
	/** If it is an inline message or a block with a background */
	withBackground?: boolean;

	className?: string;
};

/**
 Inline message highlights information necessary to display for the user in many different contexts.
 It can be additional information related to system status, it can be a required action to complete the current task.
 @link https://inclusive-components.design/notifications
 **/
const InlineMessage: React.FC<InlineMessageProps> = React.forwardRef(
	(
		{
			icon,
			title,
			description,
			link,
			small = false,
			withBackground = false,
			className = '',
			...rest
		}: InlineMessageProps,
		ref,
	) => {
		return (
			<S.InlineMessage
				{...rest}
				className={`${className} inline-message`}
				small={small}
				withBackground={withBackground}
				role="status"
				aria-live="polite"
				ref={ref}
			>
				<p>
					{(icon || title) && (
						<>
							<span className="inline-message__icon">
								<Icon name={icon} />
							</span>
							{title && (
								<>
									<span className="inline-message__title">{title}</span>{' '}
								</>
							)}
						</>
					)}
					{description && (
						<>
							<span className="inline-message__description">{description}</span>{' '}
						</>
					)}
					{link && <span className="inline-message__link">{link}</span>}
				</p>
			</S.InlineMessage>
		);
	},
);

export default InlineMessage;
