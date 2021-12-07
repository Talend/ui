import React from 'react';
import useMedia from 'react-use/lib/useMedia';

import * as S from './Menu.style';

import tokens from '../../tokens';

export type MenuProps = React.PropsWithChildren<any> & {
	/**
	 * If we want to display a button to collapse the menu
	 */
	hasToggle: boolean;
};

const Menu = React.forwardRef<React.ReactElement, MenuProps>(
	({ children, hasToggle = true, ...rest }, ref) => {
		const [isCollapsed, collapse] = React.useState(false);

		const isWide = useMedia(`(min-width: ${tokens.breakpoints.l})`);

		React.useEffect(() => {
			if (!hasToggle) {
				collapse(true);
			} else {
				collapse(!isWide);
			}
		}, [hasToggle, isWide]);

		return (
			<S.Nav
				isCollapsed={isCollapsed}
				role="navigation"
				aria-label="main navigation"
				ref={ref}
				{...rest}
			>
				{hasToggle && (
					<S.NavButton
					icon="talend-opener"
						className={`nav__button ${isCollapsed ? 'nav__button--collapsed' : ''}`}
						onClick={() => collapse(!isCollapsed)}
					>
						{isCollapsed ? 'Uncollapse menu' : 'Collapse menu'}
					</S.NavButton>
				)}
				<S.Menu>
					{Array.isArray(children) ? (
						<ul>
							{children.map((child, index) => (
								<li key={index}>{child}</li>
							))}
						</ul>
					) : (
						children
					)}
				</S.Menu>
			</S.Nav>
		);
	},
);

export default Menu;
