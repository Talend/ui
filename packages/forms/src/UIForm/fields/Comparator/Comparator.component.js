import PropTypes from 'prop-types';
import React from 'react';
import last from 'lodash/last';
import classNames from 'classnames';

import ActionDropdown from '@talend/react-components/lib/Actions/ActionDropdown';

import Text from '../Text';
import Widget from '../../Widget';

import theme from './Comparator.scss';

export const ICONS_MAPPING = {
	equals: 'talend-equal',
	not_equals: 'talend-not-equal',
	contains: 'talend-contains',
	not_contains: 'talend-not-contains',
	starts_with: 'talend-starts-with',
	ends_with: 'talend-ends-with',
	between: 'talend-between',
	greater_than: 'talend-greater-than',
	greater_equals_to: 'talend-greater-than-equal',
	less_than: 'talend-less-than',
	less_equals_to: 'talend-less-than-equal',
	regex: 'talend-regex',
};

/**
 * Format operator title
 * @param operator Operator
 * @param value Operator value as fallback
 * @returns {string} Formatted title
 */
function getFormattedTitle(operator, value) {
	if (operator) {
		if (operator.symbol) {
			return `${operator.symbol} (${operator.name})`;
		}
		return operator.name;
	}
	return value;
}

/**
 * Adapt part (operator or value) schema
 * @param schema The Comparator schema
 * @param part 'operator' or 'value'
 */
function getPartSchema(schema, part) {
	const schemaRest = { ...schema };
	delete schemaRest.key;
	delete schemaRest.items;
	delete schemaRest.schema;
	delete schemaRest.type;
	delete schemaRest.widget;
	const childKey = schema.key.concat(part);
	const childrenSchemas = schema.items || [];
	let childSchema = childrenSchemas.find(item => last(item.key) === part);
	if (!childSchema) {
		childSchema = {};
	}
	return {
		...childSchema,
		...schemaRest,
		key: childKey,
	};
}

function OperatorListElement({ symbol, icon, name, selected }) {
	if (icon && !name) {
		return null;
	}
	return (
		<span
			className={classNames(theme.operator, 'tf-comparator-operator', {
				[theme.selected]: selected,
			})}
		>
			{symbol && !icon && (
				<span className={classNames(theme.symbol, 'tf-comparator-operator-symbol')}>{symbol}</span>
			)}
			{name && (
				<span className={classNames(theme.name, 'tf-comparator-operator-name')}>{name}</span>
			)}
		</span>
	);
}

class Comparator extends React.Component {
	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onFinish = this.onFinish.bind(this);

		// eslint-disable-next-line
		console.warn(
			"UNSTABLE WARNING: The 'Comparator' is not ready to be used in Apps. Code can (will) change outside the release process until it's ready.",
		);
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

	getFormattedOperators() {
		const { schema } = this.props;
		const map = schema.titleMap || [];
		const symbols = (schema.options && schema.options.symbols) || {};
		return this.getOperatorSchema().titleMap.map(({ value }) => {
			const operator = map.find(m => m.value === value);
			const title = getFormattedTitle(operator, value);
			return {
				value,
				title,
				name: operator ? operator.name : '',
				symbol: symbols[value] || value,
				icon: ICONS_MAPPING[value],
			};
		});
	}

	getOperatorsMap() {
		return this.getFormattedOperators().map(({ value, title, name, symbol, icon }) => ({
			value,
			title,
			label: (
				<OperatorListElement
					selected={this.props.value.operator === value}
					name={name}
					symbol={symbol}
					icon={icon}
				/>
			),
			icon,
		}));
	}

	render() {
		const formatted = this.getFormattedOperators();
		const current = formatted.find(f => f.value === this.props.value.operator);
		return (
			<div className={classNames(theme.comparator)}>
				<ActionDropdown
					icon={current && current.icon}
					hideLabel={!!(current && current.icon)}
					label={current && (current.icon && current.name ? current.name : current.symbol)}
					onSelect={this.onSelect}
					disabled={this.getOperatorSchema().disabled}
					items={this.getOperatorsMap().map(({ label, value, title, icon }, index) => ({
						id: `comparison-operator-${index}`,
						label,
						value,
						title,
						icon,
					}))}
					noCaret
				/>
				<Widget
					{...this.props}
					onChange={this.onChange}
					onFinish={this.onFinish}
					schema={this.getValueSchema()}
				/>
			</div>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	Comparator.propTypes = {
		...Text.propTypes,
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
		symbol: PropTypes.string,
		name: PropTypes.string,
		icon: PropTypes.string,
		selected: PropTypes.bool,
	};
}

Comparator.defaultProps = {
	value: {},
};

export default Comparator;
