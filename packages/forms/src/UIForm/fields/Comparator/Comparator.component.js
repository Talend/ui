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

function OperatorListElement({ symbol, name, selected }) {
	return (
		<span className={classNames(theme.operator, { [theme.selected]: selected })}>
			{symbol && <span>{symbol}</span>}
			{name && <span className={classNames(theme.name)}>{name}</span>}
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
			const titles = map.find(m => m.value === value);
			const title = titles ? `${titles.symbol} (${titles.name})` : value;
			return {
				value,
				title,
				name: titles ? titles.name : '',
				symbol: symbols[value] || value,
			};
		});
	}

	getOperatorsMap() {
		return this.getFormattedOperators().map(({ value, title, name, symbol }) => ({
			value,
			title,
			label: (
				<OperatorListElement
					selected={this.props.value.operator === value}
					name={name}
					symbol={symbol}
				/>
			),
		}));
	}

	render() {
		const formatted = this.getFormattedOperators();
		const current = formatted.find(f => f.value === this.props.value.operator);
		return (
			<div className={classNames(theme.comparator)}>
				<ActionDropdown
					label={current && current.symbol}
					onSelect={this.onSelect}
					disabled={this.getOperatorSchema().disabled}
					items={this.getOperatorsMap().map(({ label, value, title }, index) => ({
						id: `comparison-operator-${index}`,
						label,
						value,
						title,
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
		selected: PropTypes.bool,
	};
}

Comparator.defaultProps = {
	value: {},
};

export default Comparator;
