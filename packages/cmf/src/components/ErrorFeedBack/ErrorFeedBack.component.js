import React from 'react';
import PropTypes from 'prop-types';
import ErrorPanel from '../ErrorPanel';

function ErrorFeedBack(props) {
	const content = props.errors.map(error => <ErrorPanel key={error} error={error} />);
	if (!props.fullPage) {
		return <React.Fragment>{content}</React.Fragment>;
	}
	const style = {
		overflowY: 'auto',
		height: '100vh',
	};
	if (props.errors.length === 1) {
		style.marginTop = 200;
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-offset-3 col-md-6" style={style}>
					<h1>An error occurred</h1>
					{content}
				</div>
			</div>
		</div>
	);
}

ErrorFeedBack.displayName = 'ErrorFeedBack';
ErrorFeedBack.propTypes = {
	fullPage: PropTypes.bool,
	errors: PropTypes.array,
};
ErrorFeedBack.defaultProps = {
	errors: [],
};
export default ErrorFeedBack;
