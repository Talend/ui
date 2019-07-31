import React from 'react';
import PropTypes from 'prop-types';
import ErrorPanel from '../ErrorPanel';
import onError from '../../onError';

function ErrorFeedBack(props) {
	const [errors, setErrors] = React.useState(
		onError.getErrors()
	);
	React.useEffect(() => {
		onError.subscribe(err => setErrors(err));
	}, []);

	const content = errors.map(error => (
		<ErrorPanel key={error} {...error} />
	));
	if (!props.full) {
		return (
			<React.Fragment>
				{content}
			</React.Fragment>
		);
	}
	const style = {
		'overflow-y': 'auto',
		height: '100vh',
	};
	if (errors.length === 1) {
		style.marginTop = 200;
	}
	const className = `container ${process.env.NODE_ENV === 'development' && 'bsod'}`;
	return (
		<div className={className}>
			<div className="row">
				<div className="col-md-offset-3 col-md-6" style={style}>
					<h1>Error occured</h1>
					{content}
				</div>
			</div>
			<style>{`
				.bsod {
					background: linear-gradient(90deg, #17486E, #107BB7, #82BD41);
					color: white;
				}
				.bsod h1 {
					color: white;
				}
				`}</style>
		</div>
	);
}

ErrorFeedBack.displayName = 'ErrorFeedBack';
ErrorFeedBack.propTypes = {
	full: PropTypes.bool,
};
ErrorFeedBack.defaultProps = {
	errors: [],
};
export default ErrorFeedBack;
