import React from 'react';
import { Disclosure, DisclosureContent, useDisclosureState } from 'reakit';
import { ButtonComponentType } from '../Button';

import * as S from './Drawer.style';
import { ButtonProps } from '../Button/Button';

export type DrawerProps = {
	toggleButton?: React.ReactElement<ButtonProps, ButtonComponentType>;
	heading?: React.ReactNodeArray | React.ReactNode;
	footer?: React.ReactNodeArray | React.ReactNode;
	visible: boolean;
	children: React.ReactNode | React.ReactNodeArray;
};

export const Drawer = React.forwardRef(
	({ toggleButton, heading, children, footer, visible, ...props }: DrawerProps, ref) => {
		const state = useDisclosureState({ animated: true, visible });

		React.useEffect(() => {
			state.setVisible(visible);
		}, [visible]);

		return (
			<>
				{toggleButton && (
					<Disclosure {...state}>
						{disclosureProps => React.cloneElement(toggleButton, disclosureProps)}
					</Disclosure>
				)}
				{state.visible && (
					<DisclosureContent {...state} {...props} as={S.Drawer} ref={ref}>
						{heading && <S.DrawerHeading>{heading}</S.DrawerHeading>}
						<S.DrawerBody>{children}</S.DrawerBody>
						{footer && <S.DrawerFooter>{footer}</S.DrawerFooter>}
					</DisclosureContent>
				)}
			</>
		);
	},
);

export default Drawer;
