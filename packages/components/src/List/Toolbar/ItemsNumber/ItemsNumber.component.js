import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import getDefaultT from '../../../translate';

import theme from './ItemsNumber.scss';

function ItemsNumber({ id, totalItems, selected, label, t }) {
	const itemsLabel = label || t('TOTAL_NUMBER_OF_ITEMS_LABEL', { defaultValue: 'items' });
	return (
		<div className={classNames(theme['tc-items-number'], 'tc-items-number')} id={id}>
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
	totalItems: PropTypes.number,
	label: PropTypes.string,
	t: PropTypes.func,
};

ItemsNumber.defaultProps = {
	t: getDefaultT(),
};

export default ItemsNumber;
