import React from 'react';
import { Navbar } from 'react-bootstrap';
import SelectDisplayMode from './SelectDisplayMode';
import SelectSortBy from './SelectSortBy';
import Filter from './Filter';

/**
 * @param {object} props react props
 * @example
<Toolbar name="Hello world"></Toolbar>
 */
function Toolbar(props) {
	return (
		<Navbar componentClass="div" role="toolbar" fluid>
			<SelectDisplayMode
				key="1"
				onSelectDisplayMode={props.onSelectDisplayMode}
			/>
			<SelectSortBy
				key="2"
				sortBy={props.sortBy}
				onSelectSortBy={props.onSelectSortBy}
			/>
			<Filter key="3" onFilter={props.onFilter} />
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
