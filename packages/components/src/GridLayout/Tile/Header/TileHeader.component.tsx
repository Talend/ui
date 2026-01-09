import classnames from 'classnames';
import { ReactNode } from 'react';
import theme from './TileHeader.module.css';

type HeaderProps = {
	children: ReactNode;
};

function Header(props: HeaderProps) {
	return (
		<div className={classnames(theme['tc-tile-header'], 'tc-tile-header')}>{props.children}</div>
	);
}

export default Header;
