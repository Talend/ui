import React from 'react';
import PropTypes from 'prop-types';
import Widget from '../../../Widget';

export default function FieldsetTextMode(props) {
	const { schema, ...restProps } = props;
	const { title, items } = schema;

	const definitionList = (
		<dl>
			{items.map((itemSchema, index) => (
				<Widget {...restProps} key={index} schema={itemSchema} />
			))}
		</dl>
	);

	if (title) {
		return (
			<div className="form-group">
				<dt className="tf-title-text-mode">{title}</dt>
				<dd>{definitionList}</dd>
			</div>
		);
	}
	return definitionList;
}

if (process.env.NODE_ENV !== 'production') {
	FieldsetTextMode.propTypes = {
		schema: PropTypes.shape({
			title: PropTypes.string,
			items: PropTypes.array.isRequired,
		}).isRequired,
	};
}
