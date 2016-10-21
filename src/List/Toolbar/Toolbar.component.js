import React from 'react';
import { Navbar } from 'react-bootstrap';
import SelectDisplayMode from './SelectDisplayMode';
import SelectSortBy from './SelectSortBy';
import Filter from './Filter';

export function getSubProps(props, component) {
	const subProps = {};
	Object.keys(component.propTypes)
		.filter(key => props[key] !== undefined)
		.forEach((key) => {
			subProps[key] = props[key];
		});
	return subProps;
}

/**
 * @param {object} props react props
 * @example
<Toolbar name="Hello world"></Toolbar>
 */
function Toolbar(props) {
	const displayProps = getSubProps(props, SelectDisplayMode);
	const sortProps = getSubProps(props, SelectSortBy);
	const filterProps = getSubProps(props, Filter);
	return (
		<Navbar componentClass="div" role="toolbar" fluid>
			<SelectDisplayMode
				key="1"
				{...displayProps}
			/>
			<SelectSortBy
				key="2"
				{...sortProps}
			/>
			<Filter key="3" {...filterProps} />
		</Navbar>
	);
}

Toolbar.propTypes = Object.assign(
	{},
	SelectSortBy.propTypes,
	SelectDisplayMode.propTypes,
	Filter.propTypes,
);

export default Toolbar;
