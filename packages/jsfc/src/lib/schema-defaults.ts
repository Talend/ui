import { stringify } from './sf-path';
import canonicalTitleMap from './canonical-title-map';

/* Utils */
const stripNullType = type => {
	if (Array.isArray(type) && type.length === 2) {
		if (type[0] === 'null') {
			return type[1];
		}
		if (type[1] === 'null') {
			return type[0];
		}
	}
	return type;
};

// Creates an default titleMap list from an enum, i.e. a list of strings.
const enumToTitleMap = enm => {
	const titleMap = []; // canonical titleMap format is a list.
	enm.forEach(name => {
		titleMap.push({ name, value: name });
	});
	return titleMap;
};

/**
 * Creates a default form definition from a schema.
 */
export function defaultFormDefinition(schemaTypes, name, schema, options) {
	const rules = schemaTypes[stripNullType(schema.type)];
	if (rules) {
		let def;
		// We give each rule a possibility to recurse it's children.
		const innerDefaultFormDefinition = (childName, childSchema, childOptions) =>
			defaultFormDefinition(schemaTypes, childName, childSchema, childOptions);
		for (let i = 0; i < rules.length; i++) {
			def = rules[i](name, schema, options, innerDefaultFormDefinition);

			// first handler in list that actually returns something is our handler!
			if (def) {
				// Do we have form defaults in the schema under the x-schema-form-attribute?
				if (def.schema['x-schema-form']) {
					Object.assign(def, def.schema['x-schema-form']);
				}

				return def;
			}
		}
	}
}

/**
 * Creates a form object with all common properties
 */
export function stdFormObj(name, schema, options) {
	options = options || {};

	// The Object.assign used to be a angular.copy. Should work though.
	const f =
		options.global && options.global.formDefaults
			? Object.assign({}, options.global.formDefaults)
			: {};
	if (options.global && options.global.supressPropertyTitles === true) {
		f.title = schema.title;
	} else {
		f.title = schema.title || name;
	}

	if (schema.description) {
		f.description = schema.description;
	}
	if (options.required === true || schema.required === true) {
		f.required = true;
	}
	if (schema.maxLength) {
		f.maxlength = schema.maxLength;
	}
	if (schema.minLength) {
		f.minlength = schema.minLength;
	}
	if (schema.readOnly || schema.readonly) {
		f.readonly = true;
	}
	if (schema.minimum) {
		f.minimum = schema.minimum + (schema.exclusiveMinimum ? 1 : 0);
	}
	if (schema.maximum) {
		f.maximum = schema.maximum - (schema.exclusiveMaximum ? 1 : 0);
	}

	// Non standard attributes (DONT USE DEPRECATED)
	// If you must set stuff like this in the schema use the x-schema-form attribute
	if (schema.validationMessage) {
		f.validationMessage = schema.validationMessage;
	}
	if (schema.enumNames) {
		f.titleMap = canonicalTitleMap(schema.enumNames, schema['enum']);
	}
	f.schema = schema;

	// Ng model options doesn't play nice with undefined, might be defined
	// globally though
	f.ngModelOptions = f.ngModelOptions || {};

	return f;
}

/*** Schema types to form type mappings, with defaults ***/
export function text(name, schema, options) {
	if (stripNullType(schema.type) === 'string' && !schema['enum']) {
		const f = stdFormObj(name, schema, options);
		f.key = options.path;
		f.type = 'text';
		options.lookup[stringify(options.path)] = f;
		return f;
	}
}

// default in json form for number and integer is a text field
// input type="number" would be more suitable don't ya think?
export function number(name, schema, options) {
	if (stripNullType(schema.type) === 'number') {
		const f = stdFormObj(name, schema, options);
		f.key = options.path;
		f.type = 'number';
		options.lookup[stringify(options.path)] = f;
		return f;
	}
}

export function integer(name, schema, options) {
	if (stripNullType(schema.type) === 'integer') {
		const f = stdFormObj(name, schema, options);
		f.key = options.path;
		f.type = 'number';
		options.lookup[stringify(options.path)] = f;
		return f;
	}
}

