import PropTypes from 'prop-types';
import React from 'react';
import last from 'lodash/last';

import Widget from '../../Widget';
import FieldTemplate from '../FieldTemplate';

import theme from './KeyValue.scss';

/**
 * Default part (key or value) schema
 */
const defaultPartSchema = {
	schema: { type: 'string' },
	type: 'text',
};

/**
 * Adapt part (key or value) schema
 * @param parentSchema The KeyValue schema
 * @param part 'key' or 'value'
 */
function getPartSchema(parentSchema, part) {
	const childKey = parentSchema.key.concat(part);
	const childrenSchemas = parentSchema.items || [];
	let childSchema = childrenSchemas.find(item => last(item.key) === part);
	if (!childSchema) {
		childSchema = {};
	}
	return {
		...defaultPartSchema,
		...childSchema,
		key: childKey,
		autoFocus: parentSchema.autoFocus || childSchema.autoFocus,
		disabled: parentSchema.disabled || childSchema.disabled,
		readOnly: parentSchema.readOnly || childSchema.readOnly,
	};
}

function KeyValue({
	id,
	isValid,
	errorMessage,
	onChange,
	onFinish,
	schema,
	value,
	valueIsUpdating,
	...restProps
}) {
	const { description, title } = schema;

	const keySchema = getPartSchema(schema, 'key');
	const valueSchema = getPartSchema(schema, 'value');

	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
			required={schema.required}
			valueIsUpdating={valueIsUpdating}
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
			key: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
			items: PropTypes.array,
			readOnly: PropTypes.bool,
			title: PropTypes.string,
		}),
		value: PropTypes.shape({
			key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		}),
		valueIsUpdating: PropTypes.bool,
	};
}

export default KeyValue;
