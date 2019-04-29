import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import theme from './TileHeader.scss';

function Header(props) {
	return (
		<div className={classnames(theme['tc-tile-header'], 'tc-tile-header')}>{props.children}</div>
	);
}

Header.propTypes = {
	children: PropTypes.node,
};

export default Header;
