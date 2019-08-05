import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Navbar from 'react-bootstrap/Navbar';

import theme from './ListToolbar.scss';

function ListToolbar(props) {
	return (
		<Navbar
			componentClass="div"
			className={classnames(theme['tc-list-toolbar'], 'tc-list-toolbar')}
			role="toolbar"
			fluid
		>
			{props.children}
		</Navbar>
	);
}
ListToolbar.propTypes = {
	children: PropTypes.node,
};

export default ListToolbar;
