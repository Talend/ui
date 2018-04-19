import React from 'react';

function AppLoader() {
	return (
		<div className="tc-app-loader-container" aria-atomic="true" aria-busy="true">
			<div className="tc-app-loader" >
				<div className="spinner-wrapper">
          <div className="spinner-left"></div>
          <div className="spinner-right"></div>
				</div>
			</div>
		</div>
	);
}

export default AppLoader;
