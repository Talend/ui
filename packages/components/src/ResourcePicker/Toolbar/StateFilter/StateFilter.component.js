import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import { ActionIconToggle } from '../../../';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import getDefaultT from '../../../translate';

import theme from './StateFilter.scss';


function StateFilter({ t, onChange, favorite, certified }) {
	return (
		<div className={classNames('state-filters', theme['state-filters'])}>
			<span className={classNames('option-label', theme['option-label'])}>
				{t('FILTER', { defaultValue: 'Filter:' })}
			</span>
			<ActionIconToggle
				icon={'talend-star'}
				label={t('FAVORITES', { defaultValue: 'Favorites' })}
				active={favorite}
				onClick={() => onChange('FAVORITE', !favorite)}
				className={classNames('favorite-filter', theme['favorite-filter'])}
			/>
			<ActionIconToggle
				icon={'talend-badge'}
				label={t('CERTIFIED', { defaultValue: 'Certified' })}
				active={certified}
				onClick={() => onChange('CERTIFIED', !certified)}
				className={classNames('certified-filter', theme['certified-filter'])}
			/>
		</div>
	);
}


StateFilter.propTypes = {
	t: PropTypes.func,
	favorite: PropTypes.boolean,
	certified: PropTypes.boolean,
	onChange: PropTypes.func,
};

StateFilter.defaultProps = {
	t: getDefaultT(),
};


export default translate(I18N_DOMAIN_COMPONENTS)(StateFilter);
