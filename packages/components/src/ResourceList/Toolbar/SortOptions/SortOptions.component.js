import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import OrderChooser from './OrderChooser';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import getDefaultT from '../../../translate';

import theme from './SortOptions.scss';

export const TYPES = {
	NAME: 'name',
	DATE: 'date',
};

export const ORDERS = {
	ASC: 'asc',
	DESC: 'desc',
};

function inverse(order) {
	if (order === ORDERS.ASC) {
		return ORDERS.DESC;
	}
	return ORDERS.ASC;
}

function getSortIcon(type, orders) {
	if (type === TYPES.NAME) {
		switch (orders[TYPES.NAME]) {
		case ORDERS.ASC:
			return 'talend-sort-az';
		default:
			return 'talend-sort-za';
		}
	}
	if (type === TYPES.DATE) {
		switch (orders[TYPES.DATE]) {
		case ORDERS.ASC:
			return 'talend-sort-asc';
		default:
			return 'talend-sort-desc';
		}
	}
}

function SortOptions({ t, types, onChange, orders }) {
	return (
		!!types.length && (
			<div
				className={classNames(
					'tc-resource-picker-sort-options',
					theme['tc-resource-picker-sort-options'],
				)}
			>
				<span className={classNames(theme['option-label'])}>
					{t('SORT', { defaultValue: 'Sort:' })}
				</span>
				{types.includes(TYPES.NAME) && (
					<OrderChooser
						icon={getSortIcon(TYPES.NAME, orders)}
						label={t('SORT_BY_NAME', {
							defaultValue: 'Sort by name (current order: {{order}})',
							order: orders[TYPES.NAME],
						})}
						onClick={() => onChange(TYPES.NAME, inverse(orders[TYPES.NAME]))}
					/>
				)}
				{types.includes(TYPES.DATE) && (
					<OrderChooser
						icon={getSortIcon(TYPES.DATE, orders)}
						label={t('SORT_BY_DATE', {
							defaultValue: 'Sort by date (current order: {{order}})',
							order: orders[TYPES.DATE],
						})}
						onClick={() => onChange(TYPES.DATE, inverse(orders[TYPES.DATE]))}
					/>
				)}
			</div>
		)
	);
}

SortOptions.propTypes = {
	t: PropTypes.func,
	onChange: PropTypes.func,
	orders: PropTypes.object,
	types: PropTypes.array,
};

SortOptions.defaultProps = {
	t: getDefaultT(),
	types: [TYPES.NAME, TYPES.DATE],
	orders: {
		[TYPES.NAME]: ORDERS.DESC,
		[TYPES.DATE]: ORDERS.DESC,
	},
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(SortOptions);
