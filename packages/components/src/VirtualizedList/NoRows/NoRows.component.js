import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Loader from '../../Loader';

import { getDefaultTranslate } from '../../translate';

import theme from './NoRows.scss';

function NoRows({ t, inProgress }) {
	const className = classNames(theme['no-result'], 'no-result');

	if (inProgress) {
		return <Loader className={className} />;
	}

	return (
		<span className={className} role="status" aria-live="polite">
			{t('VIRTUALIZEDLIST_NO_RESULT', { defaultValue: 'No result found' })}
		</span>
	);
}

NoRows.propTypes = {
	t: PropTypes.func,
	inProgress: PropTypes.bool,
};

NoRows.defaultProps = {
	t: getDefaultTranslate,
	inProgress: false,
};

export default NoRows;
