import React from 'react';
import PropTypes from 'prop-types';
import ErrorPanel from '../ErrorPanel';


function ErrorFeedBack(props) {
	const style = {
		'overflow-y': 'auto',
		height: '100vh',
	};
	if (props.errors.length === 1) {
		style.marginTop = 200;
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-offset-3 col-md-6" style={style}>
					{props.errors.map(error => (
						<ErrorPanel key={error} {...error} />
					))}
				</div>
			</div>
		</div>
	);
}

ErrorFeedBack.displayName = 'ErrorFeedBack';
ErrorFeedBack.propTypes = {
	errors: PropTypes.arrayOf(PropTypes.object),
};
ErrorFeedBack.defaultProps = {
	errors: [],
};
export default ErrorFeedBack;
