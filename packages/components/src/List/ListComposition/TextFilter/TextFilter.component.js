import React, { useState } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import { useListContext } from '../context';
import FilterBar from '../../../FilterBar';

function TextFilter(props) {
	const { docked: dockedProp, onChange, onToggle, ...restProps } = props;
	const { textFilter, setTextFilter } = useListContext();
	const [docked, setDocked] = useState(true);

	const filterBarProps = {
		value: textFilter,
		// onChange is mapped to onFilter for consistency with sortBy, displayMode ...
		onFilter: (event, value) => {
			if (onChange) {
				onChange(event, value);
			} else {
				setTextFilter(value);
			}
		},
		docked: isUndefined(dockedProp) ? docked : dockedProp,
		onToggle: (event, value) => {
			if (onToggle) {
				onToggle(event, value);
			} else {
				setDocked(!docked);
			}
		},
	};

	return <FilterBar {...filterBarProps} {...restProps} />;
}

if (process.env.NODE_ENV !== 'production') {
	TextFilter.propTypes = {
		onChange: PropTypes.func,
		docked: PropTypes.bool,
		onToggle: PropTypes.func,
	};
}

export default TextFilter;
