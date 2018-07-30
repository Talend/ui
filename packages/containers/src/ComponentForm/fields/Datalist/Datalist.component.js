import React from 'react';
import PropTypes from 'prop-types';
import DatalistWidget from '@talend/react-forms/lib/UIForm/fields/Datalist';
import { getValue } from '@talend/react-forms/lib/UIForm//utils/properties';

export default function Datalist(props) {
	function resolveName(value) {
		// create schema to get entry name from internal properties
		const key = Array.from(props.schema.key);
		key[key.length - 1] = `$${key[key.length - 1]}_name`;

		const nameSchema = { ...props.schema, key };
		return getValue(props.properties, nameSchema) || value;
	}

	return <DatalistWidget {...props} resolveName={resolveName} />;
}

Datalist.propTypes = {
	properties: PropTypes.object,
	schema: PropTypes.shape({
		key: PropTypes.array,
	}),
};
