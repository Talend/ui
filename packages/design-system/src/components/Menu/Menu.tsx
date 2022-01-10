import React from 'react';
import useMedia from 'react-use/lib/useMedia';
import { useTranslation } from 'react-i18next';

import * as S from './Menu.style';

import tokens from '../../tokens';

export type MenuProps = React.PropsWithChildren<any> & {
	/**
	 * If we want to display a button to collapse the menu
	 */
	hasToggle: boolean;
};

// HTMLElement because there is no HTMLNavElement
// https://stackoverflow.com/questions/57449548/why-is-there-no-htmlnavelement-type
const Menu = React.forwardRef(
	({ children, hasToggle = true, ...rest }: MenuProps, ref: React.Ref<HTMLElement>) => {
		const [isCollapsed, collapse] = React.useState(false);
		const { t } = useTranslation();

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
				aria-label={t('MENU_MAIN_NAVIGATION', 'main')}
				ref={ref}
				{...rest}
			>
				{hasToggle && (
					<S.NavButton
						icon="talend-opener"
						className={`nav__button ${isCollapsed ? 'nav__button--collapsed' : ''}`}
						onClick={() => collapse(!isCollapsed)}
						aria-expanded={!isCollapsed}
					>
						{t('MENU_TOGGLE', 'Toggle menu')}
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
