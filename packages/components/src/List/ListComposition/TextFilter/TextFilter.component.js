import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import { useListContext } from '../context';
import FilterBar from '../../../FilterBar';

function TextFilter(props) {
	const { docked, onChange, onToggle, ...restProps } = props;
	const { filterBarDocked, setFilterBarDocked } = useListContext();

	useEffect(() => {
		if (isUndefined(docked) && isUndefined(filterBarDocked)) {
			setFilterBarDocked(true);
		}
	});

	const filterBarProps = {
		// onChange is mapped to onFilter for consistency with sortBy, displayMode ...
		onFilter: onChange,
		docked: filterBarDocked,
		onToggle: (event, value) => {
			if (onToggle) {
				onToggle(event, value);
			} else {
				setFilterBarDocked(!filterBarDocked);
			}
		},
	};

	return <FilterBar {...filterBarProps} {...restProps} />;
}

TextFilter.propTypes = {
	onChange: PropTypes.func.isRequired,
	docked: PropTypes.bool,
	onToggle: PropTypes.func,
};

export default TextFilter;
