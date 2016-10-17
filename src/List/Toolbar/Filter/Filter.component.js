import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

/**
 * @param {object} props react props
 * @example
 <Filter name="Hello world"></Filter>
 */
function Filter({ onFilter }) {
	function onFilterHandler(event) {
		return onFilter(event.target.value, event);
	}

	function onSubmit(event) {
		event.preventDefault();
		return onFilter(this.value, event);
	}

	return (
		<form
			className="navbar-form navbar-right"
			role="search"
			onSubmit={onSubmit}
		>
			<div className="form-group">
				<div className="input-group">
					<input
						type="search"
						className="form-control"
						placeholder="Filter"
						aria-label="Filter"
						onChange={onFilterHandler}
						ref={c => onSubmit.bind(c)}
					/>
				</div>
				<Button
					bsStyle="link"
					type="submit"
					title="Filter"
				>
					<i className="fa fa-search" aria-hidden="true" />
					<span className="sr-only">Filter</span>
				</Button>
			</div>
		</form>
	);
}

Filter.propTypes = {
	onFilter: PropTypes.func,
};

export default Filter;
