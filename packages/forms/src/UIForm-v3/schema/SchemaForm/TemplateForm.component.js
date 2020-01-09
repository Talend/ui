import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './SchemaForm.scss';

export default function TemplateForm({ children, handleSubmit, onSubmit, ...restProps }) {
	return (
		<form
			{...restProps}
			onSubmit={handleSubmit((payload, event) => onSubmit(event, payload))}
			noValidate
			className={classNames('tf-uiform', theme.uiform, restProps.className)}
		>
			{children}
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TemplateForm.propTypes = {
		children: PropTypes.node,
		handleSubmit: PropTypes.func,
		onSubmit: PropTypes.func,
	};
}
