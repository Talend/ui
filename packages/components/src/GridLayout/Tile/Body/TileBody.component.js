import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import theme from '../Tile.scss';

function Body(props) {
	return <div className={classnames(theme['tc-tile-body'], 'tc-tile-body')}>{props.children}</div>;
}

Body.propTypes = {
	children: PropTypes.node,
};

export default Body;
