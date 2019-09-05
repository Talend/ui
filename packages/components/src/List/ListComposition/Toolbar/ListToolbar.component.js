import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';

import cssModule from './ListToolbar.scss';
import { getTheme } from '../../../theme';

const theme = getTheme(cssModule);

const Right = ({ children }) => (
	<Nav className={theme('tc-list-toolbar-right')}>
		{React.Children.map(children, childElement => (
			<li className={theme('tc-list-toolbar-separated')}>{childElement}</li>
		))}
	</Nav>
);

Right.propTypes = {
	children: PropTypes.oneOfType[(PropTypes.element, PropTypes.arrayOf(PropTypes.element))],
};

function ListToolbar(props) {
	return (
		<Navbar componentClass="div" className={theme('tc-list-toolbar')} role="toolbar" fluid>
			{props.children}
		</Navbar>
	);
}
ListToolbar.propTypes = {
	children: PropTypes.node,
};

ListToolbar.Right = Right;

export default ListToolbar;
