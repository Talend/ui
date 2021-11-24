import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Widget from '../../Widget';
import shouldRender from '../../utils/condition';

export default function Fieldset(props) {
	const { schema, ...restProps } = props;
	const { title, items, options } = schema;

	const widgets = items
		.filter((itemSchema, index) => shouldRender(itemSchema.condition, props.properties, index))
		.map((itemSchema, index) => <Widget {...restProps} key={index} schema={itemSchema} />);

	return widgets.length ? (
		<fieldset className="form-group">
			{title && (
				<legend className={classnames({ 'sr-only': options && options.hideTitle })}>{title}</legend>
			)}
			{widgets}
		</fieldset>
	) : null;
}

if (process.env.NODE_ENV !== 'production') {
	Fieldset.propTypes = {
		schema: PropTypes.shape({
			title: PropTypes.string,
			items: PropTypes.array.isRequired,
			options: PropTypes.shape({
				hideTitle: PropTypes.bool,
			}),
		}).isRequired,
		properties: PropTypes.object,
	};
}
