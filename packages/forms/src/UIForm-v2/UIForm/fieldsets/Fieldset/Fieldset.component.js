import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Widget from '../../Widget';

export default function Fieldset(props) {
	const { schema, ...restProps } = props;
	const { title, items, options } = schema;

	return (
		<fieldset className="form-group">
			{title && (
				<legend className={classnames({ 'sr-only': options && options.hideTitle })}>{title}</legend>
			)}
			{items.map((itemSchema, index) => (
				<Widget {...restProps} key={index} schema={itemSchema} />
			))}
		</fieldset>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Fieldset.propTypes = {
		schema: PropTypes.shape({
			title: PropTypes.string,
			items: PropTypes.array.isRequired,
		}).isRequired,
	};
}
