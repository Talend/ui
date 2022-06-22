import React, { HTMLAttributes } from 'react';
// eslint-disable-next-line @talend/import-depth
import { Icon, IconSize } from '@talend/icons/dist/Figma';

const getNumericSize = (size: IconSize) => {
	return {
		XS: '0.8rem',
		S: '1.2rem',
		M: '1.6rem',
		L: '2.4rem',
	}[size];
};

const SizedIcon = React.forwardRef(
	<S extends IconSize>(
		{ className, style, name, size, ...rest }: HTMLAttributes<SVGSVGElement> & Icon<S>,
		ref: React.Ref<SVGSVGElement>,
	) => {
		const numericSize = getNumericSize(size);
		const fullName = size ? `${name}:${size}` : name;
		return (
			<svg {...rest} style={{ width: numericSize, height: numericSize }} aria-hidden ref={ref}>
				<use xlinkHref={`#${fullName}`} />
			</svg>
		);
	},
);

SizedIcon.displayName = 'SizedIcon';

export { SizedIcon };
