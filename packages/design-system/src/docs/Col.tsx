import React from 'react';

export default function Col({
	children,
	fixed,
	centered,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	fixed: boolean;
	centered: 'all' | 'vertical' | 'horizontal';
}) {
	return (
		<div
			{...props}
			style={{
				flexBasis: 0,
				flexGrow: fixed ? 0 : 1,
				flexShrink: fixed ? 0 : 1,
				display: 'flex',
				flexWrap: 'nowrap',
				alignItems: centered === 'all' || centered === 'vertical' ? 'center' : 'normal',
				justifyContent: centered === 'all' || centered === 'horizontal' ? 'center' : 'normal',
			}}
		>
			{children}
		</div>
	);
}
