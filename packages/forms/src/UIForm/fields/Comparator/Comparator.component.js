import PropTypes from 'prop-types';
import React from 'react';
import last from 'lodash/last';
import classNames from 'classnames';

import ActionDropdown from '@talend/react-components/lib/Actions/ActionDropdown';
import Text from '../Text';
import Widget from '../../Widget';

import theme from './Comparator.scss';

/**
 * Adapt part (operator or value) schema
 * @param schema The Comparator schema
 * @param part 'operator' or 'value'
 */
function getPartSchema(schema, part) {
	const childKey = schema.key.concat(part);
	const childrenSchemas = schema.items || [];
	let childSchema = childrenSchemas.find(item => last(item.key) === part);
	if (!childSchema) {
		childSchema = {};
	}
	return {
		...childSchema,
		key: childKey,
		autoFocus: schema.autoFocus || childSchema.autoFocus,
		disabled: schema.disabled || childSchema.disabled,
		readOnly: schema.readOnly || childSchema.readOnly,
	};
}

function OperatorListElement({ value, name, selected }) {
	return (
		<span
			className={
				classNames(theme.operator, { [theme.selected]: selected })
			}
		>
			<span className={classNames(theme.sign)}>{value}</span>
			<span className={classNames(theme.name)}>{name}</span>
		</span>
	);
}


class Comparator extends React.Component {
	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onFinish = this.onFinish.bind(this);
	}

	onSelect(event, { value }) {
		this.props.onChange(event, {
			schema: this.props.schema,
			value: {
				...this.props.value,
				operator: value,
			},
		});
	}

	onChange(event, { value }) {
		this.props.onChange(event, {
			schema: this.props.schema,
			value: {
				...this.props.value,
				value,
			},
		});
	}

	onFinish(event) {
		this.props.onFinish(
			event,
			{
				schema: this.props.schema,
				value: this.props.value,
			},
			{ deepValidation: true },
		);
	}

	getOperatorSchema = getPartSchema.bind(this, this.props.schema, 'operator');
	getValueSchema = getPartSchema.bind(this, this.props.schema, 'value');

	getOperatorsMap() {
		const schema = this.getOperatorSchema();
		const map = this.props.schema.titleMap || [];

		return schema.titleMap.map(({ value }) => ({
			value,
			name: (<OperatorListElement
				value={value}
				selected={this.props.value.operator === value}
				name={(map.find(m => m.value === value) || {}).name}
			/>),
		}));
	}

	render() {
		const operators = this.getOperatorSchema();

		return (
			<div className={classNames(theme.comparator)}>
				<Widget
					{...this.props}
					onChange={this.onChange}
					onFinish={this.onFinish}
					schema={this.getValueSchema()}
				/>
				<ActionDropdown
					id="context-dropdown-related-items"
					label={this.props.value.operator}
					onSelect={this.onSelect}
					disabled={operators.disabled}
					items={this.getOperatorsMap().map((option, index) => ({
						id: `comparison-operator-${index}`,
						label: option.name,
						value: option.value,
					}))}
					noCaret
				/>
			</div>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	Comparator.propTypes = {
		...Text.propsTypes,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			key: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
			items: PropTypes.array,
			readOnly: PropTypes.bool,
			title: PropTypes.string,
		}),
	};

	OperatorListElement.propTypes = {
		value: PropTypes.string,
		name: PropTypes.string,
		selected: PropTypes.bool,
	};
}

Comparator.defaultProps = {
	value: {},
};

export default Comparator;
