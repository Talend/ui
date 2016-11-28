import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';

/**
 * @param {object} props react props
 * @example
 <Filter name="Hello world"></Filter>
 */
function Filter({ id, onFilter }) {
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
						id={id && `${id}-filter-input`}
						type="search"
						className="form-control"
						placeholder="Filter"
						aria-label="Filter"
						onChange={onFilterHandler}
						ref={c => onSubmit.bind(c)}
					/>
				</div>
				<Button
					id={id && `${id}-filter-submit`}
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
	id: PropTypes.string,
	onFilter: PropTypes.func,
};

export default Filter;
