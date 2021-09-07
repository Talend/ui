import React from 'react';
import { DisclosureProps, Disclosure, DisclosureContent, useDisclosureState } from 'reakit';
import { ButtonProps } from '../Button/Button';

import * as S from './Drawer.style';

export type DrawerProps = DisclosureProps & {
	disclosure: ButtonProps;
	heading?: React.ComponentPropsWithRef<any>;
	footer?: React.ComponentPropsWithRef<any>;
	visible: boolean;
};

export const Drawer = React.forwardRef<React.ReactElement, React.PropsWithChildren<any>>(
	({ disclosure, heading, children, footer, visible, ...props }: DrawerProps, ref) => {
		const state = useDisclosureState({ animated: true, visible });

		React.useEffect(() => {
			state.setVisible(visible);
		}, [visible]);

		return (
			<>
				{disclosure && (
					<Disclosure {...state} {...disclosure.props}>
						{disclosureProps => React.cloneElement(disclosure, disclosureProps)}
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
