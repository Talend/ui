import React from 'react';
import PropTypes from 'prop-types';
import { UIForm } from './UIForm';
import Form from './Form';
import FormSkeleton from './FormSkeleton';

export default function FormSwitcher(props) {
	if (props.loading) {
		return <FormSkeleton />;
	}
	if (props.data && Array.isArray(props.data.uiSchema)) {
		return <UIForm {...props} />;
	}
	return <Form {...props} />;
}

FormSwitcher.propTypes = {
	loading: PropTypes.bool,
	data: PropTypes.shape({
		uiSchema: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	}),
};
