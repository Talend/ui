import React from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';

/**
 * @param {object} props react props
 * @example
<SortBar name="Hello world"></SortBar>
 */
function SortBar(props) {
	return (
		<div>
			<div className="pull-right">
				<span>Sort by</span>
				<DropdownButton title={props.on} id="dropdown-sort-1" onSelect={props.onChange}>
					{props.vocabulary.map((item, i) => (
						<MenuItem key={i} eventKey={item}>{item}</MenuItem>
					))}
				</DropdownButton>
				<Button onClick={this.onChangeAsc}>{props.asc ? 'Ascending' : 'Descending'}</Button>
			</div>
		</div>
	);
}

SortBar.propTypes = {
	vocabulary: React.PropTypes.arrayOf(
		React.PropTypes.string
	).isRequired,
	on: React.PropTypes.string,
	asc: React.PropTypes.bool,
	onChange: React.PropTypes.func,
};

export default SortBar;
