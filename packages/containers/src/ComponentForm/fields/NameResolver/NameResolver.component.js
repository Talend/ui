import React from 'react';
import PropTypes from 'prop-types';
import { getValue } from '@talend/react-forms/lib/UIForm//utils/properties';

export default function withNameResolver(WrappedComponent) {
	function NameResolver(props) {
		function resolveName(value) {
			// create schema to get entry name from internal properties
			const key = Array.from(props.schema.key);
			key[key.length - 1] = `$${key[key.length - 1]}_name`;

			const nameSchema = { ...props.schema, key };
			return getValue(props.properties, nameSchema) || value;
		}

		return <WrappedComponent {...props} resolveName={resolveName} />;
	}
	NameResolver.displayName = `NameResolver(${WrappedComponent.displayName})`;
	NameResolver.propTypes = {
		properties: PropTypes.object,
		schema: PropTypes.shape({
			key: PropTypes.array,
		}),
	};
	return NameResolver;
}
