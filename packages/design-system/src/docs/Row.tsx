import React from 'react';

export default function Row({
	children,
	centered,
	...props
}: React.HTMLAttributes<HTMLDivElement> & { centered: 'all' | 'vertical' | 'horizontal' }) {
	return (
		<div
			{...props}
			style={{
				display: 'flex',
				alignItems: centered === 'all' || centered === 'vertical' ? 'center' : 'normal',
				justifyContent: centered === 'all' || centered === 'horizontal' ? 'center' : 'normal',
				marginBottom: '2rem',
			}}
		>
			{children}
		</div>
	);
}
