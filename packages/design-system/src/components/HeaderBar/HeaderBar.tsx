import React, { ReactElement } from 'react';
import useMedia from 'react-use/lib/useMedia';
import { useDisclosureState, Disclosure, DisclosureContent } from 'reakit';

import * as S from './HeaderBar.style';

import tokens from '../../tokens';

const HeaderBar = S.HeaderBar;

export type ContentProps = React.PropsWithChildren<any>;

const Content: React.FC<ContentProps> = ({ children }: ContentProps) => {
	const isWide = useMedia(`(min-width: ${tokens.breakpoints.l})`);
	const disclosure = useDisclosureState({
		animated: 250,
	});
	return isWide ? (
		children
	) : (
		<>
			<Disclosure as={S.MenuDisclosure} {...disclosure} icon="talend-burger">
				Toggle menu
			</Disclosure>
			<DisclosureContent as={S.Menu} {...disclosure}>
				{children}
			</DisclosureContent>
		</>
	);
};

const HeaderBarComponent = HeaderBar as typeof HeaderBar & {
	Logo: typeof S.Logo;
	Brand: typeof S.Brand;
	Content: typeof Content;
	ContentLeft: typeof S.ContentLeft;
	ContentRight: typeof S.ContentRight;
	Item: typeof S.Item;
};

HeaderBarComponent.Logo = S.Logo;
HeaderBarComponent.Brand = S.Brand;
HeaderBarComponent.Content = Content;
HeaderBarComponent.ContentLeft = S.ContentLeft;
HeaderBarComponent.ContentRight = S.ContentRight;
HeaderBarComponent.Item = S.Item;

export default HeaderBarComponent;
