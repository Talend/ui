import React from 'react';
import theme from '../UIForm.module.scss';

export default function DefaultFormTemplate({ widgetsRenderer, buttonsRenderer, children }) {
	return [
		<div key="form-widgets" className={theme['form-content']}>
			{widgetsRenderer()}
		</div>,
		children,
		buttonsRenderer(),
	];
}
