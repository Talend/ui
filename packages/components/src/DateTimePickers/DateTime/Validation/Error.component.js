import React from 'react';

import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Error({ hidden, errors, id }) {
	const classNames = classnames({ 'sr-only': hidden });
	return (
		<div id={id} className={classNames}>
			{errors.map((error, index) => (
				<span key={index}>{error.message}</span>
			))}
		</div>
	);
}

Error.propTypes = {
	id: PropTypes.string,
	errors: PropTypes.array,
	hidden: PropTypes.bool,
};
