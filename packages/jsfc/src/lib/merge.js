import { stringify, parse } from './sf-path';
import { defaultForm, createDefaults } from './schema-defaults';
import canonicalTitleMap from './canonical-title-map';

// export function merge(schema, form, schemaDefaultTypes, ignore, options, readonly, asyncTemplates) {
export function merge(
	lookup,
	form,
	typeDefaults = createDefaults(),
	ignore,
	options,
	readonly,
	asyncTemplates,
) {
	let formItems = [];
	let formItemRest = [];
	form = form || [];
	let idx = form.indexOf('*');
	options = options || {};
	let stdForm = {};

	let idxRest = form.indexOf('...');
	if (typeof lookup === 'object' && lookup.hasOwnProperty('properties')) {
		readonly = readonly || lookup.readonly || lookup.readOnly;
		stdForm = defaultForm(lookup, typeDefaults, ignore, options);

		let defaultFormLookup = stdForm.lookup;

		lookup = defaultFormLookup || lookup;
		formItems = formItems.concat(stdForm.form);
	}

	if (idx !== -1) {
		form = form
			.slice(0, idx)
			.concat(formItems)
			.concat(form.slice(idx + 1));
	}

	//simple case, we have a "...", just put the formItemRest there
	if (stdForm.form && idxRest !== -1) {
		let formKeys = form
			.map(function(obj) {
				if (typeof obj === 'string') {
					return obj;
				} else if (obj.key) {
					return obj.key;
				}
			})
			.filter(function(element) {
				return element !== undefined;
			});

		formItemRest = formItemRest.concat(
			stdForm.form
				.map(function(obj) {
					let isInside = formKeys.indexOf(obj.key[0]) !== -1;
					if (!isInside) {
						return obj;
					}
				})
				.filter(function(element) {
					return element !== undefined;
				}),
		);
	}

	if (idxRest !== -1) {
		form = form
			.slice(0, idxRest)
			.concat(formItemRest)
			.concat(form.slice(idxRest + 1));
	}

	// ok let's merge!
	// We look at the supplied form and extend it with schema standards
	return form.map(obj => {
		// handle the shortcut with just a name
		if (typeof obj === 'string') {
			obj = { key: obj };
		}

		if (obj.key) {
			if (typeof obj.key === 'string') {
				obj.key = parse(obj.key);
			}
		}

		// If it has a titleMap make sure it's a list
		if (obj.titleMap) {
			obj.titleMap = canonicalTitleMap(obj.titleMap);
		}

		// extend with std form from schema.
		if (obj.key) {
			const strid = stringify(obj.key);
			if (lookup[strid]) {
				const schemaDefaults = lookup[strid];
				if (schemaDefaults) {
					Object.keys(schemaDefaults).forEach(attr => {
						if (obj[attr] === undefined) {
							obj[attr] = schemaDefaults[attr];
						}
					});
				}
			}
		}

		// Are we inheriting readonly?
		if (readonly === true) {
			// Inheriting false is not cool.
			obj.readonly = true;
		}

		// if it's a type with items, merge 'em!
		if (obj.items) {
			obj.items = merge(
				lookup,
				obj.items,
				typeDefaults,
				ignore,
				options,
				obj.readonly,
				asyncTemplates,
			);
		}

		// if its has tabs, merge them also!
		if (obj.tabs) {
			obj.tabs.forEach(tab => {
				if (tab.items) {
					tab.items = merge(
						lookup,
						tab.items,
						typeDefaults,
						ignore,
						options,
						obj.readonly,
						asyncTemplates,
					);
				}
			});
		}

		// Special case: checkbox
		// Since have to ternary state we need a default
		if (obj.type === 'checkbox') {
			// Check for schema property, as the checkbox may be part of the explicitly defined form
			if (obj.schema === undefined) {
				obj.schema = { default: false };
			} else if (obj.schema['default'] === undefined) {
				obj.schema['default'] = false;
			}
		}

		// Special case: template type with tempplateUrl that's needs to be loaded before rendering
		// TODO: this is not a clean solution. Maybe something cleaner can be made when $ref support
		// is introduced since we need to go async then anyway
		if (asyncTemplates && obj.type === 'template' && !obj.template && obj.templateUrl) {
			asyncTemplates.push(obj);
		}

		return obj;
	});
}
