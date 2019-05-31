import React from 'react';
import PropTypes from 'prop-types';
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
TextModeFormTemplate.propTypes = {
	renderWidgets: PropTypes.func.isRequired,
	children: PropTypes.node,
};
