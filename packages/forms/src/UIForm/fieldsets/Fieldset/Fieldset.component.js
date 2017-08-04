import React, { PropTypes } from 'react';
import Widget from '../../Widget';

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

if (process.env.NODE_ENV !== 'production') {
	Fieldset.propTypes = {
		schema: PropTypes.shape({
			title: PropTypes.string,
			items: PropTypes.array.isRequired,
		}).isRequired,
	};
}
