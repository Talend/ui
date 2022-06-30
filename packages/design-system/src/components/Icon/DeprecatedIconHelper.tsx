import React, { ReactElement } from 'react';
import { IconNameWithSize } from '@talend/icons';
import { DataAttributes } from '../../types';
import { Icon } from './Icon';
import { SizedIcon } from './SizedIcon';

export function parseDeprecatedIcon({
	iconSrc,
	size,
	...rest
}: {
	iconSrc: string | ReactElement;
	size: 'XS' | 'S' | 'M' | 'L';
} & DataAttributes) {
	if (typeof iconSrc === 'string') {
		if (iconSrc.includes('talend-') || iconSrc.includes('remote-') || iconSrc.includes('src-')) {
			return <Icon name={iconSrc} {...rest} />;
		}
		return <SizedIcon size={size} name={iconSrc as IconNameWithSize<typeof size>} {...rest} />;
	}

	return React.cloneElement(iconSrc, {});
}
