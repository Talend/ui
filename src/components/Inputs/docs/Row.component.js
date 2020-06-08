import React from 'react';
import PropTypes from 'prop-types';

export default function Row({ children, centered, ...props }) {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: centered === 'all' || centered === 'vertical' ? 'center' : 'normal',
				justifyContent: centered === 'all' || centered === 'horizontal' ? 'center' : 'normal',
				marginBottom: '2rem',
			}}
			{...props}
		>
			{children}
		</div>
	);
}

Row.propTypes = {
	children: PropTypes.node,
	centered: PropTypes.string,
};
