import PropTypes from 'prop-types';
import React from 'react';
import { head, get } from 'lodash';
import Widget from '../../Widget';
import { shiftArrayErrorsKeys } from '../../utils/validation';
import defaultTemplates from '../../utils/templates';
import defaultWidgets from '../../utils/widgets';
import { getArrayElementSchema } from '../../utils/array';

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

export default class ArrayWidget extends React.Component {
	constructor(props) {
		super(props);

		this.onAdd = this.onAdd.bind(this);
		this.onRemove = this.onRemove.bind(this);
		this.onReorder = this.onReorder.bind(this);
		this.renderItem = this.renderItem.bind(this);
	}

	onAdd(event) {
		const arrayMergedSchema = this.props.schema;
		const { items, schema } = arrayMergedSchema;
		const getDefaultValue = schema.items.type === 'object' ? {} : '';
		const hasOneItem = items.length === 1;
		const itemsEnum = get(schema, 'items.enum');
		const isSingleSelectItem = hasOneItem && head(items).type === 'select' && head(itemsEnum);

		const defaultValue = isSingleSelectItem ? head(itemsEnum) : getDefaultValue;

		let currentValue = this.props.value;
		if (this.isCloseable()) {
			currentValue = currentValue.map(item => ({ ...item, isClosed: true }));
		}
		const value = currentValue.concat(defaultValue);

		const payload = { schema: arrayMergedSchema, value };

		this.props.onChange(event, payload);
		this.props.onFinish(event, payload);
	}

	onRemove(event, indexToRemove) {
		const schema = this.props.schema;
		const value = this.props.value.slice(0);
		value.splice(indexToRemove, 1);

		// shift up the items errors after the one we remove
		function widgetChangeErrors(errors) {
			return shiftArrayErrorsKeys(errors, {
				arrayKey: schema.key,
				minIndex: indexToRemove,
				shouldRemoveIndex: index => index === indexToRemove,
				getNextIndex: index => index - 1,
			});
		}

		const payload = { schema, value };
		this.props.onChange(event, payload);
		this.props.onFinish(event, payload, { widgetChangeErrors });
	}

	onReorder(event, { previousIndex, nextIndex }) {
		const schema = this.props.schema;
		const value = this.props.value.slice(0);
		const [item] = value.splice(previousIndex, 1);
		value.splice(nextIndex, 0, item);

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

		const payload = { schema, value };
		this.props.onChange(event, payload);
		this.props.onFinish(event, payload, { widgetChangeErrors });
	}

	getArrayTemplate() {
		const baseTemplateId = 'array';
		const templateId = `${baseTemplateId}_${this.props.displayMode}`;
		const ArrayTemplate = this.props.templates[templateId] || defaultTemplates[templateId];
		if (!ArrayTemplate) {
			return this.props.templates[baseTemplateId] || defaultTemplates[baseTemplateId];
		}
		return ArrayTemplate;
	}

	isCloseable() {
		const widgetId = this.props.schema.itemWidget;
		const itemWidget = this.props.widgets[widgetId] || defaultWidgets[widgetId];
		if (!itemWidget) {
			return false;
		}
		return itemWidget.isCloseable === true;
	}

	renderItem(index, extraProps) {
		return (
			<Widget
				{...this.props}
				{...extraProps}
				disabled={this.props.schema.disabled}
				id={this.props.id && `${this.props.id}-${index}`}
				schema={getArrayElementSchema(this.props.schema, index)}
				value={this.props.value[index]}
			/>
		);
	}

	render() {
		const ArrayTemplate = this.getArrayTemplate();

		return (
			<ArrayTemplate
				{...this.props}
				canReorder={this.props.schema.reorder !== false}
				onAdd={this.onAdd}
				onReorder={this.onReorder}
				onRemove={this.onRemove}
				renderItem={this.renderItem}
				isCloseable={this.isCloseable()}
			/>
		);
	}
}

ArrayWidget.defaultProps = {
	items: [],
	value: [],
	templates: {},
	widgets: {},
};

if (process.env.NODE_ENV !== 'production') {
	ArrayWidget.propTypes = {
		displayMode: PropTypes.string,
		id: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.object.isRequired,
		templates: PropTypes.object.isRequired,
		value: PropTypes.array.isRequired,
		widgets: PropTypes.object.isRequired,
	};
}
