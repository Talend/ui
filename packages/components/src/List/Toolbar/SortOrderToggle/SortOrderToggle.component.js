import React from 'react';
import PropTypes from 'prop-types';
import getDefaultT from '../../../translate';
import IconsToggle from '../IconsToggle';

function getLabel(selected, t) {
	switch (selected) {
		case 'descending':
			return t('LIST_SELECT_SORT_BY_ORDER_DESC', { defaultValue: 'Descending' });
		case 'ascending':
			return t('LIST_SELECT_SORT_BY_ORDER_ASC', { defaultValue: 'Ascending' });
		default:
			return t('LIST_SELECT_SORT_BY_ORDER_DESC', { defaultValue: 'Descending' });
	}
}
function getAriaLabel(selected, t) {
	return t('LIST_CHANGE_SORT_BY', {
		defaultValue: 'Change sort criteria. Current sort by {{sortBy}}.',
		sortBy: selected,
	});
}

function SortOrderToggle({ id, onChange, isDescending, t }) {
	const options = [
		{
			name: 'descending',
			icon: 'talend-sort-desc',
			label: getLabel('descending', t),
			ariaLabel: getAriaLabel('descending', t),
		},
		{
			name: 'ascending',
			icon: 'talend-sort-asc',
			label: getLabel('ascending', t),
			ariaLabel: getAriaLabel('ascending', t),
		},
	];
	return (<IconsToggle
		id={`${id}-display-mode-toggle`}
		selected={isDescending ? 'descending' : 'ascending'}
		options={options}
		onChange={onChange}
	/>);
}

SortOrderToggle.propTypes = {
	id: PropTypes.string,
	isDescending: PropTypes.bool,
	onChange: PropTypes.func,
	t: PropTypes.func.isRequired,
};

SortOrderToggle.defaultProps = {
	t: getDefaultT(),
};

export default SortOrderToggle;
