import PropTypes from 'prop-types';
import React from 'react';

import Text from 'react-jsonschema-form/lib/components/widgets/TextWidget';
import Select from 'react-jsonschema-form/lib/components/widgets/SelectWidget';
import { optionsList } from 'react-jsonschema-form/lib/utils';

import theme from './KeyValueWidget.scss';

function toKeyValue(formData) {
	if (formData) {
		return formData.split('=');
	}
	return ['', ''];
}

function toKey(formData) {
	return toKeyValue(formData)[0];
}

function toValue(formData) {
	return toKeyValue(formData)[1];
}

function Key({ schema, data, onChange, ...internalProps }) {
	if (schema.properties && Array.isArray(schema.properties.key.enum)) {
		const options = optionsList(schema.properties.key);
		return (
			<Select
				{...internalProps}
				schema={schema.properties.key}
				options={{ enumOptions: options }}
				value={data.key}
				onChange={change => onChange({ key: change, value: data.value })}
			/>
		);
	}
	return (
		<Text
			{...internalProps}
			value={toKey(data)}
			onChange={change => onChange(`${change}=${toValue(data)}`)}
		/>
	);
}

function Value({ schema, data, onChange, ...internalProps }) {
	if (schema.properties && Array.isArray(schema.properties.key.enum)) {
		return (
			<Text
				{...internalProps}
				value={data.value}
				onChange={change => onChange({ key: data.key, value: change })}
			/>
		);
	}
	return (
		<Text
			{...internalProps}
			value={toValue(data)}
			onChange={change => onChange(`${toKey(data)}=${change}`)}
		/>
	);
}

function KeyValueWidget({ schema, value, formData, onChange, ...internalProps }) {
	return (
		<dl className={theme['key-value']}>
			<dt>
				<Key {...internalProps} schema={schema} data={value || formData} onChange={onChange} />
			</dt>
			<dd>
				<Value {...internalProps} schema={schema} data={value || formData} onChange={onChange} />
			</dd>
		</dl>
	);
}

if (process.env.NODE_ENV !== 'production') {
	Key.propTypes = {
		schema: PropTypes.object,
		data: PropTypes.shape({ key: PropTypes.string }),
		onChange: PropTypes.func,
	};

	Value.propTypes = {
		schema: PropTypes.object,
		data: PropTypes.shape({ value: PropTypes.string }),
		onChange: PropTypes.func,
	};

	KeyValueWidget.propTypes = {
		schema: PropTypes.object,
		formData: PropTypes.object,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		onChange: PropTypes.func,
	};
}

export default KeyValueWidget;
