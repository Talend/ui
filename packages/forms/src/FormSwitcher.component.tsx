import React from 'react';

import FormSkeleton from './FormSkeleton.component';
import { UIForm } from './UIForm';
import { ActionProps, DisplayMode, FormDefinition } from './types';

interface FormSwitcherProps {
	loading?: boolean;
	actions?: ActionProps[];
	displayMode?: DisplayMode;
	data?: FormDefinition;
}

export default function FormSwitcher(props: FormSwitcherProps) {
	if (props.loading) {
		return <FormSkeleton actions={props.actions} displayMode={props.displayMode} />;
	}
	return <UIForm {...props} />;
}
