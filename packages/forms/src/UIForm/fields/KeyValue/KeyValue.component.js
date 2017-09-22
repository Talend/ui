import PropTypes from 'prop-types';
import React from 'react';

import Widget from '../../Widget';
import FieldTemplate from '../FieldTemplate';

import theme from './KeyValue.scss';

function getLast(array = []) {
	return array[array.length - 1];
}

function getChildSchema(parentSchema, childrenSchemas, type) {
	const childSchema = childrenSchemas.find(item => getLast(item.key) === type);
	return {
		...childSchema,
		autoFocus: parentSchema.autoFocus || childSchema.autoFocus,
		disabled: parentSchema.disabled || childSchema.disabled,
		readOnly: parentSchema.readOnly || childSchema.readOnly,
	};
}

function KeyValue({ id, isValid, errorMessage, onChange, onFinish, schema, value, ...restProps }) {
	const {
		description,
		items = [],
		title,
	} = schema;

	const keySchema = getChildSchema(schema, items, 'key');
	const valueSchema = getChildSchema(schema, items, 'value');

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
		>
			<dl className={theme['key-value']}>
				<dt>
					<Widget
						{...restProps}
						onChange={onChange}
						onFinish={onFinish}
						schema={keySchema}
						value={value.key}
					/>
				</dt>
				<dd>
					<Widget
						{...restProps}
						onChange={onChange}
						onFinish={onFinish}
						schema={valueSchema}
						value={value.value}
					/>
				</dd>
			</dl>
		</FieldTemplate>
	);
}

KeyValue.defaultProps = {
	value: {},
};

if (process.env.NODE_ENV !== 'production') {
	KeyValue.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			readOnly: PropTypes.bool,
			title: PropTypes.string,
			type: PropTypes.string,
		}),
		value: PropTypes.shape({
			key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		}),
	};
}

export default KeyValue;
