import React from 'react';

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
