import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { translate } from 'react-i18next';

import { DEFAULT_I18N } from '../../translate';
import I18N_DOMAIN_COMPONENTS from '../../constants';

import theme from './NoRows.scss';

function NoRows(props) {
	return (
		<span
			className={classNames(theme['tc-virtualizedlist-no-result'], 'tc-virtualizedlist-no-result')}
			role="status"
			aria-live="polite"
		>
			{props.t('VIRTUALIZEDLIST_NO_RESULT', { defaultValue: 'No result found' })}
		</span>
	);
}

NoRows.propTypes = {
	t: PropTypes.func,
};

export default translate(I18N_DOMAIN_COMPONENTS, { i18n: DEFAULT_I18N })(NoRows);
