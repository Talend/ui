import React, { ReactElement, ReactNode } from 'react';
import {
	usePopoverState,
	Popover as ReakitPopover,
	PopoverArrow as ReakitPopoverArrow,
	PopoverDisclosure as ReakitPopoverDisclosure,
} from 'reakit';
import Clickable from '../Clickable';

import style from './Popover.module.scss';

const ANIMATION_DURATION = 150; // Sync with @talend/design-token animations duration

export type PopoverPropsType = {
	disclosure: ReactElement<typeof Clickable>;
	children: ReactNode | ReactNode[];
};

function Popover({ disclosure, ...props }: PopoverPropsType) {
	const popover = usePopoverState({ animated: ANIMATION_DURATION });

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
