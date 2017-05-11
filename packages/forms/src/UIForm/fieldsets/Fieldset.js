import React, { PropTypes } from 'react';
import Widget from '../Widget';

export default function Fieldset(props) {
	const { schema, ...restProps } = props;
	const { title, items } = schema;

	return (
		<fieldset className="form-group">
			{title && (<legend>{title}</legend>)}
			{items.map((itemSchema, index) => (
				<Widget
					{...restProps}
					key={index}
					schema={itemSchema}
				/>
			))}
		</fieldset>
	);
}

Fieldset.propTypes = {
	schema: PropTypes.shape({
		items: PropTypes.array.isRequired,
		title: PropTypes.string,
	}).isRequired,
};
