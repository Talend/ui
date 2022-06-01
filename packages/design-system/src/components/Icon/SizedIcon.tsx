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

const SizedIcon = React.forwardRef(
	<S extends IconSize>({ name, size }: Icon<S>, ref: React.Ref<SVGSVGElement>) => {
		const numericSize = getNumericSize(size);
		const fullName = size ? `${name}:${numericSize}` : name;
		return (
			<svg style={{ width: numericSize, height: numericSize }} aria-hidden ref={ref}>
				<use xlinkHref={`#${fullName}`} />
			</svg>
		);
	},
);

SizedIcon.displayName = 'SizedIcon';

export { SizedIcon };
