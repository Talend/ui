import classnames from 'classnames';
import { ReactNode } from 'react';
import theme from './TileFooter.module.css';

type FooterProps = {
	children: ReactNode;
};

function Footer({ children }: FooterProps) {
	return <div className={classnames(theme['tc-tile-footer'], 'tc-tile-footer')}>{children}</div>;
}

export default Footer;
