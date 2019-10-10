import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useListContext } from '../context';
import FilterBar from '../../../FilterBar';

function TextFilter(props) {
	const { docked, initialDocked, onChange, onToggle, value, ...restProps } = props;
	const { textFilter, setTextFilter } = useListContext();
	const [dockedState, setDocked] = useState(initialDocked);

	const isToggleControlled = onToggle;
	const isFilterControlled = onChange;

	const onFilterFunction = isFilterControlled ? onChange : (_, val) => setTextFilter(val);
	const onToggleUncontrolled = () => {
		if (dockedState || !textFilter) {
			setDocked(!dockedState);
		}
	};
	const onToggleFunction = isToggleControlled ? onToggle : onToggleUncontrolled;

	const filterBarProps = {
		debounceTimeout: 300,

		value: isFilterControlled ? value : textFilter,
		onFilter: onFilterFunction,

		docked: isToggleControlled ? docked : dockedState,
		onToggle: onToggleFunction,
	};

	return <FilterBar {...filterBarProps} {...restProps} />;
}

TextFilter.defaultProps = {
	initialDocked: true,
};

if (process.env.NODE_ENV !== 'production') {
	TextFilter.propTypes = {
		docked: PropTypes.bool,
		initialDocked: PropTypes.bool,
		onChange: PropTypes.func,
		onToggle: PropTypes.func,
		value: PropTypes.string,
	};
}

export default TextFilter;
