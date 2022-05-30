import React from 'react';
import { Icon, IconSize } from '@talend/icons';

const getNumericSize = (size: IconSize) => {
	return {
		XS: 8,
		S: 12,
		M: 16,
		L: 24,
	}[size];
};

export function SizedIcon<S extends IconSize>({ name, size }: Icon<S>) {
	const numericSize = getNumericSize(size);
	const fullName = size ? `${name}:${numericSize}` : name;
	return (
		<svg style={{ width: numericSize, height: numericSize }}>
			<use xlinkHref={`#${fullName}`} />
		</svg>
	);
}
