import React from 'react';
import theme from '../UIForm.scss';

export default function DefaultFormTemplate({
	formRef,
	formProps,
	renderWidgets,
	renderButtons,
	children,
}) {
	return (
		<form ref={formRef} {...formProps}>
			<div key="form-widgets" className={theme['form-content']}>
				{renderWidgets()}
			</div>
			{children}
			{renderButtons()}
		</form>
	);
}