export function checkbox(name, schema, options) {
	if (stripNullType(schema.type) === 'boolean') {
		const f = stdFormObj(name, schema, options);
		f.key = options.path;
		f.type = 'checkbox';
		options.lookup[stringify(options.path)] = f;
		return f;
	}
}

export function select(name, schema, options) {
	if (stripNullType(schema.type) === 'string' && schema['enum']) {
		const f = stdFormObj(name, schema, options);
		f.key = options.path;
		f.type = 'select';
		if (!f.titleMap) {
			f.titleMap = enumToTitleMap(schema['enum']);
		}
		options.lookup[stringify(options.path)] = f;
		return f;
	}
}

export function checkboxes(name, schema, options) {
	if (stripNullType(schema.type) === 'array' && schema.items && schema.items['enum']) {
		const f = stdFormObj(name, schema, options);
		f.key = options.path;
		f.type = 'checkboxes';
		if (!f.titleMap) {
			f.titleMap = enumToTitleMap(schema.items['enum']);
		}
		options.lookup[stringify(options.path)] = f;
		return f;
	}
}

export function fieldset(name, schema, options, defaultFormDef) {
	if (stripNullType(schema.type) === 'object') {
		const f = stdFormObj(name, schema, options);
		f.type = 'fieldset';
		f.key = options.path;
		f.items = [];
		options.lookup[stringify(options.path)] = f;

		// recurse down into properties
		if (schema.properties) {
			Object.keys(schema.properties).forEach(key => {
				const value = schema.properties[key];
				const path = options.path.slice();
				path.push(key);
				if (options.ignore[stringify(path)] !== true) {
					const required = schema.required && schema.required.indexOf(key) !== -1;

					const def = defaultFormDef(key, value, {
						path,
						required: required || false,
						lookup: options.lookup,
						ignore: options.ignore,
						global: options.global,
					});
					if (def) {
						f.items.push(def);
					}
				}
			});
		}
		return f;
	}
}

export function array(name, schema, options, defaultFormDef) {
	if (stripNullType(schema.type) === 'array') {
		const f = stdFormObj(name, schema, options);
		f.type = 'array';
		f.key = options.path;
		options.lookup[stringify(options.path)] = f;

		const required =
			schema.required && schema.required.indexOf(options.path[options.path.length - 1]) !== -1;

		// The default is to always just create one child. This works since if the
		// schemas items declaration is of type: "object" then we get a fieldset.
		// We also follow json form notatation, adding empty brackets "[]" to
		// signify arrays.

		const arrPath = options.path.slice();
		arrPath.push('');

		f.items = [
			defaultFormDef(name, schema.items, {
				path: arrPath,
				required: required || false,
				lookup: options.lookup,
				ignore: options.ignore,
				global: options.global,
			}),
		];

		return f;
	}
}

export function createDefaults() {
	// First sorted by schema type then a list.
	// Order has importance. First handler returning an form snippet will be used.
	return {
		string: [select, text],
		object: [fieldset],
		number: [number],
		integer: [integer],
		boolean: [checkbox],
		array: [checkboxes, array],
	};
}

/**
 * Create form defaults from schema
 */
export function defaultForm(
	schema: any,
	defaultSchemaTypes: any,
	ignore?: any,
	globalOptions?: any,
) {
	const form = [];
	const lookup = {}; // Map path => form obj for fast lookup in merging
	ignore = ignore || {};
	globalOptions = globalOptions || {};
	defaultSchemaTypes = defaultSchemaTypes || createDefaults();

	if (schema.properties) {
		Object.keys(schema.properties).forEach(key => {
			if (ignore[key] !== true) {
				const required = schema.required && schema.required.indexOf(key) !== -1;
				const def = defaultFormDefinition(defaultSchemaTypes, key, schema.properties[key], {
					path: [key], // Path to this property in bracket notation.
					lookup: lookup, // Extra map to register with. Optimization for merger.
					ignore: ignore, // The ignore list of paths (sans root level name)
					required: required, // Is it required? (v4 json schema style)
					global: globalOptions, // Global options, including form defaults
				});
				if (def) {
					form.push(def);
				}
			}
		});
	} else {
		throw new Error('Not implemented. Only type "object" allowed at root level of schema.');
	}
	return { form: form, lookup: lookup };
}
