import React from 'react';
import { Icon, IconSize, sizes } from '@talend/icons';

const getNumericSize = (size: IconSize) => {
	return sizes[size];
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
