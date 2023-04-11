import { HTMLAttributes } from 'react';
import * as React from 'react';
// eslint-disable-next-line @talend/import-depth
import { Icon, icons, IconSize } from '@talend/icons/dist/typeUtils';

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
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (!icons[size].includes(name)) {
			console.error(`Icon ${name} does not exist. Check sizes other than ${size}.`);
		}
		return (
			<svg
				{...rest}
				style={{ width: numericSize, height: numericSize }}
				aria-hidden
				ref={ref}
				shapeRendering="geometricPrecision"
				pointerEvents="none"
			>
				<use xlinkHref={`#${fullName}`} />
			</svg>
		);
	},
);

SizedIcon.displayName = 'SizedIcon';

export { SizedIcon };
