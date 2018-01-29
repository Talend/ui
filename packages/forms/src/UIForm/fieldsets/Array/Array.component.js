import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Widget from '../../Widget';
import Message from '../../Message';
import { shiftArrayErrorsKeys } from '../../utils/validation';

import theme from './Array.scss';

function adaptKeyWithIndex(keys, index) {
	let indexedKeys = keys;
	const firstIndexPlaceholder = indexedKeys.indexOf('');
	if (firstIndexPlaceholder >= 0) {
		indexedKeys = [...keys];
		indexedKeys[firstIndexPlaceholder] = index;
	}
	return indexedKeys;
}

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

function getItemSchema(arraySchema, index) {
	// insert index in all fields
	const items = arraySchema.items.map(item => ({
		...item,
		key: adaptKeyWithIndex(item.key, index),
	}));

	// insert index in item schema key
	const key = arraySchema.key.concat(index);

	return {
		key,
		items,
		widget: arraySchema.itemWidget || 'fieldset',
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
		const defaultValue = arrayMergedSchema.schema.items.type === 'object' ? {} : '';

		let currentValue = this.props.value;
		const itemWidget = this.props.widgets[this.props.schema.itemWidget];
		if (itemWidget && itemWidget.isCloseable) {
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

	renderItem(index) {
		return (
			<Widget
				{...this.props}
				id={this.props.id && `${this.props.id}-${index}`}
				schema={getItemSchema(this.props.schema, index)}
				value={this.props.value[index]}
			/>
		);
	}

	render() {
		const { errorMessage, isValid, schema } = this.props;
		const canReorder = schema.reorder !== false;

		const ArrayTemplate = this.props.templates.array;

		return (
			<div className={classNames(theme['tf-array-container'], 'tf-array-container')}>
				<ArrayTemplate
					{...this.props}
					canReorder={canReorder}
					onAdd={this.onAdd}
					onReorder={this.onReorder}
					onRemove={this.onRemove}
					renderItem={this.renderItem}
				/>
				<Message errorMessage={errorMessage} description={schema.description} isValid={isValid} />
			</div>
		);
	}
}

ArrayWidget.defaultProps = {
	items: [],
	value: [],
};

if (process.env.NODE_ENV !== 'production') {
	ArrayWidget.propTypes = {
		errorMessage: PropTypes.string,
		id: PropTypes.string,
		isValid: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.object.isRequired,
		templates: PropTypes.object.isRequired,
		value: PropTypes.arrayOf(PropTypes.object).isRequired,
		widgets: PropTypes.object.isRequired,
	};
}
