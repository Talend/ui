import React, { ReactElement } from 'react';
import { Icon } from './Icon';
import { SizedIcon } from './SizedIcon';
import { IconNameWithSize } from '@talend/icons';

export function parseDeprecatedIcon({
	iconSrc,
	size,
}: {
	iconSrc: string | ReactElement;
	size: 'XS' | 'S' | 'M' | 'L';
}) {
	if (typeof iconSrc === 'string') {
		if (iconSrc.includes('talend-') || iconSrc.includes('remote-') || iconSrc.includes('src-')) {
			return <Icon name={iconSrc} />;
		}
		return <SizedIcon size={size} name={iconSrc as IconNameWithSize<typeof size>} />;
	}

	return React.cloneElement(iconSrc, {});
}
