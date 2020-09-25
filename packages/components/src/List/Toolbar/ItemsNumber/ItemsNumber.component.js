import React from 'react';
import PropTypes from 'prop-types';
import getDefaultT from '../../../translate';

function ItemsNumber({ id, totalItems, selected, label, labelSelected, t }) {
	return (
		<div className="tc-items-number" id={id}>
			{selected
				? labelSelected ||
				  t('LIST_TOOLBAR_NUMBER_OF_SELECTED_ITEMS', {
						defaultValue: '{{count}}/{{total}} items',
						count: selected,
						total: totalItems,
				  })
				: label ||
				  t('LIST_TOOLBAR_TOTAL_NUMBER_OF_ITEMS', {
						defaultValue: '{{count}} items',
						count: totalItems,
				  })}
		</div>
	);
}

ItemsNumber.propTypes = {
	id: PropTypes.string,
	selected: PropTypes.number,
	totalItems: PropTypes.number,
	label: PropTypes.string,
	labelSelected: PropTypes.string,
	t: PropTypes.func,
};

ItemsNumber.defaultProps = {
	t: getDefaultT(),
};

export default ItemsNumber;
