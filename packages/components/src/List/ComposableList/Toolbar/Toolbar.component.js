import PropTypes from 'prop-types';
import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';

import theme from './Toolbar.scss';

function Toolbar(props) {
	return (
		<Navbar componentClass="div" className={theme['tc-list-toolbar']} role="toolbar" fluid>
			{props.children}
		</Navbar>
	);
}

Toolbar.displayName = 'List.Toolbar';
Toolbar.propTypes = {
	children: PropTypes.node,
};

export default Toolbar;
