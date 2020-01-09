import React from 'react';
import PropTypes from 'prop-types';

import theme from './SchemaForm.scss';

export default function TemplateForm({ children }) {
	return (
		<dl key="definitions" className={theme['form-content']}>
			{children}
		</dl>
	);
}

if (process.env.NODE_ENV !== 'production') {
	TemplateForm.propTypes = {
		children: PropTypes.node,
	};
}
