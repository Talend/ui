import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Navbar from 'react-bootstrap/lib/Navbar';

import theme from './Toolbar.scss';

function Toolbar(props) {
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

Toolbar.displayName = 'List.Toolbar';
Toolbar.propTypes = {
	children: PropTypes.node,
};

export default Toolbar;
