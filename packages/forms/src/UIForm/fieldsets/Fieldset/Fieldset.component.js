import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';
import { VisuallyHidden } from '@talend/design-system';

import shouldRender from '../../utils/condition';
import Widget from '../../Widget';

export default function Fieldset(props) {
	const { schema, ...restProps } = props;
	const { title, items, options } = schema;

	const widgets = items
		.filter(itemSchema => shouldRender(itemSchema.condition, props.properties, itemSchema.key))
		.map((itemSchema, index) => <Widget {...restProps} key={index} schema={itemSchema} />);

	return widgets.length ? (
		<Form.Fieldset legend={options?.hideTitle ? <VisuallyHidden>{title}</VisuallyHidden> : title}>
			{widgets}
		</Form.Fieldset>
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
		...Widget.propTypes,
	};
}
