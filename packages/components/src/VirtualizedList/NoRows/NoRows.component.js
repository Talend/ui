import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getDefaultTranslate } from '../../translate';

import theme from './NoRows.scss';

function NoRows({ t }) {
	return <span
		className={classNames(theme['no-result'], 'no-result')}
		role="status"
		aria-live="polite"
	>
		{t('VIRTUALIZEDLIST_NO_RESULT', 'No result found')}
	</span>;
}

NoRows.propTypes = {
	t: PropTypes.func,
};

NoRows.defaultProps = {
	t: getDefaultTranslate,
};

export default NoRows;
