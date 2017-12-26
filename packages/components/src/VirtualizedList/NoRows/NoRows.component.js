import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getDefaultTranslate } from '../../translate';

import theme from './NoRows.scss';

function NoRows({ t, noRowsLabel }) {
	return (
		<span className={classNames(theme['no-result'], 'no-result')} role="status" aria-live="polite">
			{t('VIRTUALIZEDLIST_NO_RESULT', { defaultValue: noRowsLabel })}
		</span>
	);
}

NoRows.propTypes = {
	t: PropTypes.func,
	noRowsLabel: PropTypes.string,
};

NoRows.defaultProps = {
	t: getDefaultTranslate,
	noRowsLabel: 'No result found',
};

export default NoRows;
