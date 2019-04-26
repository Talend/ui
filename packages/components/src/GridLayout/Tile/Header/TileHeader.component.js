import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import theme from './TileHeader.scss';
import { useTileContext } from '../context';

function Header(props) {
	// const { leftActions, rightActions } = props;
	const { displayMode } = useTileContext();

	const {
		displayModes,
		selectedDisplayMode = displayMode,
	} = props;

	return (
		<div className={classnames(theme['tc-tile-header'], 'tc-tile-header')}>
			{ props.children }
		</div>
	);
}

Header.propTypes = {
	children: PropTypes.node,
};

export default Header;
