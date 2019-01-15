import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DebounceInput from 'react-debounce-input';

import theme from './NameFilter.scss';

function NameFilter({ label, value, onChange }) {
	return (
		<form className={classNames('tc-resource-picker-name-filter', theme['tc-resource-picker-name-filter'])}>
			<label htmlFor="resource-picker-toolbar-name-filter-input" className="sr-only">
				{label}
			</label>
			<DebounceInput
				id="resource-picker-toolbar-name-filter-input"
				type="text"
				placeholder={label}
				value={value}
				onChange={onChange}
				className="form-control"
				autoComplete="off"
			/>
		</form>
	);
}

NameFilter.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default NameFilter;
