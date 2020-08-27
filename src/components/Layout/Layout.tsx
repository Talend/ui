import React from 'react';
import useMedia from 'react-use/lib/useMedia';

import Button from '../Button';
import SkipLinks from './SkipLinks';

import * as S from './Layout.style';

import tokens from '../../tokens';

export type LayoutProps = {
	header?: React.ReactElement<any>;
	nav?: React.ReactElement<any>;
	main?: React.ReactElement<any>;
	aside?: React.ReactElement<any>;
	footer?: React.ReactElement<any>;
};

const Layout: React.FC<LayoutProps> = ({
	header,
	nav,
	main,
	aside,
	footer,
	...rest
}: LayoutProps) => {
	const [isNavCollapsed, collapseNav] = React.useState(false);
	const [asideVisibility, setAsideVisibility] = React.useState(true);
	const isWide = useMedia(`(min-width: ${tokens.breakpoints.l})`);

	React.useEffect(() => {
		collapseNav(!isWide);
	}, [isWide]);

	const Main = () => (
		<S.Main id="main" className="layout__main">
			{main}
		</S.Main>
	);
	return (
		<>
			<SkipLinks nav={nav} main={main} />
			<S.Layout className="layout" {...rest}>
				{header && <S.Header className="layout__header">{header}</S.Header>}
				{nav || aside ? (
					<S.LayoutGroup className="layout__group">
						{nav && (
							<S.Nav
								isNavCollapsed={isNavCollapsed}
								id="nav"
								className="layout__nav"
								aria-label="Main Navigation"
							>
								<Button.Icon
									icon="opener"
									className={`nav__button ${isNavCollapsed ? 'nav__button--colapsed' : ''}`}
									onClick={() => collapseNav(prevState => !prevState)}
								>
									Collapse menu
								</Button.Icon>
								{nav}
							</S.Nav>
						)}
						{aside && asideVisibility ? (
							<S.AsideOverlay
								className="layout__overlay"
								onClick={() => setAsideVisibility(() => false)}
							>
								<Main />
								<S.Aside>{aside}</S.Aside>
							</S.AsideOverlay>
						) : (
							<Main />
						)}
					</S.LayoutGroup>
				) : (
					<Main />
				)}
				{footer && <S.Footer className="layout__footer">{footer}</S.Footer>}
			</S.Layout>
		</>
	);
};

export default Layout;
