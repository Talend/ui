import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Icon from '../../../Icon';

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
				<input
					id={id && `${id}-filter-input`}
					type="search"
					className="form-control"
					placeholder="Filter"
					aria-label="Filter"
					onChange={onFilterHandler}
					ref={c => onSubmit.bind(c)}
				/>
				<Button
					id={id && `${id}-filter-submit`}
					bsStyle="link"
					type="submit"
					title="Filter"
				>
					<Icon name="talend-search" />
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
