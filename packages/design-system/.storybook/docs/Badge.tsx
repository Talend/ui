import React from 'react';
import tokens from '@talend/design-tokens';

import { Status } from './StatusTable';

import theme from './Badge.scss';

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
	href,
	icon,
	children,
	status,
	...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { icon: string; status?: Status }) => {
	let attrs;
	if (href) {
		attrs = {
			target: href ? '_blank' : undefined,
			rel: href ? 'noopener noreferrer' : undefined,
		};
	}
	return (
		<a className={theme.a} {...attrs} {...props}>
			<span>
				<img src={`https://unpkg.com/simple-icons/icons/${icon}.svg`} alt="" />
				{children}
			</span>
			{renderStatus(status)}
		</a>
	);
};

export default Badge;
