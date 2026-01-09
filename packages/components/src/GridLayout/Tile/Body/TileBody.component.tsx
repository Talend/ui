import classnames from 'classnames';
import { ReactNode } from 'react';
import theme from '../Tile.module.css';

type BodyProps = {
	children: ReactNode;
};

function Body({ children }: BodyProps) {
	return <div className={classnames(theme['tc-tile-body'], 'tc-tile-body')}>{children}</div>;
}

export default Body;
