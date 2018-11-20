import React from 'react';
import PropTypes from 'prop-types';

/**
 * reload is an event handler. It will reload the current page
 */
function reload() {
	location.reload(true);
}

function ErrorPanel(props) {
	let currentErrorStatus;
	if (props.reported) {
		currentErrorStatus = `Has been reported under ${props.response.id}`;
	} else {
		currentErrorStatus = props.reason;
	}
	return (
		<div className="panel panel-default">
			<div className="panel-heading">{props.title}</div>
			<div className="panel-body">
				<p className="text-danger">
					{props.error.name}: {props.error.message}
				</p>
				<p>Report status: {currentErrorStatus}</p>
				<div className="btn-group" style={{ marginTop: 20 }}>
					<button className="btn btn-default btn-sm" onClick={reload}>
						Refresh
					</button>
					<button className="btn btn-default btn-sm" onClick={props.onClickDetails}>
						Show error details
					</button>
				</div>
				<pre className={props.hidden ? 'hidden' : ''}>{props.error.stack}</pre>
			</div>
		</div>
	);
}

ErrorPanel.displayName = 'ErrorPanel';
ErrorPanel.propTypes = {
	title: PropTypes.string,
	reported: PropTypes.bool,
	hidden: PropTypes.bool,
	onClickDetails: PropTypes.func,
	reason: PropTypes.string,
	response: PropTypes.shape({ id: PropTypes.node }),
	error: PropTypes.shape({
		name: PropTypes.string,
		message: PropTypes.string,
		stack: PropTypes.string,
	}).isRequired,
};
ErrorPanel.defaultProps = {
	reported: false,
	reason: 'Waiting for report response',
	title: 'Whoops, an error occured',
	response: {},
	error: {},
	hidden: true,
};

export default ErrorPanel;
