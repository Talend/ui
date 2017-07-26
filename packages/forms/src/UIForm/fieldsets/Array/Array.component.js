import React, { PropTypes } from 'react';
import ArrayItem from './ArrayItem.component';
import Message from '../../Message';
import Widget from '../../Widget';

import theme from './Array.scss';

function adaptKeyWithIndex(keys, index) {
	const indexedKeys = [...keys];
	indexedKeys[keys.length - 2] = index;
	return indexedKeys;
}

export default class ArrayWidget extends React.Component {
	constructor(props) {
		super(props);

		this.addItem = this.addItem.bind(this);
		this.onRemove = this.onRemove.bind(this);
		this.onReorder = this.onReorder.bind(this);
	}

	onRemove(event, index) {
		return this.props.onArrayRemove(event, { schema: this.props.schema, index });

		/*
		// TODO remove error and shift the following ones
		console.log(`Remove ${index}`);

		this.props.onChange(
			event,
			{
				schema: this.props.schema,
				value: this.props.value.filter((_, itemIndex) => itemIndex !== index),
			},
			{ skipValidation: true }
		);
		*/
	}

	onReorder(event, { previousIndex, nextIndex }) {
		return this.props.onArrayReorder(
			event,
			{ schema: this.props.schema, previousIndex, nextIndex }
		);

		/*
		// TODO switch the errors
		console.log(`Reorder ${previousIndex} to ${nextIndex}`);

		const newValue = this.props.value.slice(0);
		const previousIndexValue = newValue[previousIndex];
		newValue[previousIndex] = newValue[nextIndex];
		newValue[nextIndex] = previousIndexValue;
		this.props.onChange(
			event,
			{ schema: this.props.schema, value: newValue },
			{ skipValidation: true }
		);
		*/
	}

	addItem(event) {
		return this.props.onChange(event, { schema: this.props.schema });

		/*
		this.props.onChange(
			event,
			{ schema: this.props.schema, value: [...this.props.value, {}] },
			{ skipValidation: true }
		);
		*/
	}
	render() {
		const { errorMessage, id, isValid, schema, value, ...restProps } = this.props;
		const { description, key, items } = schema;

		return (
			<div>
				<ol id={id} className={theme['tf-array']}>
					{value.map((itemValue, index) => {
						// TODO optimise that, compute the item schema only when value number change
						// and store it in component state
						const arrayItems = items.map(item => ({
							...item,
							key: adaptKeyWithIndex(item.key, index),
						}));
						const itemSchema = {
							key: key.concat(index),
							items: arrayItems,
							widget: schema.itemWidget || 'fieldset',
						};
						return (
							<li className={theme.item} key={index}>
								<ArrayItem
									hasMoveDown={index < value.length - 1}
									hasMoveUp={index > 0}
									index={index}
									onRemove={this.onRemove}
									onReorder={this.onReorder}
									value={value}
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
					<button type="button" className="btn btn-info" onClick={this.addItem}>New Element</button>
				</div>
				<Message
					errorMessage={errorMessage}
					description={description}
					isValid={isValid}
				/>
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
		items: PropTypes.arrayOf(PropTypes.object).isRequired,
		onArrayRemove: PropTypes.func.isRequired,
		onArrayReorder: PropTypes.func.isRequired,
		onChange: PropTypes.func.isRequired,
		schema: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		value: PropTypes.arrayOf(PropTypes.object).isRequired,
	};
}
