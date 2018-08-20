import React from 'react';
import theme from '../UIForm.scss';

export default function TextModeFormTemplate({ widgetsRenderer, children }) {
	return [<dl className={theme['form-content']}>{widgetsRenderer()}</dl>, children];
}
