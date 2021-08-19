import React, { PropsWithChildren } from 'react';

import SkipLinks from './SkipLinks';
import Main from './Main';

import * as S from './Layout.style';

export type LayoutProps = PropsWithChildren<any> & {
	header?: React.ReactElement;
	nav?: React.ReactElement;
	aside?: React.ReactElement;
	footer?: React.ReactElement;
};

const Layout: React.FC<LayoutProps> = ({
	header,
	nav,
	children,
	aside,
	footer,
	...rest
}: LayoutProps) => {
	const [asideVisibility, setAsideVisibility] = React.useState(true);

	return (
		<>
			<SkipLinks nav={!!nav} main={!!children} />
			<S.Layout className="layout" {...rest}>
				{header && <S.Header className="layout__header">{header}</S.Header>}
				{nav || aside ? (
					<S.LayoutGroup className="layout__group">
						<S.Nav>{nav}</S.Nav>
						{aside && asideVisibility ? (
							<S.AsideOverlay
								className="layout__overlay"
								onClick={() => setAsideVisibility(() => false)}
							>
								<Main>{children}</Main>
								<S.Aside>{aside}</S.Aside>
							</S.AsideOverlay>
						) : (
							<Main>{children}</Main>
						)}
					</S.LayoutGroup>
				) : (
					<Main>{children}</Main>
				)}
				{footer && <S.Footer className="layout__footer">{footer}</S.Footer>}
			</S.Layout>
		</>
	);
};

export default Layout;
