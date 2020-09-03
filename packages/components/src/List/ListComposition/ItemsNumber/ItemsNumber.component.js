import React from 'react';
import PropTypes from 'prop-types';
import { useListContext } from '../context';

function ItemsNumber(props) {
	const { id, totalItems, selected, label, labelSelected } = props;
	const { t } = useListContext();
	return (
		<div className="tc-items-number" id={id}>
			{selected
				? labelSelected || t('LIST_TOOLBAR_NUMBER_OF_SELECTED_ITEMS', {
						defaultValue: '{{count}}/{{total}} items',
						count: selected,
						total: totalItems,
				  })
				: label ||t('LIST_TOOLBAR_TOTAL_NUMBER_OF_ITEMS', {
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
};

export default ItemsNumber;
