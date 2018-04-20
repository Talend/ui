import React from 'react';

function AppLoader() {
	return (
		<div className="tc-app-loader-container" aria-atomic="true" aria-busy="true">
			<div className="tc-app-loader-icon">
				<div className="tc-app-loader">
					<div className="spinner-wrapper">
						<div className="spinner-left">
							<div className="circle" />
						</div>
						<div className="spinner-right">
							<div className="circle" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AppLoader;
