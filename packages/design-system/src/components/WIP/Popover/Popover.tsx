import React, { HTMLAttributes, ReactElement, ReactNode, cloneElement } from 'react';
import classnames from 'classnames';
import tokens from '@talend/design-tokens';
import {
	usePopoverState,
	Popover as ReakitPopover,
	PopoverArrow as ReakitPopoverArrow,
	PopoverDisclosure as ReakitPopoverDisclosure,
	PopoverStateReturn,
} from 'reakit';
import Clickable from '../../Clickable';
import { Placement } from '../../Tooltip/Tooltip';
import { DataAttributes } from '../../../types';

import style from './Popover.module.scss';
import styles from '../FormPrimitives/InputWrapper/InputWrapper.module.scss';

const ANIMATION_DURATION = 150; // Sync with @talend/design-token animations duration

export type PopoverChildren = ReactNode | ((popover: PopoverStateReturn) => ReactNode);

export type PopoverPropsType = HTMLAttributes<HTMLDivElement> & {
	disclosure: ReactElement<typeof Clickable>;
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
				{disclosureProps => cloneElement(disclosure, disclosureProps)}
			</ReakitPopoverDisclosure>
			<ReakitPopover
				{...popover}
				{...props}
				style={{
					zIndex,
					padding: hasPadding ? tokens.coralSpacingM : 0,
				}}
			>
				<div className={style.popover__animated}>
					<ReakitPopoverArrow {...popover} className={style.popover__arrow} />
					{children.map(child => {
						if (typeof child === 'function') {
							return child(popover);
						}
						return child;
					})}
				</div>
			</ReakitPopover>
		</>
	);
}

export default Popover;
