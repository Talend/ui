import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import theme from './Tile.scss';
import { TileContext } from './context';

function Tile(props) {
	const [displayMode, setDisplayMode] = useState();

	const contextValues = {
		displayMode,
		setDisplayMode,
	};
	return (
		<TileContext.Provider value={contextValues}>
			<div className={classnames(theme['tc-tile-container'], 'tc-tile-container')}>
				{ props.children }
			</div>
		</TileContext.Provider>
	);
}

Tile.propTypes = {
	children: PropTypes.node,
};

export default Tile;
