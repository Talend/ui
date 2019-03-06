import React from 'react';
import PropTypes from 'prop-types';
import { UIForm } from './UIForm';
import FormSkeleton from './FormSkeleton';

export default function FormSwitcher(props) {
	if (props.loading) {
		return <FormSkeleton />;
	}
	return <UIForm {...props} />;
}

FormSwitcher.propTypes = {
	loading: PropTypes.bool,
};
