import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Widget from '../../Widget';
import { UIFormContext } from '../../hooks/useUIForm';
import { getArrayElementSchema } from '../../utils/array';
import { shiftArrayErrorsKeys } from '../../utils/validation';

function getRange(previousIndex, nextIndex) {
	if (previousIndex < nextIndex) {
		return {
			minIndex: previousIndex,
			maxIndex: nextIndex + 1,
		};
	}

	return {
		minIndex: nextIndex,
		maxIndex: previousIndex + 1,
	};
}

export default function ArrayWidget(props) {
	const { id, schema, value } = props;
	const { displayMode, onChange, onFinish, templates, widgets } = useContext(UIFormContext);

	const canReorder = schema.reorder !== false;
	const templateId = displayMode ? `array_${displayMode}` : 'array';
	const ArrayTemplate = templates[templateId];

	const itemWidget = widgets[schema.itemWidget];
	const isCloseable = itemWidget && itemWidget.isCloseable;

	function onAdd(event) {
		const defaultValue = schema.schema.items.type === 'object' ? {} : '';

		let currentValue = value;
		if (isCloseable) {
			currentValue = currentValue.map(item => ({ ...item, isClosed: true }));
		}
		const newValue = currentValue.concat(defaultValue);

		const payload = { schema, value: newValue };
		onChange(event, payload);
		onFinish(event, payload);
	}

	function onReorder(event, { previousIndex, nextIndex }) {
		const newValue = value.slice(0);
		const [item] = newValue.splice(previousIndex, 1);
		newValue.splice(nextIndex, 0, item);

		function widgetChangeErrors(errors) {
			// determine the range [min, max[ of items to shift, with the pace
			const { minIndex, maxIndex } = getRange(previousIndex, nextIndex);
			const switchPace = Math.sign(previousIndex - nextIndex);

			// shift the items errors between the previous and next position
			// set the item-we-move errors indexes
			return shiftArrayErrorsKeys(errors, {
				arrayKey: schema.key,
				minIndex,
				maxIndex,
				getNextIndex(index) {
					return index === previousIndex ? nextIndex : index + switchPace;
				},
			});
		}

		const payload = { schema, value: newValue };
		onChange(event, payload);
		onFinish(event, payload, { widgetChangeErrors });
	}

	function onRemove(event, indexToRemove) {
		const newValue = value.slice(0);
		newValue.splice(indexToRemove, 1);

		// shift up the items errors after the one we remove
		function widgetChangeErrors(errors) {
			return shiftArrayErrorsKeys(errors, {
				arrayKey: schema.key,
				minIndex: indexToRemove,
				shouldRemoveIndex: index => index === indexToRemove,
				getNextIndex: index => index - 1,
			});
		}

		const payload = { schema, value: newValue };
		onChange(event, payload);
		onFinish(event, payload, { widgetChangeErrors });
	}

	function renderItem(index, extraProps) {
		return (
			<Widget
				{...props}
				{...extraProps}
				disabled={schema.disabled}
				id={id && `${id}-${index}`}
				schema={getArrayElementSchema(schema, index)}
				value={value[index]}
			/>
		);
	}

	return (
		<ArrayTemplate
			{...props}
			canReorder={canReorder}
			onAdd={onAdd}
			onReorder={onReorder}
			onRemove={onRemove}
			renderItem={renderItem}
			isCloseable={isCloseable}
		/>
	);
}

ArrayWidget.defaultProps = {
	value: [],
};

if (process.env.NODE_ENV !== 'production') {
	ArrayWidget.propTypes = {
		id: PropTypes.string,
		schema: PropTypes.object.isRequired,
		value: PropTypes.array.isRequired,
	};
}
