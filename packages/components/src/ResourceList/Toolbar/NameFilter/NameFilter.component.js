import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DebounceInput from 'react-debounce-input';
import { useTranslation } from 'react-i18next';
import useKey from 'react-use/lib/useKey';

import { Action } from '../../../Actions';
import I18N_DOMAIN_COMPONENTS from '../../../constants';

import theme from './NameFilter.scss';

function NameFilter({ label, value, onChange }) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const removeFilter = () => onChange({ target: { value: '' } });
	useKey('Escape', removeFilter);
	return (
		<form
			className={classNames(
				'tc-resource-picker-name-filter',
				theme['tc-resource-picker-name-filter'],
			)}
		>
			<label htmlFor="resource-picker-toolbar-name-filter-input" className="sr-only">
				{label}
			</label>
			<DebounceInput
				id="resource-picker-toolbar-name-filter-input"
				type="text"
				placeholder={label}
				value={value}
				onChange={onChange}
				className="form-control"
				autoComplete="off"
				required
			/>
			<Action
				className={theme.remove}
				bsStyle="link"
				icon="talend-cross"
				label={t('LIST_FILTER_REMOVE', { defaultValue: 'Remove filter' })}
				hideLabel
				onClick={removeFilter}
			/>
		</form>
	);
}

NameFilter.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default NameFilter;
