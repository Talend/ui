import React from 'react';
import PropTypes from 'prop-types';
import getDefaultT from '../../../translate';

function ItemsNumber({ id, totalItems, selected, label, t }) {
	const itemsLabel = label || t('TOTAL_NUMBER_OF_ITEMS_LABEL', { defaultValue: 'items' });
	return (
		<div className="tc-items-number" id={id}>
			{selected
				? t('LIST_TOOLBAR_NUMBER_OF_SELECTED_ITEMS', {
						defaultValue: '{{count}}/{{total}} {{itemsLabel}}',
						count: selected,
						total: totalItems,
						itemsLabel,
				  })
				: t('LIST_TOOLBAR_TOTAL_NUMBER_OF_ITEMS', {
						defaultValue: '{{count}} {{itemsLabel}}',
						count: totalItems,
						itemsLabel,
				  })}
		</div>
	);
}

ItemsNumber.propTypes = {
	id: PropTypes.string,
	selected: PropTypes.number,
	totalItems: PropTypes.number.isRequired,
	label: PropTypes.string,
	t: PropTypes.func,
};

ItemsNumber.defaultProps = {
	t: getDefaultT(),
};

export default ItemsNumber;
