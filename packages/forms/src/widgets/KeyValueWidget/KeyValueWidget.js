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

function renderKey({ schema, value, formData, onChange, ...rest }) {
	const data = value || formData;
	if (schema.properties && Array.isArray(schema.properties.key.enum)) {
		const options = optionsList(schema.properties.key);
		return (
			<Select
				value={data.key}
				schema={schema.properties.key}
				options={{ enumOptions: options }}
				onChange={change => onChange({ key: change, value: data.value })}
			/>
		);
	}
	return (
		<Text
			{...rest}
			value={toKey(data)}
			onChange={change => onChange(`${change}=${toValue(data)}`)}
		/>
	);
}

function renderValue({ schema, value, formData, onChange, ...rest }) {
	const data = value || formData;
	if (schema.properties && Array.isArray(schema.properties.key.enum)) {
		return (
			<Text
				{...rest}
				value={data.value}
				onChange={change => onChange({ key: data.key, value: change })}
			/>
		);
	}
	return (
		<Text
			{...rest}
			value={toValue(data)}
			onChange={change => onChange(`${toKey(data)}=${change}`)}
		/>
	);
}

function KeyValueWidget(props) {
	return (
		<dl className={theme['key-value']}>
			<dt>{ renderKey(props) }</dt>
			<dd>{ renderValue(props) }</dd>
		</dl>
	);
}

if (process.env.NODE_ENV !== 'production') {
	KeyValueWidget.propTypes = {
		schema: PropTypes.object,
		formData: PropTypes.object,
		value: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		onChange: PropTypes.func,
	};
}

export default KeyValueWidget;
