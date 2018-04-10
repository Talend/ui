import React from 'react';

function AppLoader() {
	return (
		<div className="tc-app-loader-container" aria-atomic="true" aria-busy="true">
			<div className="tc-app-loader">
				<svg focusable="false" className="tc-app-loader-animate" viewBox="0 0 50 50">
					<circle className="tc-app-loader-path" r="20" cx="25" cy="25" fill="none" />
				</svg>
				<div className="tc-app-loader-icon" />
			</div>
		</div>
	);
}

export default AppLoader;
