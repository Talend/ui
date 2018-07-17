import React from 'react';
import PropTypes from 'prop-types';
import { UIForm } from './UIForm';
import Form from './Form';
import FormSkeleton from './FormSkeleton';

export default function FormSwitcher(props) {
	if (props.loading) {
		return <FormSkeleton />;
	}
	if (Array.isArray(props.uiSchema)) {
		return <UIForm {...props} />;
	}
	return <Form {...props} />;
}

FormSwitcher.propTypes = {
	loading: PropTypes.bool,
	uiSchema: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.object,
	]),
};
