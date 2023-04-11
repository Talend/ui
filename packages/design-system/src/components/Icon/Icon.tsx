import { PropsWithChildren } from 'react';
import * as React from 'react';
import classnames from 'classnames';
// eslint-disable-next-line @talend/import-depth
import { DeprecatedIconNames } from '../../types';
import { IconsProvider } from '../IconsProvider';
import style from './Icon.module.scss';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum SVG_TRANSFORMS {
	Spin = 'spin',
	Rotate45 = 'rotate-45',
	Rotate90 = 'rotate-90',
	Rotate135 = 'rotate-135',
	Rotate180 = 'rotate-180',
	Rotate225 = 'rotate-225',
	Rotate270 = 'rotate-270',
	Rotate315 = 'rotate-315',
	FlipHorizontal = 'flip-horizontal',
	FlipVertical = 'flip-vertical',
}

export type IconProps = PropsWithChildren<any> & {
	name: DeprecatedIconNames;
	transform: SVG_TRANSFORMS;
	preserveColor: boolean;
	border: boolean;
};

const accessibility = {
	focusable: 'false',
	'aria-hidden': 'true',
};

// eslint-disable-next-line react/display-name
export const Icon = React.forwardRef(
	(
		{ className, name = 'talend-empty-space', transform, border, ...rest }: IconProps,
		ref: React.Ref<SVGSVGElement>,
	) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const safeRef = React.createRef<SVGSVGElement>(ref);
		const [content, setContent] = React.useState<string>();

		const isRemote = name.startsWith('remote-');
		const isImg = name.startsWith('src-');
		const imgSrc = name.replace('remote-', '').replace('src-', '');
		const isRemoteSVG =
			isRemote && content && content.includes('svg') && !content.includes('script');

		React.useEffect(() => {
			if (isRemote) {
				fetch(imgSrc, {
					headers: {
						Accept: 'image/svg+xml',
					},
				})
					.then(response => {
						if (response.status === 200 && response.ok) {
							response.text().then(data => {
								setContent(data);
							});
						} else {
							console.error(
								new Error(
									`IconResponseError: status=${response.status} ok=${response.ok} url=${imgSrc}`,
								),
							);
						}
					})
					.catch(error => {
						console.error('IconResponseError', imgSrc, error);
					});
			}
		}, [imgSrc, isRemote]);

		React.useEffect(() => {
			const current = safeRef?.current;
			if (current && isRemoteSVG && content) {
				// eslint-disable-next-line no-param-reassign
				current.innerHTML = content;
			} else if (current && !isRemote) {
				IconsProvider.injectIcon(name, current);
			}
		}, [isRemoteSVG, safeRef, content, name, isRemote]);

		React.useEffect(() => {
			if (border) {
				const svgContainer = safeRef?.current;
				if (svgContainer) {
					const svg = svgContainer.querySelector('svg');
					if (svg) {
						const { x, y, width, height }: DOMRect = svg.viewBox.baseVal;
						const factor: number = height;
						const strokeWidth = 1;
						const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
						circle.setAttribute('class', 'ti-border');
						circle.setAttribute('cx', ((width + factor) / 2).toString());
						circle.setAttribute('cy', ((height + factor) / 2).toString());
						circle.setAttribute('r', Math.floor((height + factor - strokeWidth) / 2).toString());
						circle.setAttribute('stroke-width', strokeWidth.toString());
						circle.setAttribute('stroke', 'currentColor');
						svg.setAttribute('viewBox', `${x} ${y} ${width + factor} ${height + factor}`);
						svg.prepend(circle);
					}
				}
			}
		}, [border, safeRef]);

		const classname = classnames('tc-icon', style.svg, className, {
			[`tc-icon-name-${name}`]: !(isImg || isRemote),
			[style.border]: border,
			[style[transform]]: !!transform,
		});

		if (isImg) {
			return (
				<img alt="" src={name.substring(4)} className={classname} {...accessibility} {...rest} />
			);
		}

		if (isRemote && content && !isRemoteSVG) {
			return (
				<img
					alt=""
					src={name.replace('remote-', '')}
					className={className}
					{...accessibility}
					{...rest}
				/>
			);
		}

		return (
			<svg
				{...rest}
				name={!(isImg || isRemote) ? name : null}
				{...accessibility}
				className={classnames('tc-svg-icon', classname)}
				ref={safeRef}
				pointerEvents="none"
				shapeRendering="geometricPrecision"
			/>
		);
	},
);

export const IconMemo = React.memo(Icon);

IconMemo.displayName = 'Icon';
