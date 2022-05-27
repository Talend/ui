import { Icon, IconSize } from '@talend/icons';
import React from 'react';

export function SizedIcon<S extends IconSize>({ name, size }: Icon<S>) {
	const numericSize = size === 'L' ? 16 : 24;
	const fullName = size ? name + ':' + numericSize : name;

	return (
		<svg style={{ width: numericSize, height: numericSize }}>
			<use xlinkHref={`#${fullName}`} />
		</svg>
	);
}
