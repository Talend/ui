import React from 'react';

import FormSkeleton from './FormSkeleton';
import { UIForm } from './UIForm';
import { ActionProps, DisplayMode, FormDefinition } from './types';

type FormSwitcherProps = {
	loading?: boolean;
	actions?: ActionProps[];
	displayMode?: DisplayMode;
	data?: FormDefinition;
	// We'll be typing this later on
} & any;

export default function FormSwitcher(props: FormSwitcherProps) {
	if (props.loading) {
		return <FormSkeleton actions={props.actions} displayMode={props.displayMode} />;
	}
	return <UIForm {...props} />;
}
