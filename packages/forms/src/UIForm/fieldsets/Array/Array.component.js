import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import ArrayItem from './ArrayItem.component';
import Message from '../../Message';
import Widget from '../../Widget';
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
	}

	onAdd(event) {
		const arrayMergedSchema = this.props.schema;
		const defaultValue = arrayMergedSchema.schema.items.type === 'object' ? {} : '';
		const value = [...this.props.value, defaultValue];

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

	render() {
		const { errorMessage, id, isValid, schema, value, ...restProps } = this.props;
		const canReorder = schema.reorder !== false;

		return (
			<div className={classNames(theme['tf-array-container'], 'tf-array-container')}>
				<ol id={id} className={classNames(theme['tf-array'], 'tf-array')}>
					{value.map((itemValue, index) => {
						// create item schema with item index in key
						const itemSchema = getItemSchema(schema, index, itemValue);

						return (
							<li className={theme.item} key={index}>
								<ArrayItem
									hasMoveDown={index < value.length - 1}
									hasMoveUp={index > 0}
									id={id && `${id}-control-${index}`}
									index={index}
									onRemove={this.onRemove}
									onReorder={canReorder && this.onReorder}
									value={itemValue}
								>
									<Widget
										{...restProps}
										id={id && `${id}-${index}`}
										schema={itemSchema}
										value={itemValue}
									/>
								</ArrayItem>
							</li>
						);
					})}
				</ol>
				<div>
					<button type="button" className="btn btn-info" onClick={this.onAdd}>
						New Element
					</button>
				</div>
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
		description: PropTypes.string,
		errorMessage: PropTypes.string,
		id: PropTypes.string,
		isValid: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		value: PropTypes.arrayOf(PropTypes.object).isRequired,
	};
}
