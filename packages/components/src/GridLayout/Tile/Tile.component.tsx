/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ReactNode, MouseEvent, useState } from 'react';
import classnames from 'classnames';
import theme from './Tile.module.scss';
import { TileContext, TileContextType } from './context';

/**
 * We need to stop propagation when focusing an input
 * in order to prevent the drag n drop feature from starting at that moment
 * @param e event
 */
function ignoreDragOnInput(e: MouseEvent<HTMLDivElement>) {
	if ((e.target as HTMLDivElement).tagName.toLowerCase() === 'input') {
		e.stopPropagation();
	}
}

type TileProps = {
	children: ReactNode;
	className?: string;
};

function Tile(props: TileProps) {
	const [displayMode, setDisplayMode] = useState<string>('');

	const contextValues: TileContextType = {
		displayMode,
		setDisplayMode,
	};
	return (
		<TileContext.Provider value={contextValues}>
			<div
				className={classnames(theme['tc-tile-container'], 'tc-tile-container', props.className)}
				onMouseDown={ignoreDragOnInput}
			>
				{props.children}
			</div>
		</TileContext.Provider>
	);
}

export default Tile;
