import React from 'react';
import PropTypes from 'prop-types';
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
DefaultFormTemplate.propTypes = {
	formRef: PropTypes.any,
	formProps: PropTypes.object,
	renderWidgets: PropTypes.func.isRequired,
	renderButtons: PropTypes.func.isRequired,
	children: PropTypes.node,
};
