import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '../Skeleton';

function loadable(WrappedComponent, params) {
	const Wrapper = ({ loading, ...rest }) => {
		if (loading) {
			return <Skeleton {...params} />;
		}
		return <WrappedComponent {...rest} />;
	};

	Wrapper.propTypes = {
		loading: PropTypes.bool,
	};

	return Wrapper;
}

export default loadable;
