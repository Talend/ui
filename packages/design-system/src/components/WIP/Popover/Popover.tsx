import { cloneElement, HTMLAttributes, ReactElement, ReactNode, RefObject } from 'react';
import classnames from 'classnames';
import tokens from '@talend/design-tokens';
import {
	Popover as ReakitPopover,
	PopoverArrow as ReakitPopoverArrow,
	PopoverDisclosure as ReakitPopoverDisclosure,
	PopoverDisclosureHTMLProps,
	PopoverProps,
	PopoverStateReturn,
	usePopoverState,
} from 'reakit';
import Clickable from '../../Clickable';
import { Placement } from '../../Tooltip/Tooltip';
import { DataAttributes } from '../../../types';

import style from './Popover.module.scss';

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
	focusOnDisclosure?: boolean;
} & DataAttributes;

function Popover({
	disclosure,
	position = 'auto',
	zIndex = tokens.coralElevationLayerStandardFront,
	isFixed = false,
	hasPadding = true,
	focusOnDisclosure = false,
	...props
}: PopoverPropsType) {
	const popover = usePopoverState({
		animated: ANIMATION_DURATION,
		placement: position,
		unstable_fixed: isFixed,
	});
	const children = Array.isArray(props.children) ? props.children : [props.children];
	const disclosureElementProps = typeof disclosure !== 'function' ? disclosure.props : {};
	const basePopoverProps: Partial<PopoverProps> = {};
	if (focusOnDisclosure) {
		basePopoverProps.unstable_initialFocusRef =
			popover.unstable_referenceRef as RefObject<HTMLElement>;
		basePopoverProps.unstable_finalFocusRef = popover.unstable_popoverRef as RefObject<HTMLElement>;
	}

	return (
		<>
			<ReakitPopoverDisclosure {...popover} {...disclosureElementProps}>
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
				{...basePopoverProps}
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
