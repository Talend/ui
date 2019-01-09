import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import OrderChooser from './OrderChooser';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import getDefaultT from '../../../translate';

import theme from './SortOptions.scss';


const TYPES = {
	NAME: 'name',
	DATE: 'date',
};

function has(types, type) {
	return types.includes(type);
}

function SortOptions({ t, types, onChange, nameAsc, dateAsc }) {
	return !!types.length && (
		<div className={classNames('sort-options', theme['sort-options'])}>
			<span className={classNames('option-label', theme['option-label'])}>
				{t('SORT', { defaultValue: 'Sort:' })}
			</span>
			{
				has(types, TYPES.NAME) && <OrderChooser
					icon={'talend-sort-az'}
					label={t('SORT_BY_NAME', { defaultValue: 'Sort by name' })}
					onClick={() => onChange('NAME', !nameAsc)}
				/>
			}
			{
				has(types, TYPES.DATE) && <OrderChooser
					icon={'talend-sort-desc'}
					label={t('SORT_BY_DATE', { defaultValue: 'Sort by date' })}
					onClick={() => onChange('DATE', !dateAsc)}
				/>
			}
		</div>
	);
}

SortOptions.propTypes = {
	t: PropTypes.func,
	onChange: PropTypes.func,
	nameAsc: PropTypes.boolean,
	dateAsc: PropTypes.boolean,
	types: PropTypes.array,
};

SortOptions.defaultProps = {
	t: getDefaultT(),
	types: [TYPES.NAME, TYPES.DATE],
};

SortOptions.TYPES = TYPES;

export default translate(I18N_DOMAIN_COMPONENTS)(SortOptions);
