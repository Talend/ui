import * as React from 'react';
import tokens from '@talend/design-tokens';

const iconTokens = {
	'neutral/icon': tokens.coralColorNeutralIcon,
	'accent/icon': tokens.coralColorAccentIcon,
	'warning/icon': tokens.coralColorWarningIcon,
	'danger/icon': tokens.coralColorDangerIcon,
	'beta/icon': tokens.coralColorBetaIcon,
};

export const IconColorTokenSelect = () => (
	<select
		onChange={e => {
			Array.from(document.getElementsByTagName('use')).forEach(element => {
				// eslint-disable-next-line no-param-reassign
				element.setAttribute('style', `color: ${e.currentTarget.value}`);
			});
		}}
	>
		{Object.entries(iconTokens).map(([name, value], index) => (
			<option key={index} value={value}>
				{name}
			</option>
		))}
	</select>
);

const Icon = ({ name, size }: { name: string; size?: number }) => {
	if (!name) {
		return <svg />;
	}
	const fullName = size ? name.split(':')[0] + ':' + size : name;
	return (
		<svg>
			<use xlinkHref={'#' + fullName} />
		</svg>
	);
}

export default Icon;
