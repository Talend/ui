import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import theme from './Tile.scss';

function Tile(props) {
	return (
		<div className={classnames(theme['tc-tile-container'], 'tc-tile-container')}>
			{ props.children }
		</div>
	);
}

Tile.propTypes = {
	children: PropTypes.node,
};

export default Tile;
