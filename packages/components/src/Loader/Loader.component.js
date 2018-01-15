import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import CircularProgress from './../CircularProgress';

import theme from './Loader.scss';

function Loader({ id, className }) {
	const loaderClassNames = classNames('tc-loader', theme['tc-loader'], className);

	return (
		<div id={id} aria-atomic="true" aria-busy="true" className={loaderClassNames}>
			<CircularProgress size={'default'} />
		</div>
	);
}

Loader.displayName = 'Loader';

Loader.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
};

export default Loader;
