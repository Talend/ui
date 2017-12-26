import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getDefaultTranslate } from '../../translate';

import theme from './NoRows.scss';

function NoRows({ t, emptyListLabel }) {
	return (
		<span className={classNames(theme['no-result'], 'no-result')} role="status" aria-live="polite">
			{t('VIRTUALIZEDLIST_NO_RESULT', { defaultValue: emptyListLabel })}
		</span>
	);
}

NoRows.propTypes = {
	t: PropTypes.func,
	emptyListLabel: PropTypes.string,
};

NoRows.defaultProps = {
	t: getDefaultTranslate,
	emptyListLabel: 'No result found',
};

export default NoRows;
