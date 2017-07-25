import React, { PropTypes } from 'react';
import Fieldset from '../Fieldset';
import FieldTemplate from '../../fields/FieldTemplate';

function adaptKeyWithIndex(keys, index) {
	const indexedKeys = [...keys];
	indexedKeys[keys.length - 2] = index;
	return indexedKeys;
}

export default class ArrayWidget extends React.Component {
	constructor(props) {
		super(props);

		this.addItem = this.addItem.bind(this);
	}

	addItem() {
		this.props.onChange(
			null,
			{ schema: this.props.schema, value: [...this.props.value, {}] },
			{ validate: false }
		);
	}

	render() {
		const { errorMessage, id, isValid, schema, value, ...restProps } = this.props;
		const { description, items, title } = schema;

		return (
			<FieldTemplate
				description={description}
				errorMessage={errorMessage}
				isValid={isValid}
				label={title}
			>
				<ol id={id}>
					{value.map((itemValue, index) => {
						const arrayItems = items.map(item => ({
							...item,
							key: adaptKeyWithIndex(item.key, index),
						}));
						return (
							<li className="list-group-item" key={index}>
								<Fieldset
									{...restProps}
									id={id && `${id}-${index}`}
									schema={{ items: arrayItems }}
									value={itemValue}
								/>
							</li>
						);
					})}
				</ol>
				<div>
					<button type="button" className="btn btn-success" onClick={this.addItem}>New</button>
				</div>
			</FieldTemplate>
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
		onChange: PropTypes.func.isRequired,
		schema: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
		value: PropTypes.arrayOf(PropTypes.object).isRequired,
	};
}
