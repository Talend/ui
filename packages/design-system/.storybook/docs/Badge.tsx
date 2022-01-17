import React from 'react';
import styled from 'styled-components';
import tokens from '@talend/design-tokens';

import { Status } from './StatusTable';

const A = styled.a.attrs(({ href }) => ({
	target: href ? '_blank' : undefined,
	rel: href ? 'noopener noreferrer' : undefined,
}))`
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	font: ${tokens.coralParagraphSBold};

	&,
	&:hover,
	&:focus,
	&:active {
		text-decoration: none;
	}

	&:not([href]) {
		span:first-child {
			background-color: ${tokens.coralColorNeutralBackgroundDisabled};
		}
	}

	&[href] {
		cursor: pointer;
	}

	span {
		padding: 0 ${tokens.coralSizeXxs};
		border: ${tokens.coralBorderSSolid} ${tokens.coralColorAssistiveBorder};

		&:first-child {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			gap: 1ch;
			color: ${tokens.coralColorNeutralText};
			background: ${tokens.coralColorNeutralBackground};
			border-right: none;
			border-radius: ${tokens.coralRadiusS} 0 0 ${tokens.coralRadiusS};
		}

		&:last-child {
			border-left: none;
			border-radius: 0 ${tokens.coralRadiusS} ${tokens.coralRadiusS} 0;
			text-transform: uppercase;
		}
	}

	img {
		height: ${tokens.coralSizeS};
		width: ${tokens.coralSizeS};
	}
`;

export const renderStatus = (status?: Status) => {
	switch (status) {
		case Status.OK:
			return (
				<span
					style={{
						color: tokens.coralColorSuccessTextWeak,
						background: tokens.coralColorSuccessBackgroundStrong,
					}}
				>
					{status}
				</span>
			);
		case Status.WIP:
			return (
				<span
					style={{
						color: tokens.coralColorBetaTextWeak,
						background: tokens.coralColorBetaBackgroundStrong,
					}}
				>
					{status}
				</span>
			);
		case Status.KO:
			return (
				<span
					style={{
						color: tokens.coralColorDangerTextWeak,
						background: tokens.coralColorDangerBackgroundStrong,
					}}
				>
					{status}
				</span>
			);
		default:
			return (
				<span
					style={{
						color: tokens.coralColorNeutralTextWeak,
						background: tokens.coralColorNeutralBackgroundStrong,
					}}
				>
					N/A
				</span>
			);
	}
};

const Badge = ({
	icon,
	children,
	status,
	...props
}: React.HTMLAttributes<HTMLAnchorElement> & { icon: string; status?: Status }) => {
	return (
		<A {...props}>
			<span>
				<img src={`https://unpkg.com/simple-icons/icons/${icon}.svg`} alt="" />
				{children}
			</span>
			{renderStatus(status)}
		</A>
	);
};

export default Badge;
