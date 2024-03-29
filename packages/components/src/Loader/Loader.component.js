import classNames from 'classnames';
import PropTypes from 'prop-types';

import CircularProgress from '../CircularProgress';

import theme from './Loader.module.scss';

function Loader({ id, className, size = CircularProgress.SIZE.default }) {
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
	size: PropTypes.oneOf(Object.values(CircularProgress.SIZE)),
};

export default Loader;
