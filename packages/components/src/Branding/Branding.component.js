import React from 'react';
import PropTypes from 'prop-types';

function Branding(props) {
	return (
		<style>{`
			.branding-primary {
				color: ${props.primaryColor};
				background-color: ${props.primaryComplementaryColor};
			}
			.branding-primary .btn-link {
				color: ${props.primaryColor};
			}

			.branding-primary.branding-reverse {
				color: ${props.primaryComplementaryColor};
				background-color: ${props.primaryColor};
			}
			.branding-primary .btn-link {
				color: ${props.primaryComplementaryColor};
			}
		`}</style>
	);
}

Branding.propTypes = {
	primaryColor: PropTypes.string.isRequired,
	primaryComplementaryColor: PropTypes.string,
};
Branding.defaultProps = {
	primaryComplementaryColor: 'white',
};

export default Branding;
