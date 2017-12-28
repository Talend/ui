import React from 'react';
import PropTypes from 'prop-types';

export const defaultLogo = {
	// source: 'https://tctechcrunch2011.files.wordpress.com/2010/07/github-logo.png',
	// width: 45,

	source: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/My_Little_Pony_G4_logo.svg/669px-My_Little_Pony_G4_logo.svg.png',
	width: 53,

	// source: 'http://swagger.io/wp-content/uploads/2015/05/Restlet-whiteBg_high_res-800x206.png',
	// width: 180,
};

export function LogoForm({ logo, onChange }) {
	return (
		<form>
			<div className="form-group">
				<div className="form-group">
					<textarea id={'logo-src'} className="form-control" onChange={event => onChange('source', event.target.value)}>
						{logo.source}
					</textarea>
					<label htmlFor={'logo-src'} className="control-label">Source</label>
				</div>
				<div className="form-group">
					<label htmlFor={'logo-width'} className="control-label">Width: {logo.width}px</label>
					<input id={'logo-width'} type="range" min="10" max="300" value={logo.width} onChange={event => onChange('width', event.target.value)} />
				</div>
			</div>
		</form>
	);
}
LogoForm.propTypes = {
	logo: PropTypes.shape({
		source: PropTypes.string,
		width: PropTypes.number,
	}),
	onChange: PropTypes.func.isRequired,
};
