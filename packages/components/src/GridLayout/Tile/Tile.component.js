import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import theme from './Tile.scss';
import { TileContext } from './context';

/**
 * We need to stop propagation when focusing an input
 * in order to prevent the drag n drop feature from starting at that moment
 * @param e event
 */
function ignoreDragOnInput(e) {
	if (e.target.tagName.toLowerCase() === 'input') {
		e.stopPropagation();
	}
}

function Tile(props) {
	const [displayMode, setDisplayMode] = useState();

	const contextValues = {
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

Tile.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default Tile;
