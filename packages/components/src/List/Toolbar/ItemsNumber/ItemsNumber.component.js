import React from 'react';
import PropTypes from 'prop-types';
import getDefaultT from '../../../translate';

function ItemsNumber({ id, totalItems, selected, label, t }) {
	const itemsLabel = label || t('TOTAL_NUMBER_OF_ITEMS_LABEL', { defaultValue: 'items' });
	return (
		<div className='tc-items-number' id={id}>
			{
				selected
					? t('TOTAL_NUMBER_OF_SELECTED_ITEMS', { defaultValue: '{{selected}}/{{totalItems}} {{itemsLabel}}', selected, totalItems, itemsLabel })
					: t('TOTAL_NUMBER_OF_ITEMS', { defaultValue: '{{totalItems}} {{itemsLabel}}', totalItems, itemsLabel })
			}
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
