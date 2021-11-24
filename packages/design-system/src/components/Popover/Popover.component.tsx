import React from 'react';
import { usePopoverState } from 'reakit';

import * as S from './Popover.style';

export type PopoverProps = React.PropsWithChildren<any> & {
	disclosure: React.ReactElement;
};

const Popover = ({ disclosure, ...props }: PopoverProps) => {
	const popover = usePopoverState({ animated: 250 });
	return (
		<>
			<S.PopoverDisclosure {...popover} ref={disclosure.ref} {...disclosure.props}>
				{disclosureProps => React.cloneElement(disclosure, disclosureProps)}
			</S.PopoverDisclosure>
			<S.Popover {...popover} {...props}>
				<S.AnimatedPopover>{props.children}</S.AnimatedPopover>
			</S.Popover>
		</>
	);
};

export default Popover;
