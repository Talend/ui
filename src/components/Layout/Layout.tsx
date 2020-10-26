import React from 'react';

import SkipLinks from './SkipLinks';
import Main from './Main';

import * as S from './Layout.style';

export type LayoutProps = {
	header?: React.ReactElement;
	nav?: React.ReactElement;
	main?: React.ReactElement;
	aside?: React.ReactElement;
	footer?: React.ReactElement;
};

const Layout: React.FC<LayoutProps> = ({
	header,
	nav,
	main,
	aside,
	footer,
	...rest
}: LayoutProps) => {
	const [asideVisibility, setAsideVisibility] = React.useState(true);

	return (
		<>
			<SkipLinks nav={!!nav} main={!!main} />
			<S.Layout className="layout" {...rest}>
				{header && <S.Header className="layout__header">{header}</S.Header>}
				{nav || aside ? (
					<S.LayoutGroup className="layout__group">
						{nav}
						{aside && asideVisibility ? (
							<S.AsideOverlay
								className="layout__overlay"
								onClick={() => setAsideVisibility(() => false)}
							>
								<Main>{main}</Main>
								<S.Aside>{aside}</S.Aside>
							</S.AsideOverlay>
						) : (
							<Main>{main}</Main>
						)}
					</S.LayoutGroup>
				) : (
					<Main>{main}</Main>
				)}
				{footer && <S.Footer className="layout__footer">{footer}</S.Footer>}
			</S.Layout>
		</>
	);
};

export default Layout;
