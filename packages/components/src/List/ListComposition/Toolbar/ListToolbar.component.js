import { Children } from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '@talend/react-bootstrap';

import cssModule from './ListToolbar.module.scss';
import { getTheme } from '../../../theme';

const theme = getTheme(cssModule);

const Right = ({ children }) => (
	<ul className={theme('tc-list-toolbar-right')}>
		{Children.map(
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
