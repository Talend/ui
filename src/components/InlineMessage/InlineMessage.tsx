import React from 'react';

import * as S from './InlineMessage.style';

export type InlineMessageProps = {
	/** The icon element to display */
	icon?: React.ReactNode;
	/** The title of the message */
	title?: string;
	/** The content of the message */
	description: string;
	/**
	 Link element at the end
	 */
	link?: React.ReactNode;
	/** If it is an inline message or a block with a background */
	withBackground?: boolean;
};

/**
 Inline message highlights information necessary to display for the user in many different contexts.
 It can be additional information related to system status, it can be a required action to complete the current task.
 @link https://inclusive-components.design/notifications
 **/
const InlineMessage: React.FC<InlineMessageProps> = React.forwardRef(
	(
		{ icon, title, description, link, withBackground = false, ...rest }: InlineMessageProps,
		ref,
	) => {
		return (
			<S.InlineMessage
				{...rest}
				withBackground={withBackground}
				role="status"
				aria-live="polite"
				ref={ref}
			>
				<S.Paragraph icon={icon} withBackground={withBackground}>
					{(icon || title) && (
						<S.Strong>
							{icon && (
								<>
									<S.IconSpan withBackground={withBackground}>{icon}</S.IconSpan>{' '}
								</>
							)}
							{title && (
								<>
									<S.TextSpan withBackground={withBackground}>{title}</S.TextSpan>{' '}
								</>
							)}
						</S.Strong>
					)}
					{description && (
						<>
							<S.TextSpan withBackground={withBackground}>{description}</S.TextSpan>{' '}
						</>
					)}
					{link && <S.TextSpan withBackground={withBackground}>{link}</S.TextSpan>}
				</S.Paragraph>
			</S.InlineMessage>
		);
	},
);

export default InlineMessage;
