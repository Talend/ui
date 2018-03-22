import React from 'react';

function AppLoader() {
	return (
		<div className="tc-app-loader-container" aria-atomic="true" aria-busy="true">
			<div className="tc-app-loader">
				<div className="tc-app-loader-icon" />
			</div>
		</div>
	);
}

export default AppLoader;
