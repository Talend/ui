import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getDefaultTranslate } from '../../translate';

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

NoRows.defaultProps = {
	t: getDefaultTranslate,
};

export default NoRows;
