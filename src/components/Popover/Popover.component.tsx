import React from 'react';
import {
	usePopoverState,
	Popover as BasePopover,
	PopoverDisclosure,
	PopoverArrow,
} from 'reakit';

export type PopoverProps = {
	disclosure: React.ReactElement<any>;
};

const Popover: React.FC<PopoverProps> = ({ disclosure, ...props }: PopoverProps) => {
	const popover = usePopoverState();
	return (
		<>
			<PopoverDisclosure {...popover} ref={disclosure.ref} {...disclosure.props}>
				{disclosureProps => React.cloneElement(disclosure, disclosureProps)}
			</PopoverDisclosure>
			<BasePopover {...popover} {...props}>
				<PopoverArrow {...popover} />
				{props.children}
			</BasePopover>
		</>
	);
};

export default Popover;
