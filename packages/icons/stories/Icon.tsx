// eslint-disable-next-line import/no-extraneous-dependencies
import React, { Suspense } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import tokens from '@talend/design-tokens';

import { importIcon } from '../src';
import * as IconTypes from '../src/icon';

export function getNumericSizeByTShirtSize(tShirtSize) {
	switch (tShirtSize) {
		case 'XS':
			return 8;
		case 'S':
			return 12;
		case 'M':
			return 16;
		case 'L':
			return 24;
		default:
			return undefined;
	}
}
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
			Array.from(document.getElementsByTagName('svg')).forEach(element => {
				// eslint-disable-next-line no-param-reassign
				element.setAttribute('style', `color: ${e.currentTarget.value}`);
			});
		}}
	>
		{Object.entries(iconTokens).map(([name, value]) => (
			<option value={value}>{name}</option>
		))}
	</select>
);

const IconSkeleton = ({ size = 24 }: { size: number }) => (
	<div
		style={{
			width: size,
			height: size,
			background: tokens.coralColorNeutralBackgroundDisabled,
			opacity: tokens.coralOpacityL,
			borderRadius: tokens.coralRadiusRound,
		}}
		aria-label="Loading…"
	/>
);

const Icon = <S extends IconTypes.IconSize>({ size, name }: IconTypes.Icon<S>) => {
	const numericSize = getNumericSizeByTShirtSize(size);
	const LazyIcon = React.lazy(() => importIcon(numericSize, name) as Promise<any>);
	return (
		<div
			style={{
				width: size ? undefined : '2.4rem',
				height: size ? undefined : '2.4rem',
				color: tokens.coralColorNeutralIcon,
			}}
		>
			<Suspense fallback={<IconSkeleton size={numericSize} />}>
				<LazyIcon />
			</Suspense>
		</div>
	);
};

export default Icon;
