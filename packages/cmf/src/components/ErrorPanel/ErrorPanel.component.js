import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import onError from '../../onError';

/**
 * reload is an event handler. It will reload the current page
 */
function reload() {
	location.reload(true);
}

function ErrorPanel({ error = {} }) {
	const [url, setURL] = useState();
	useEffect(() => {
		const newUrl = onError.createObjectURL(error);
		setURL(newUrl);
		return () => {
			onError.revokeObjectURL(newUrl);
		};
	}, [error]);
	const HAS_REPORT = onError.hasReportFeature();
	return (
		<div>
			<p className="error-title">
				{error.name}: {error.message}
			</p>
			{HAS_REPORT && <p>The error report has been sent.</p>}
			<p>From here you can either refresh or contact the support.</p>
			<button
				className="btn btn-danger btn-inverse"
				onClick={reload}
				data-feature="refresh-on-error"
				style={{ margin: 20 }}
			>
				Refresh
			</button>
			{!HAS_REPORT && (
				<a
					className="btn btn-primary btn-inverse"
					href={url}
					download="report.json"
					data-feature="download-on-error-details"
				>
					Download details
				</a>
			)}
		</div>
	);
}

ErrorPanel.displayName = 'ErrorPanel';
ErrorPanel.propTypes = {
	error: PropTypes.shape({
		name: PropTypes.string,
		message: PropTypes.string,
		stack: PropTypes.string,
	}).isRequired,
};

export default ErrorPanel;
