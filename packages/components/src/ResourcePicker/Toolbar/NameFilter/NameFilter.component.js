import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DebounceInput from 'react-debounce-input';

import theme from './NameFilter.scss';


function NameFilter({ label, placeholder, value, debounceTimeout, onChange }) {
	return (
		<form className={classNames('name-filter', theme['name-filter'])}>
			{ label &&
				<label key="name-filter" htmlFor="name-filter-input" className="sr-only">
					{label}
				</label>
			}
			<DebounceInput
				key="name-filter"
				id="name-filter-input"
				type="text"
				placeholder={placeholder}
				value={value}
				debounceTimeout={debounceTimeout}
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
	debounceTimeout: PropTypes.number,
};

NameFilter.defaultProps = {
	label: null,
	placeholder: '',
	debounceTimeout: 300,
};

export default NameFilter;
