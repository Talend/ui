import React, {
	HTMLAttributes,
	ReactElement,
	ReactNode,
	cloneElement,
	isValidElement,
} from 'react';
import {
	usePopoverState,
	Popover as ReakitPopover,
	PopoverArrow as ReakitPopoverArrow,
	PopoverDisclosure as ReakitPopoverDisclosure,
	PopoverStateReturn,
} from 'reakit';
import Clickable from '../Clickable';
import { Placement } from '../Tooltip/Tooltip';
import { DataAttributes } from '../../types';

import style from './Popover.module.scss';

const ANIMATION_DURATION = 150; // Sync with @talend/design-token animations duration

export type PopoverChildren = ReactNode | ((popover: PopoverStateReturn) => ReactNode);

export type PopoverPropsType = HTMLAttributes<HTMLDivElement> & {
	disclosure: ReactElement<typeof Clickable>;
	children: PopoverChildren | PopoverChildren[];
	position?: Placement;
} & DataAttributes;

function Popover({ disclosure, position = 'auto', ...props }: PopoverPropsType) {
	const popover = usePopoverState({ animated: ANIMATION_DURATION, placement: position });
	const children = Array.isArray(props.children) ? props.children : [props.children];

	return (
		<>
			<ReakitPopoverDisclosure {...popover}>
				{disclosureProps => cloneElement(disclosure, disclosureProps)}
			</ReakitPopoverDisclosure>
			<ReakitPopover {...popover} {...props}>
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
