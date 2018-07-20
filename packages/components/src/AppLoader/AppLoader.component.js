import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../constants';
import getDefaultT from '../translate';

// TODO role=status

export function AppLoaderComponent({ t }) {
	return (
		<div
			className="tc-app-loader-container"
			aria-atomic="true"
			aria-busy="true"
			aria-label={t('APP_LOADER_LOADING', { defaultValue: 'Loading application' })}
		>
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
AppLoaderComponent.propTypes = {
	t: PropTypes.func.isRequired,
};
AppLoaderComponent.defaultProps = {
	t: getDefaultT(),
};

export default translate(I18N_DOMAIN_COMPONENTS)(AppLoaderComponent);
