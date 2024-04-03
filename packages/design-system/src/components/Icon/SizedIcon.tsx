import { forwardRef } from 'react';
import type { HTMLAttributes, Ref } from 'react';

// eslint-disable-next-line @talend/import-depth
import { Icon, icons, IconSize } from '@talend/icons/dist/typeUtils';

const getNumericSize = (size: IconSize) => {
	return {
		XS: '0.5rem',
		S: '0.75rem',
		M: '1rem',
		L: '1.5rem',
	}[size];
};

const SizedIcon = forwardRef(
	<S extends IconSize>(
		{ className, style, name, size, ...rest }: HTMLAttributes<SVGSVGElement> & Icon<S>,
		ref: Ref<SVGSVGElement>,
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
