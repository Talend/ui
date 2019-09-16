import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import onError from '../../onError';

/**
 * reload is an event handler. It will reload the current page
 */
function reload() {
	location.reload(true);
}

function ErrorPanel(props) {
	const [url, setURL] = React.useState();
	useEffect(() => {
		setURL(onError.createObjectURL(props.error));
		return () => {
			onError.revokeObjectURL(url);
		};
	}, [props.error]);
	let currentErrorStatus;
	if (props.reported) {
		currentErrorStatus = `Has been reported under ${props.response.id}`;
	} else {
		currentErrorStatus = get(props.reason, 'message');
	}
	return (
		<div>
			<p className="error-title">
				{props.error.name}: {props.error.message}
			</p>
			<React.Fragment>
				{onError.hasReportURL() ? (
					<p>
						The error report has been sent.
						<br />
						Report status: {currentErrorStatus}
					</p>
				) : null}
				<p>From here you have two choices:</p>
				<p>1. Refresh the app and retry</p>
				<p>2. Download the details and then contact the support</p>
			</React.Fragment>
			<button
				className="btn btn-danger btn-inverse"
				onClick={reload}
				data-feature="refresh-on-error"
				style={{ margin: 20 }}
			>
				Refresh
			</button>
			<a
				className="btn btn-primary btn-inverse"
				href={url}
				download="report.json"
				data-feature="download-on-error-details"
			>
				Download details
			</a>
		</div>
	);
}

ErrorPanel.displayName = 'ErrorPanel';
ErrorPanel.propTypes = {
	reported: PropTypes.bool,
	reason: PropTypes.shape({ message: PropTypes.string }),
	response: PropTypes.shape({ id: PropTypes.node }),
	error: PropTypes.shape({
		name: PropTypes.string,
		message: PropTypes.string,
		stack: PropTypes.string,
	}).isRequired,
};
ErrorPanel.defaultProps = {
	reported: false,
	reason: { message: 'Waiting for report response' },
	response: {},
	error: {},
	hidden: true,
};

export default ErrorPanel;
