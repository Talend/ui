import React from 'react';
import { Alert } from 'react-cmf-bootstrap';

function ExampleAlert(props) {
	return (
		<div>
			<h1>Examples of Alert</h1>
			<Alert bsStyle="success">
				success !
			</Alert>
			<Alert bsStyle="warning">
				warning !
			</Alert>
			<Alert bsStyle="info">
				info !
			</Alert>
			<Alert bsStyle="danger">
				danger !
			</Alert>
		</div>
	);
}

export default ExampleAlert;
