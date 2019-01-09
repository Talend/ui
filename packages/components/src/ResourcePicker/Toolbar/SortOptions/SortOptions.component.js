import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import OrderChooser from './OrderChooser';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import getDefaultT from '../../../translate';

import theme from './SortOptions.scss';


function SortOptions({ t, onChange, nameAsc, dateAsc }) {
	return (
		<div className={classNames('sort-options', theme['sort-options'])}>
			<span className={classNames('option-label', theme['option-label'])}>
				{t('SORT', { defaultValue: 'Sort:' })}
			</span>
			<OrderChooser
				icon={'talend-sort-az'}
				label={t('SORT_BY_NAME', { defaultValue: 'Sort by name' })}
				onClick={() => onChange('NAME', !nameAsc)}
			/>
			<OrderChooser
				icon={'talend-sort-desc'}
				label={t('SORT_BY_DATE', { defaultValue: 'Sort by date' })}
				onClick={() => onChange('DATE', !dateAsc)}
			/>
		</div>
	);
}

SortOptions.propTypes = {
	t: PropTypes.func,
	onChange: PropTypes.func,
	nameAsc: PropTypes.boolean,
	dateAsc: PropTypes.boolean,
};

SortOptions.defaultProps = {
	t: getDefaultT(),
};


export default translate(I18N_DOMAIN_COMPONENTS)(SortOptions);
