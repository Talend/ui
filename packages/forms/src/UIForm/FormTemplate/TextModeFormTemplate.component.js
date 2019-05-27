import React from 'react';
import theme from '../UIForm.scss';

export default function TextModeFormTemplate({ renderWidgets, children }) {
	return (
		<React.Fragment>
			<dl key="definitions" className={theme['form-content']}>
				{renderWidgets()}
			</dl>
			{children}
		</React.Fragment>
	);
}
