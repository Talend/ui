import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import DebounceInput from 'react-debounce-input';
import { ActionIconToggle } from '../../';
import OrderChooser from './OrderChooser';
import I18N_DOMAIN_COMPONENTS from '../../constants';
import getDefaultT from '../../translate';

import theme from './Toolbar.scss';

function NameFilter({ t, filterValue, onChange }) {
	return (
		<form>
			<DebounceInput
				type="text"
				placeholder={t('IM_A_TOOLBAR', { defaultValue: "I'm a toolbar" })}
				value={filterValue}
				debounceTimeout={300}
				onChange={onChange}
				className="form-control"
				autoComplete="off"
			/>
		</form>
	);
}

function SortOptions({ t, favorite, onFavoriteFilterChange, certified, onCertifiedFilterChange }) {
	return (
		<div
			className={classNames('sort-options', theme['sort-options'])}
		>
			<span
				className={classNames('option-label', theme['option-label'])}
			>{t('SORT', { defaultValue: 'Sort:' })}</span>
			<OrderChooser
				icon={'talend-sort-az'}
				label={t('SORT_BY_NAME', { defaultValue: 'Sort by name' })}
				active={favorite}
				onClick={onFavoriteFilterChange}
			/>
			<OrderChooser
				icon={'talend-sort-desc'}
				label={t('SORT_BY_DATE', { defaultValue: 'Sort by date' })}
				active={certified}
				onClick={onCertifiedFilterChange}
			/>
		</div>
	);
}

function StateFilter({ t, favorite, onFavoriteFilterChange, certified, onCertifiedFilterChange }) {
	return (
		<div
			className={classNames('state-filters', theme['state-filters'])}
		>
			<span
				className={classNames('option-label', theme['option-label'])}
			>{t('FILTER', { defaultValue: 'Filter:' })}</span>
			<ActionIconToggle
				icon={'talend-star'}
				label={t('FAVORITES', { defaultValue: 'Favorites' })}
				active={favorite}
				onClick={onFavoriteFilterChange}
				className={classNames('favorite-filter', theme['favorite-filter'])}
			/>
			<ActionIconToggle
				icon={'talend-badge'}
				label={t('CERTIFIED', { defaultValue: 'Certified' })}
				active={certified}
				onClick={onCertifiedFilterChange}
				className={classNames('certified-filter', theme['certified-filter'])}
			/>
		</div>
	);
}

function Toolbar(props) {
	return (
		<div className={classNames('toolbar-container', theme['toolbar-container'])}>
			<NameFilter {...props} />
			<SortOptions {...props} />
			<StateFilter {...props} />
		</div>
	);
}

Toolbar.defaultProps = {
	t: getDefaultT(),
};

Toolbar.propTypes = {
	t: PropTypes.func,
};

export default translate(I18N_DOMAIN_COMPONENTS)(Toolbar);
