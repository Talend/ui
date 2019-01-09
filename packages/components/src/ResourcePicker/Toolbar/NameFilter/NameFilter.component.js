import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import DebounceInput from 'react-debounce-input';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import getDefaultT from '../../../translate';

import theme from './NameFilter.scss';

function NameFilter({ t, value, onChange }) {
	return (
		<form
			className={classNames('name-filter', theme['name-filter'])}
		>
			<label key="name-filter" htmlFor="name-filter-input" className="sr-only">
				{'Test label'}
			</label>
			<DebounceInput
				key="name-filter"
				id="name-filter-input"
				type="text"
				placeholder={t('IM_A_TOOLBAR', { defaultValue: "I'm a toolbar" })}
				value={value}
				debounceTimeout={300}
				onChange={onChange}
				className="form-control"
				autoComplete="off"
			/>
		</form>
	);
}

NameFilter.propTypes = {
	t: PropTypes.func,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

NameFilter.defaultProps = {
	t: getDefaultT(),
};

export default translate(I18N_DOMAIN_COMPONENTS)(NameFilter);
