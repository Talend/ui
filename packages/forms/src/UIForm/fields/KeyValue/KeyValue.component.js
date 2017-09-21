import PropTypes from 'prop-types';
import React from 'react';

import Widget from '../../Widget';
import FieldTemplate from '../FieldTemplate';

import theme from './KeyValue.scss';

function getLast(array = []) {
	return array[array.length - 1];
}

function KeyValue({ id, isValid, errorMessage, onChange, onFinish, schema, value, ...restProps }) {
	const {
		autoFocus,
		description,
		disabled = false,
		items = [],
		readOnly = false,
		title,
	} = schema;

	console.log(schema)
	let keySchema = items.find(item => getLast(item.key) === 'key');
	keySchema = {
		...keySchema,
		autoFocus: autoFocus || keySchema.autoFocus,
		disabled: disabled || keySchema.disabled,
		readOnly: readOnly || keySchema.readOnly,
	};

	let valueSchema = items.find(item => getLast(item.key) === 'value');
	valueSchema = {
		...valueSchema,
		disabled: disabled || valueSchema.disabled,
		readOnly: readOnly || valueSchema.readOnly,
	};
//TODO onChange onFinish
	return (
		<FieldTemplate
			description={description}
			errorMessage={errorMessage}
			id={id}
			isValid={isValid}
			label={title}
			labelAfter
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
