import React from 'react';
import PropTypes from 'prop-types';
import { UIForm } from './UIForm';
import FormSkeleton from './FormSkeleton';

let Form = () => (
	<div className="alert alert-danger">
		Error: You should compile using FORM_MOZ to use deprecated Form
	</div>
);

if (process.env.FORM_MOZ) {
	// eslint-disable-next-line global-require
	Form = require('../deprecated/Form');
	// eslint-disable-next-line no-console
	console.warn('FORM_MOZ is deprecated and will be removed in the next major release');
}

export default function FormSwitcher(props) {
	if (props.loading) {
		return <FormSkeleton {...props} />;
	}
	if (props.data && !Array.isArray(props.data.uiSchema)) {
		return <Form {...props} />;
	}
	return <UIForm {...props} />;
}

FormSwitcher.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.shape({
		uiSchema: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	}),
};
