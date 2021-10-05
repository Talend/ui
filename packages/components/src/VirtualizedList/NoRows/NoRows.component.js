import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';

import getDefaultT from '../../translate';
import I18N_DOMAIN_COMPONENTS from '../../constants';

import theme from './NoRows.scss';

export function NoRowsComponent(props) {
	return (
		<span
			className={classNames(theme['tc-virtualizedlist-no-result'], 'tc-virtualizedlist-no-result')}
			role="status"
			aria-live="polite"
		>
			{props.t('NO_RESULT_FOUND', { defaultValue: 'No result found' })}
		</span>
	);
}

NoRowsComponent.propTypes = {
	t: PropTypes.func,
};

NoRowsComponent.defaultProps = {
	t: getDefaultT(),
};

export default withTranslation(I18N_DOMAIN_COMPONENTS)(NoRowsComponent);
