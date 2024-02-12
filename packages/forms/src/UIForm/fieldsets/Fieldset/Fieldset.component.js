import classnames from 'classnames';
import PropTypes from 'prop-types';

import { StackVertical } from '@talend/design-system';

import shouldRender from '../../utils/condition';
import Widget from '../../Widget';

export default function Fieldset(props) {
	const { schema, ...restProps } = props;
	const { title, items, options } = schema;

	const widgets = items
		.filter(itemSchema => shouldRender(itemSchema.condition, props.properties, itemSchema.key))
		.map((itemSchema, index) => <Widget {...restProps} key={index} schema={itemSchema} />);

	return widgets.length ? (
		<fieldset>
			{title && (
				<legend className={classnames({ 'sr-only': options && options.hideTitle })}>{title}</legend>
			)}
			<StackVertical gap="S" align="stretch">
				{widgets}
			</StackVertical>
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
		...Widget.propTypes,
	};
}
