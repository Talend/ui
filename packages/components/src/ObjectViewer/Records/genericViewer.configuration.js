import React from 'react';
import theme from './RecordViewer.scss';
import { injectedCellRenderer } from '../AvroRenderer';


function formatData(value) {
	return value;
}

/**
 * We are schema driven.
 * We have 2 cases that has children
 * - object : 	schema.fields is an array describing each object property.
 * 				so each element of schema.fields is the subSchema of a property.
  	{
		name: 'my-object',
		doc: 'My Object',
		type: { type: 'record' },
		fields: [
			{ name: 'field1-avro-schema', ... },
			{ name: 'field2-avro-schema', ... },
			// an object schema can be a array of fields (root case)
			// or a complete avro definition, where fields is an array of avro definition
			{ name: 'object-field-avro-schema', fields: [], ... },
		],
	}
 * - array : schema.items.fields is an array containing the schema of each children properties
 	{
		name: 'my-array',
		doc: 'My Array',
		type: { type: 'array' },
		items: {
			name: 'my-array-items',
			type: 'record',
			fields: [
				{ name: 'array-item1-avro-schema', ... },
				{ name: 'array-item2-avro-schema', ... },
			]
		}
	}
 */
function getFields(avroSample, type) {
	const value = avroSample.data.value;
	const schema = avroSample.schema;

	if (type === 'object') {
		const fieldsSchema = Array.isArray(schema) ? schema : schema.fields;
		return fieldsSchema
			.filter(({ name }) => value[name] !== undefined)
			.map(subSchema => {
				const dataKey = subSchema.name;
				return {
					dataKey,
					value: {
						schema: subSchema,
						data: value[dataKey],
					},
				};
			});
	}
	return value.map((datum, index) => ({
		dataKey: index,
		value: { schema: schema.items.fields, data: datum },
	}));
}

/**
 * The value is the data to display, we return its type.
 */
function getDataType(avroSample) {
	return Array.isArray(avroSample.data.value) ? 'array' : typeof avroSample.data.value;
}

/**
 * The value is an avro entry that contains { schema, data }.
 * The data is an avro data, containing a quality indicator.
 * We adapt this indicator to a quality constant.
 */
function getQuality(props) {
	const avroSample = props.value;
	switch (avroSample.data.quality) {
		case -1:
			return 'invalid';
		case 0:
			return 'empty';
		default:
			return 'valid';
	}
}

/**
 * The value is an avro entry that contains { schema, data }.
 * The data is an avro data, containing the real value.
 */
function getValue(props) {
	const avroSample = props.value;
	const RendererComponent = injectedCellRenderer(
		props.getComponent,
		props.cellRenderer,
		props.avroRenderers
	);

	return (
		<RendererComponent
			colDef={{ avro: avroSample.schema }}
			data={avroSample.data}
		/>
	);
}

/**
 * For objects (technical type provided, the corresponding avro type is records),
 * we display a "plus" icon.
 * For arrays, we stick to the caret.
 */
function getIcon({ isOpened, type }) {
	let name;
	let transform;
	let className;
	if (type === 'object') {
		name = 'talend-plus-circle'; // TODO we don't have a talend-minus-circle
		className = theme.icon;
	} else {
		name = isOpened ? 'talend-caret-down' : 'talend-chevron-left';
		transform = isOpened ? null : 'rotate-180';
	}

	return { className, name, transform };
}

export default {
	formatData,
	getDataType,
	getFields,
	getIcon,
	getQuality,
	getValue,
};
