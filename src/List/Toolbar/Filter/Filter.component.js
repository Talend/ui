import React, { PropTypes } from 'react';
import DebounceInput from 'react-debounce-input';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import Icon from '../../../Icon';

/**
 * @param {object} props react props
 * @example
 <Filter name="Hello world"></Filter>
 */
function Filter({ id, onFilter, debounceMinLength, debounceTimeout }) {
	function onFilterHandler(event) {
		return onFilter(event.target.value, event);
	}

	function onSubmit(event) {
		event.preventDefault();
		return onFilter(this.value, event);
	}

	const inputProps = {
		id: id && `${id}-input`,
		type: 'search',
		placeholder: 'Filter',
		'aria-label': 'Filter',
		onChange: onFilterHandler,
		ref: c => onSubmit.bind(c),
	};

	return (
		<form
			className="navbar-form navbar-right"
			role="search"
			onSubmit={onSubmit}
		>
			<div className="form-group">
				{(debounceMinLength || debounceTimeout) ?
					<DebounceInput
						{...inputProps}
						element={FormControl}
						minLength={debounceMinLength}
						debounceTimeout={debounceTimeout}
					/> : <FormControl
						{...inputProps}
					/> }
				<Button
					id={id && `${id}-submit`}
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
	onFilter: PropTypes.func.isRequired,
	debounceMinLength: PropTypes.number,
	debounceTimeout: PropTypes.number,
};

export default Filter;
