import PropTypes from 'prop-types';
import React from 'react';

import Widget from '../../Widget';
import FieldTemplate from '../FieldTemplate';

import theme from './KeyValue.scss';

const defaultChildrenSchema = {
	schema: { type: 'string' },
	type: 'text',
};

function getLast(array = []) {
	return array[array.length - 1];
}

function getChildSchema(parentSchema, type) {
	const childKey = parentSchema.key.concat(type);
	const childrenSchemas = parentSchema.items || [];
	const childSchema = childrenSchemas.find(item => getLast(item.key) === type);
	if (!childSchema) {
		return {
			...defaultChildrenSchema,
			key: childKey,
		};
	}
	return {
		...defaultChildrenSchema,
		...childSchema,
		key: childKey,
		autoFocus: parentSchema.autoFocus || childSchema.autoFocus,
		disabled: parentSchema.disabled || childSchema.disabled,
		readOnly: parentSchema.readOnly || childSchema.readOnly,
	};
}

function KeyValue({ id, isValid, errorMessage, onChange, onFinish, schema, value, ...restProps }) {
	const {
		description,
		title,
	} = schema;

	const keySchema = getChildSchema(schema, 'key');
	const valueSchema = getChildSchema(schema, 'value');

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
