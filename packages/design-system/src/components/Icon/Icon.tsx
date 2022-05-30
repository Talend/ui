import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { IconName } from '@talend/icons';

import tokens from '../../tokens';
import { IconsProvider } from '../IconsProvider';

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
	name: IconName;
	transform: SVG_TRANSFORMS;
	preserveColor: boolean;
	border: boolean;
};

const SVG = styled.svg<IconProps>`
	fill: currentColor;
	width: ${tokens.sizes.l};
	height: ${tokens.sizes.l};
	transform-origin: center;

	circle,
	path,
	polygon,
	polyline {
		${({ border }) => border && 'transform: translate(25%, 25%);'};
	}

	.ti-border {
		${({ border }) => border && 'stroke: currentColor; fill: none; transform: none'};
	}

	&.spin {
		animation-name: svg-spin;
		animation-duration: 2s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
	&.rotate-45 {
		transform: rotate(45deg);
	}
	&.rotate-90 {
		transform: rotate(90deg);
	}
	&.rotate-180 {
		transform: rotate(180deg);
	}
	&.rotate-270 {
		transform: rotate(270deg);
	}
	&.flip-vertical {
		transform: scaleY(-1);
	}
	&.flip-horizontal {
		transform: scaleX(-1);
	}
	@keyframes svg-spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
`;

const accessibility = {
	focusable: 'false',
	'aria-hidden': 'true',
};

export const Icon = React.forwardRef(
	(
		{ className, name = 'talend-empty-space', transform, border, ...rest }: IconProps,
		ref: React.Ref<SVGSVGElement>,
	) => {
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
						const strokeWidth: number = 1;
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

		const classname = classnames('tc-icon', className, transform, {
			[`tc-icon-name-${name}`]: !(isImg || isRemote),
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
			<SVG
				{...rest}
				name={!(isImg || isRemote) ? name : null}
				{...accessibility}
				className={classnames('tc-svg-icon', classname)}
				border={border}
				ref={safeRef}
			/>
		);
	},
);

export const IconMemo = React.memo(Icon);

IconMemo.displayName = 'Icon';
