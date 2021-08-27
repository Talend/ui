import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '@talend/react-bootstrap/lib/Navbar';

import cssModule from './ListToolbar.scss';
import { getTheme } from '../../../theme';

const theme = getTheme(cssModule);

const Right = ({ children }) => (
	<ul className={theme('tc-list-toolbar-right')}>
		{React.Children.map(
			children,
			childElement =>
				childElement && <li className={theme('tc-list-toolbar-separated')}>{childElement}</li>,
		)}
	</ul>
);

Right.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
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
