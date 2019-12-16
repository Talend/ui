import React from 'react';
import PropTypes from 'prop-types';
import Widget from '../../Widget.component';
import Fieldset from '../../../fieldsets/Fieldset';

export default function SchemaFieldset({ schema, ...restProps }) {
	const { title, items, options = {} } = schema;
	const { hideTitle } = options;
	return (
		<Fieldset legend={title} hideLegend={hideTitle}>
			{items.map((itemSchema, index) => (
				<Widget {...restProps} key={index} schema={itemSchema} />
			))}
		</Fieldset>
	);
}

if (process.env.NODE_ENV !== 'production') {
	SchemaFieldset.propTypes = {
		schema: PropTypes.shape({
			title: PropTypes.string,
			items: PropTypes.array,
			options: PropTypes.shape({ hideTitle: PropTypes.bool }),
		}),
	};
}
