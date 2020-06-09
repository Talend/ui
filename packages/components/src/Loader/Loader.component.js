import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import CircularProgress from '../CircularProgress';
import { CIRCULAR_PROGRESS_SIZE as SIZE } from '../constants';

import theme from './Loader.scss';

function Loader({ id, className, size = SIZE.default }) {
	const loaderClassNames = classNames('tc-loader', theme['tc-loader'], className);

	return (
		<div id={id} className={loaderClassNames}>
			<CircularProgress size={size} />
		</div>
	);
}

Loader.displayName = 'Loader';

Loader.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	size: PropTypes.oneOf(Object.values(SIZE)),
};

export default Loader;
