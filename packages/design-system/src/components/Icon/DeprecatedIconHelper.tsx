import React, { ReactElement } from 'react';
import { Icon } from './Icon';
import { SizedIcon } from './SizedIcon';
import { IconNameWithSize } from '@talend/icons';

export function parsedIcon({
	iconSrc,
	size,
}: {
	iconSrc: string | ReactElement;
	size: 'XS' | 'S' | 'M';
}) {
	if (typeof iconSrc === 'string') {
		if (iconSrc.includes('talend-') || iconSrc.includes('remote-') || iconSrc.includes('src-')) {
			return <Icon name={iconSrc} />;
		}
		return (
			<SizedIcon
				size={size === 'XS' ? 'S' : 'M'}
				name={
					size === 'M' ? (iconSrc as IconNameWithSize<'M'>) : (iconSrc as IconNameWithSize<'S'>)
				}
			/>
		);
	}

	return React.cloneElement(iconSrc, {});
}
