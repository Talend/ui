import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';

import CircularProgress from './../CircularProgress';
import { CIRCULAR_PROGRESS_SIZE as SIZE } from '../constants';

import theme from './Loader.scss';

function Loader({ id, className, size = SIZE.default, iconName }) {
	const loaderClassNames = classNames('tc-loader', theme['tc-loader'], className);

	return (
			<div id={id} aria-atomic="true" aria-busy="true" className={loaderClassNames}>
				<CircularProgress size={size} />
				{iconName && <Icon name={iconName} className={theme['tc-app-loader-icon']} />}
			</div>
	);
}

Loader.displayName = 'Loader';

Loader.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	size: PropTypes.oneOf(Object.values(SIZE)),
	iconName: PropTypes.string,
};

export default Loader;
