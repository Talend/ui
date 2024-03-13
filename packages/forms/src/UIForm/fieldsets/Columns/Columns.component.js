import PropTypes from 'prop-types';

import { Form, StackItem } from '@talend/design-system';

import Widget from '../../Widget';

export default function Columns(props) {
	const { schema, ...restProps } = props;

	return (
		<Form.Fieldset legend={schema.title}>
			<Form.Row data-form-row isStretched>
				{schema.items.map((colSchema, index) => (
					<StackItem grow isFullWidth key={index}>
						<Widget {...restProps} key={index} schema={colSchema} />
					</StackItem>
				))}
			</Form.Row>
		</Form.Fieldset>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Columns.propTypes = {
		schema: PropTypes.shape({
			items: PropTypes.array.isRequired,
			title: PropTypes.string,
		}).isRequired,
		...Widget.propTypes,
	};
}
