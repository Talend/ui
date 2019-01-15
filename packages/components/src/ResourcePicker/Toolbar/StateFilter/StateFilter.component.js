import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import ActionIconToggle from '../../../Actions/ActionIconToggle';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import getDefaultT from '../../../translate';

import theme from './StateFilter.scss';

export const TYPES = {
	FAVORITES: 'favorites',
	CERTIFIED: 'certified',
};

function StateFilter({ t, types, onChange, selected, favorites, certified }) {
	return (
		!!types.length && (
			<div className={classNames('tc-resource-picker-state-filters', theme['tc-resource-picker-state-filters'])}>
				<span className={classNames(theme['option-label'])}>
					{t('FILTER', { defaultValue: 'Filter:' })}
				</span>
				{types.includes(TYPES.SELECTED) && (
					<ActionIconToggle
						icon={'talend-check-circle'}
						label={t('SELECTED', { defaultValue: 'Selected' })}
						active={selected}
						onClick={() => onChange(TYPES.SELECTED, !selected)}
						className={classNames(theme['tc-resource-picker-selected-filter'])}
					/>
				)}
				{types.includes(TYPES.CERTIFIED) && (
					<ActionIconToggle
						icon={'talend-badge'}
						label={t('CERTIFIED', { defaultValue: 'Certified' })}
						active={certified}
						onClick={() => onChange(TYPES.CERTIFIED, !certified)}
						className={classNames(theme['tc-resource-picker-certified-filter'])}
					/>
				)}
				{types.includes(TYPES.FAVORITES) && (
					<ActionIconToggle
						icon={'talend-star'}
						label={t('FAVORITES', { defaultValue: 'Favorites' })}
						active={favorites}
						onClick={() => onChange(TYPES.FAVORITES, !favorites)}
						className={classNames(theme['tc-resource-picker-favorite-filter'])}
					/>
				)}
			</div>
		)
	);
}

StateFilter.propTypes = {
	t: PropTypes.func,
	favorites: PropTypes.bool,
	certified: PropTypes.bool,
	onChange: PropTypes.func,
	types: PropTypes.array,
};

StateFilter.defaultProps = {
	t: getDefaultT(),
	types: [TYPES.FAVORITES, TYPES.CERTIFIED],
};

export default translate(I18N_DOMAIN_COMPONENTS)(StateFilter);
