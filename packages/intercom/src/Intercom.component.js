import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import IntercomService from './service';

export default function Intercom({ id, config }) {
	useEffect(
		() => {
			IntercomService.boot(id, config);
			return IntercomService.shutdown();
		},
		[config],
	);

	return (
		<button id={id} className="talend-intercom">
			<svg width="2.4rem" height="2.4rem" id="bubbles">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
					<path d="M4 0v8h6l4 4V8h2V0z" />
					<path d="M3 9V3H0v9h2v4l4-4h4V9z" />
				</svg>
			</svg>
		</button>
	);
}

Intercom.propTypes = {
	id: PropTypes.string.isRequired,
	config: PropTypes.shape({
		app_id: PropTypes.string.isRequired,
		name: PropTypes.string,
		email: PropTypes.string,
		company_name: PropTypes.string,
	}).isRequired,
};
