import React from 'react';

export default function Col({
	header,
	aside,
	main,
	footer,
	hasScreenHeight,
	hasOverflow = true,
	...rest
}) {
	const Main = () => (
		<main
			className={`layout__main flex flex-auto items-center content-center ${
				(!hasScreenHeight || !hasOverflow) && 'flex-grow-1 min-h-0 overflow-auto'
			}`}
		>
			{main}
		</main>
	);
	return (
		<div
			className={`layout flex flex-col ${hasScreenHeight && 'h-screen'} min-h-full ${
				(!hasScreenHeight || !hasOverflow) && 'overflow-hidden'
			}`}
			{...rest}
		>
			{header && <header className="layout__header flex">{header}</header>}
			{aside ? (
				<div className={`layout__row flex flex-auto ${!hasOverflow && 'overflow-hidden'}`}>
					<aside className={`layout__aside flex flex-shrink-0`}>{aside}</aside>
					<Main />
				</div>
			) : (
				<Main />
			)}
			{footer && <footer className="layout__footer flex">{footer}</footer>}
		</div>
	);
}
