import React, { HTMLAttributes, ReactElement, ReactNode } from 'react';
import {
	usePopoverState,
	Popover as ReakitPopover,
	PopoverArrow as ReakitPopoverArrow,
	PopoverDisclosure as ReakitPopoverDisclosure,
} from 'reakit';
import Clickable from '../Clickable';
import { Placement } from '../Tooltip/Tooltip';
import { DataAttributes } from '../../types';

import style from './Popover.module.scss';

const ANIMATION_DURATION = 150; // Sync with @talend/design-token animations duration

export type PopoverPropsType = HTMLAttributes<HTMLDivElement> & {
	disclosure: ReactElement<typeof Clickable>;
	children: ReactNode | ReactNode[];
	position?: Placement;
} & DataAttributes;

function Popover({ disclosure, position = 'auto', ...props }: PopoverPropsType) {
	const popover = usePopoverState({ animated: ANIMATION_DURATION, placement: position });

	return (
		<>
			<ReakitPopoverDisclosure {...popover}>
				{disclosureProps => React.cloneElement(disclosure, disclosureProps)}
			</ReakitPopoverDisclosure>
			<ReakitPopover {...popover} {...props}>
				<div className={style.popover__animated}>
					<ReakitPopoverArrow {...popover} className={style.popover__arrow} />
					{props.children}
				</div>
			</ReakitPopover>
		</>
	);
}

export default Popover;
