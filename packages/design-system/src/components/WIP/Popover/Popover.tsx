import React, { cloneElement, HTMLAttributes, ReactElement, ReactNode } from 'react';
import tokens from '@talend/design-tokens';
import {
	Popover as ReakitPopover,
	PopoverArrow as ReakitPopoverArrow,
	PopoverDisclosure as ReakitPopoverDisclosure,
	PopoverDisclosureHTMLProps,
	PopoverStateReturn,
	usePopoverState,
} from 'reakit';
import Clickable from '../../Clickable';
import { Placement } from '../../Tooltip/Tooltip';
import { DataAttributes } from '../../../types';

import style from './Popover.module.scss';
import classnames from 'classnames';

const ANIMATION_DURATION = 150; // Sync with @talend/design-token animations duration

export type PopoverChildren = ReactNode | ((popover: PopoverStateReturn) => ReactNode);
export type PopoverDisclosure =
	| ReactElement<typeof Clickable>
	| ((disclosureProps: PopoverDisclosureHTMLProps) => ReactNode);

export type PopoverPropsType = HTMLAttributes<HTMLDivElement> & {
	disclosure: PopoverDisclosure;
	children: PopoverChildren | PopoverChildren[];
	position?: Placement;
	zIndex?: string | number;
	isFixed?: boolean;
	hasPadding?: boolean;
} & DataAttributes;

function Popover({
	disclosure,
	position = 'auto',
	zIndex = tokens.coralElevationLayerStandardFront,
	isFixed = false,
	hasPadding = true,
	...props
}: PopoverPropsType) {
	const popover = usePopoverState({
		animated: ANIMATION_DURATION,
		placement: position,
		unstable_fixed: isFixed,
	});
	const children = Array.isArray(props.children) ? props.children : [props.children];

	return (
		<>
			<ReakitPopoverDisclosure {...popover}>
				{disclosureProps => {
					if (typeof disclosure === 'function') {
						return disclosure(disclosureProps);
					}
					return cloneElement(disclosure, disclosureProps);
				}}
			</ReakitPopoverDisclosure>
			<ReakitPopover
				{...popover}
				{...props}
				style={{
					zIndex,
				}}
			>
				<div
					className={classnames(style.popover__animated, {
						[style.popover__animated_withPadding]: hasPadding,
					})}
				>
					<ReakitPopoverArrow {...popover} className={style.popover__arrow} />
					{children.map((child, index) => {
						if (typeof child === 'function') {
							return <div key={`popover-child-${index}`}>{child(popover)}</div>;
						}
						return <div key={`popover-child-${index}`}>{child}</div>;
					})}
				</div>
			</ReakitPopover>
		</>
	);
}

export default Popover;
