import React from 'react';
import theme from '../UIForm.scss';

export default function DefaultFormTemplate({ widgetsRenderer, buttonsRenderer, children }) {
	return [
		<div className={theme['form-content']}>{widgetsRenderer()}</div>,
		children,
		buttonsRenderer(),
	];
}
