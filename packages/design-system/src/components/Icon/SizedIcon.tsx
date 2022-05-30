import React from 'react';
import { Icon, IconSize } from '@talend/icons';

const getNumericSize = (size: string) => {
	switch (size) {
		case 'XS':
			return 8;
		case 'S':
			return 12;
		case 'M':
			return 16;
		case 'L':
			return 24;
		default:
			return '';
	}
};

export function SizedIcon<S extends IconSize>({ name, size }: Icon<S>) {
	const numericSize = getNumericSize(size);
	const fullName = size ? name + ':' + numericSize : name;
	return (
		<svg style={{ width: numericSize, height: numericSize }}>
			<use xlinkHref={`#${fullName}`} />
		</svg>
	);
}
