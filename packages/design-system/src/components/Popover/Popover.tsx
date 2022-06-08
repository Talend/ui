import React from 'react';
import {
	usePopoverState,
	Popover as ReakitPopover,
	PopoverArrow as ReakitPopoverArrow,
	PopoverDisclosure as ReakitPopoverDisclosure,
} from 'reakit';

import theme from './Popover.scss';

const ANIMATION_DURATION = 250; // Sync with @talend/design-token animations duration

export type PopoverPropsType = React.PropsWithChildren<any> & {
	disclosure: React.ReactElement;
};

function Popover({ disclosure, ...props }: PopoverPropsType) {
	const popover = usePopoverState({ animated: ANIMATION_DURATION });

	return (
		<>
			<ReakitPopoverDisclosure {...popover} ref={disclosure.ref} {...disclosure.props}>
				{disclosureProps => React.cloneElement(disclosure, disclosureProps)}
			</ReakitPopoverDisclosure>
			<ReakitPopover {...popover} {...props}>
				<div className={theme.popover__animated}>
					<ReakitPopoverArrow {...popover} className={theme.popover__arrow} />
					{props.children}
				</div>
			</ReakitPopover>
		</>
	);
}

export default Popover;
