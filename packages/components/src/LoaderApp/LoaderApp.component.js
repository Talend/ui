import React from 'react';

function LoaderApp() {
	return (
		<div className="tc-loader-app-container" aria-atomic="true" aria-busy="true">
			<div className="tc-loader-app">
				<div className="tc-loader-app-icon" />
			</div>
		</div>
	);
}

export default LoaderApp;
