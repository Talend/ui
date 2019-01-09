import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DebounceInput from 'react-debounce-input';

import theme from './NameFilter.scss';

function NameFilter({ label, placeholder, value, onChange }) {
	return (
		<form className={classNames('name-filter', theme['name-filter'])}>
			<label key="name-filter" htmlFor="name-filter-input" className="sr-only">
				{label}
			</label>
			<DebounceInput
				key="name-filter"
				id="name-filter-input"
				type="text"
				placeholder={placeholder}
				value={value}
				debounceTimeout={300}
				onChange={onChange}
				className="form-control"
				autoComplete="off"
			/>
		</form>
	);
}

NameFilter.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

NameFilter.defaultProps = {
	label: '',
	placeholder: '',
};

export default NameFilter;
