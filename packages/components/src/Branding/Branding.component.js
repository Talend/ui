import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

function Branding(props) {
	return (
		<Helmet>
			<style>
				{`
					.branding-primary {
						color: ${props.primaryColor};
						background-color: ${props.primaryComplementaryColor};
					}
					.branding-primary .btn-link {
						color: ${props.primaryColor};
					}
					.branding-primary .btn-link:hover {
						color: ${props.primaryHoverColor};
						background-color: ${props.primaryHoverComplementaryColor};
					}

					.branding-primary.branding-reverse {
						color: ${props.primaryComplementaryColor};
						background-color: ${props.primaryColor};
					}
					.branding-primary.branding-reverse .btn-link {
						color: ${props.primaryComplementaryColor};
					}
					.branding-primary.branding-reverse .btn-link:hover {
						color: ${props.primaryHoverComplementaryColor};
						background-color: ${props.primaryHoverColor};
					}
				`}
			</style>
		</Helmet>
	);
}

Branding.propTypes = {
	primaryColor: PropTypes.string.isRequired,
	primaryComplementaryColor: PropTypes.string,
	primaryHoverColor: PropTypes.string.isRequired,
	primaryHoverComplementaryColor: PropTypes.string,
};
Branding.defaultProps = {
	primaryComplementaryColor: 'white',
};

export default Branding;
