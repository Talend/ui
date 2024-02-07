import PropTypes from 'prop-types';

function FieldTemplate(props) {
	return (
		<div className={props.className}>
			<dt>
				<label htmlFor={props.id}>{props.label}</label>
			</dt>
			<dd id={props.id}>{props.children}</dd>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	FieldTemplate.propTypes = {
		children: PropTypes.node,
		className: PropTypes.string,
		id: PropTypes.string,
		label: PropTypes.string,
	};
}
FieldTemplate.displayName = 'FieldTemplate';

export default FieldTemplate;
