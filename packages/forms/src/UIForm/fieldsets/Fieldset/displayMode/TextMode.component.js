import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';

import Widget from '../../../Widget';

export default function FieldsetTextMode(props) {
	const { schema, ...restProps } = props;
	const { title, items } = schema;

	return (
		<Form.Fieldset legend={title}>
			{items.map((itemSchema, index) => (
				<Widget {...restProps} key={index} schema={itemSchema} />
			))}
		</Form.Fieldset>
	);
}

if (process.env.NODE_ENV !== 'production') {
	FieldsetTextMode.propTypes = {
		schema: PropTypes.shape({
			title: PropTypes.string,
			items: PropTypes.array.isRequired,
		}).isRequired,
	};
}
