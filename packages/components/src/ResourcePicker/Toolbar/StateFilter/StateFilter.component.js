import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import { ActionIconToggle } from '../../../';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import getDefaultT from '../../../translate';

import theme from './StateFilter.scss';


const TYPES = {
	FAVORITES: 'favorites',
	CERTIFIED: 'certified',
};

function has(types, type) {
	return types.includes(type);
}

function StateFilter({ t, types, onChange, selected, favorite, certified }) {
	return !!types.length && (
		<div className={classNames('state-filters', theme['state-filters'])}>
			<span className={classNames('option-label', theme['option-label'])}>
				{t('FILTER', { defaultValue: 'Filter:' })}
			</span>
			{
				has(types, TYPES.SELECTED) && <ActionIconToggle
					icon={'talend-check-circle'}
					label={t('SELECTED', { defaultValue: 'Selected' })}
					active={selected}
					onClick={() => onChange('SELECTED', !selected)}
					className={classNames('selected-filter', theme['selected-filter'])}
				/>
			}
			{
				has(types, TYPES.FAVORITES) && <ActionIconToggle
					icon={'talend-star'}
					label={t('FAVORITES', { defaultValue: 'Favorites' })}
					active={favorite}
					onClick={() => onChange('FAVORITE', !favorite)}
					className={classNames('favorite-filter', theme['favorite-filter'])}
				/>
			}
			{
				has(types, TYPES.CERTIFIED) && <ActionIconToggle
					icon={'talend-badge'}
					label={t('CERTIFIED', { defaultValue: 'Certified' })}
					active={certified}
					onClick={() => onChange('CERTIFIED', !certified)}
					className={classNames('certified-filter', theme['certified-filter'])}
				/>
			}
		</div>
	);
}


StateFilter.propTypes = {
	t: PropTypes.func,
	favorite: PropTypes.boolean,
	certified: PropTypes.boolean,
	onChange: PropTypes.func,
	types: PropTypes.array,
};

StateFilter.defaultProps = {
	t: getDefaultT(),
	types: [TYPES.FAVORITES, TYPES.CERTIFIED],
};

StateFilter.TYPES = TYPES;

export default translate(I18N_DOMAIN_COMPONENTS)(StateFilter);
