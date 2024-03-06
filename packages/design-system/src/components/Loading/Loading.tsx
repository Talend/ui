import { forwardRef, HTMLAttributes } from 'react';

import { IconSize } from '@talend/icons';

declare type LoadingIconSize = IconSize | 'XL' | 'XXL';
const getNumericSize = (size: LoadingIconSize) => {
	return {
		XS: '0.5rem',
		S: '0.75rem',
		M: '1rem',
		L: '1.5rem',
		XL: '2.5rem',
		XXL: '4rem',
	}[size];
};

export type LoadingProps = HTMLAttributes<SVGSVGElement> & { size?: LoadingIconSize };

export const Loading = forwardRef<SVGSVGElement, LoadingProps>((props, ref) => {
	const size = getNumericSize(props.size || 'M');
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			ref={ref}
			{...props}
			style={{ width: size, height: size, ...props.style }}
		>
			<g>
				<path
					fill="currentColor"
					d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.227A6.227 6.227 0 118 1.773a6.227 6.227 0 010 12.454z"
					opacity=".2"
				/>
				<path
					fill="currentColor"
					d="M11.11 2.611l.886-1.534A7.951 7.951 0 008 0v1.773c1.134 0 2.195.308 3.11.838z"
				>
					<animateTransform
						attributeName="transform"
						type="rotate"
						from="0 8 8"
						to="360 8 8"
						dur=".85s"
						repeatCount="indefinite"
					/>
				</path>
			</g>
		</svg>
	);
});

Loading.displayName = 'Loading';
