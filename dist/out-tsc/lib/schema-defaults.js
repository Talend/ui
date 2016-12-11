import { stringify } from './sf-path';
import canonicalTitleMap from './canonical-title-map';
var stripNullType = function (type) {
    if (Array.isArray(type) && type.length === 2) {
        if (type[0] === 'null') {
            return type[1];
        }
        ;
        if (type[1] === 'null') {
            return type[0];
        }
        ;
    }
    ;
    return type;
};
var enumToTitleMap = function (enm) {
    var titleMap = [];
    enm.forEach(function (name) {
        titleMap.push({ name: name, value: name });
    });
    return titleMap;
};
export function defaultFormDefinition(schemaTypes, name, schema, options) {
    var rules = schemaTypes[stripNullType(schema.type)];
    if (rules) {
        var def = void 0;
        var innerDefaultFormDefinition = function (childName, childSchema, childOptions) {
            return defaultFormDefinition(schemaTypes, childName, childSchema, childOptions);
        };
        for (var i = 0; i < rules.length; i++) {
            def = rules[i](name, schema, options, innerDefaultFormDefinition);
            if (def) {
                if (def.schema['x-schema-form']) {
                    Object.assign(def, def.schema['x-schema-form']);
                }
                return def;
            }
        }
    }
}
export function stdFormObj(name, schema, options) {
    options = options || {};
    var f = options.global && options.global.formDefaults ?
        Object.assign({}, options.global.formDefaults) : {};
    if (options.global && options.global.supressPropertyTitles === true) {
        f.title = schema.title;
    }
    else {
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
    if (schema.validationMessage) {
        f.validationMessage = schema.validationMessage;
    }
    if (schema.enumNames) {
        f.titleMap = canonicalTitleMap(schema.enumNames, schema['enum']);
    }
    f.schema = schema;
    f.ngModelOptions = f.ngModelOptions || {};
    return f;
}
;
export function text(name, schema, options) {
    if (stripNullType(schema.type) === 'string' && !schema['enum']) {
        var f = stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'text';
        options.lookup[stringify(options.path)] = f;
        return f;
    }
}
export function number(name, schema, options) {
    if (stripNullType(schema.type) === 'number') {
        var f = stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'number';
        options.lookup[stringify(options.path)] = f;
        return f;
    }
}
export function integer(name, schema, options) {
    if (stripNullType(schema.type) === 'integer') {
        var f = stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'number';
        options.lookup[stringify(options.path)] = f;
        return f;
    }
}
export function checkbox(name, schema, options) {
    if (stripNullType(schema.type) === 'boolean') {
        var f = stdFormObj(name, schema, options);
        f.key = options.path;
        f.type = 'checkbox';
        options.lookup[stringify(options.path)] = f;
        return f;
    }
}
export function select(name, schema, options) {
    if (stripNullType(schema.type) === 'string' && schema['enum']) {
        var f = stdFormObj(name, schema, options);
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
        var f = stdFormObj(name, schema, options);
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
        var f_1 = stdFormObj(name, schema, options);
        f_1.type = 'fieldset';
        f_1.key = options.path;
        f_1.items = [];
        options.lookup[stringify(options.path)] = f_1;
        if (schema.properties) {
            Object.keys(schema.properties).forEach(function (key) {
                var value = schema.properties[key];
                var path = options.path.slice();
                path.push(key);
                if (options.ignore[stringify(path)] !== true) {
                    var required = schema.required && schema.required.indexOf(key) !== -1;
                    var def = defaultFormDef(key, value, {
                        path: path,
                        required: required || false,
                        lookup: options.lookup,
                        ignore: options.ignore,
                        global: options.global
                    });
                    if (def) {
                        f_1.items.push(def);
                    }
                }
            });
        }
        return f_1;
    }
}
export function array(name, schema, options, defaultFormDef) {
    if (stripNullType(schema.type) === 'array') {
        var f = stdFormObj(name, schema, options);
        f.type = 'array';
        f.key = options.path;
        options.lookup[stringify(options.path)] = f;
        var required = schema.required &&
            schema.required.indexOf(options.path[options.path.length - 1]) !== -1;
        var arrPath = options.path.slice();
        arrPath.push('');
        f.items = [
            defaultFormDef(name, schema.items, {
                path: arrPath,
                required: required || false,
                lookup: options.lookup,
                ignore: options.ignore,
                global: options.global
            })
        ];
        return f;
    }
}
export function createDefaults() {
    return {
        string: [select, text],
        object: [fieldset],
        number: [number],
        integer: [integer],
        boolean: [checkbox],
        array: [checkboxes, array]
    };
}
;
export function defaultForm(schema, defaultSchemaTypes, ignore, globalOptions) {
    var form = [];
    var lookup = {};
    ignore = ignore || {};
    globalOptions = globalOptions || {};
    defaultSchemaTypes = defaultSchemaTypes || createDefaults();
    if (schema.properties) {
        Object.keys(schema.properties).forEach(function (key) {
            if (ignore[key] !== true) {
                var required = schema.required && schema.required.indexOf(key) !== -1;
                var def = defaultFormDefinition(defaultSchemaTypes, key, schema.properties[key], {
                    path: [key],
                    lookup: lookup,
                    ignore: ignore,
                    required: required,
                    global: globalOptions
                });
                if (def) {
                    form.push(def);
                }
            }
        });
    }
    else {
        throw new Error('Not implemented. Only type "object" allowed at root level of schema.');
    }
    return { form: form, lookup: lookup };
}
//# sourceMappingURL=../../../src/lib/schema-defaults.js.map