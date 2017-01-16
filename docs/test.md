# TOC
   - [canonical-title-map.js](#canonical-title-mapjs)
     - [canonicalTitleMap](#canonical-title-mapjs-canonicaltitlemap)
   - [merge.js](#mergejs)
     - [merge](#mergejs-merge)
   - [select.js](#selectjs)
     - [select](#selectjs-select)
   - [schema-defaults.js](#schema-defaultsjs)
     - [createDefaults](#schema-defaultsjs-createdefaults)
     - [defaultForm](#schema-defaultsjs-defaultform)
   - [sf-path.js](#sf-pathjs)
   - [traverse.js](#traversejs)
   - [validate.js](#validatejs)
     - [validate](#validatejs-validate)
   - [module.js](#modulejs)
<a name=""></a>
 
<a name="canonical-title-mapjs"></a>
# canonical-title-map.js
should hold a normalisation function for enums and titleMaps to generate titleMaps.

```js
_canonicalTitleMap2.default.should.be.an('function');
```

<a name="canonical-title-mapjs-canonicaltitlemap"></a>
## canonicalTitleMap
should return a titleMap for a titleMap object with original enum.

```js
var result = (0, _canonicalTitleMap2.default)(titlemapObj, enumeration);
result.should.be.deep.equal(titlemap);
```

should return a titleMap for a titleMap list with original enum.

```js
var result = (0, _canonicalTitleMap2.default)(titlemap, enumeration);
result.should.be.deep.equal(titlemap);
```

should return a titleMap for a titleMap object without enum.

```js
var result = (0, _canonicalTitleMap2.default)(titlemapObj);
result.should.be.deep.equal(titlemap);
```

should return a titleMap for a titleMap list without enum.

```js
var result = (0, _canonicalTitleMap2.default)(titlemap);
result.should.be.deep.equal(titlemap);
```

should return a titleMap for a titleMap object with original enum, returning "undefined" name if the enum value is not found.

```js
enumeration.push('Mr Freeze');
var result = (0, _canonicalTitleMap2.default)(titlemapObj, enumeration);
titlemap.push({
  "name": undefined,
  "value": "Mr Freeze"
});
result.should.be.deep.equal(titlemap);
```

<a name="mergejs"></a>
# merge.js
should contain a function for merging schema and form definitions.

```js
_merge.merge.should.be.an('function');
```

<a name="mergejs-merge"></a>
## merge
should handle a schema lookup or schema for first argument.

```js
(0, _merge.merge)(stdForm.lookup, ['name', 'shoe', 'gender']).should.be.deep.equal(stdForm.form);
(0, _merge.merge)(schema, ['*']).should.be.deep.equal(stdForm.form);
```

should handle a wildcard * in the form definition.

```js
(0, _merge.merge)(schema, ['*']).should.be.deep.equal(stdForm.form);
```

should not handle a wildcard * if the schema is a lookup.

```js
(0, _merge.merge)(stdForm.lookup, ['*']).should.not.be.deep.equal(stdForm.form);
```

should combine a schema and form definition, regardless of order.

```js
(0, _merge.merge)(schema, ['name', 'shoe', 'gender']).should.be.deep.equal(stdForm.form);
(0, _merge.merge)(schema, ['gender']).should.be.deep.equal([stdForm.form[2]]);
(0, _merge.merge)(schema, ['gender', 'name']).should.be.deep.equal([stdForm.form[2], stdForm.form[0]]);
```

should allow items that are not in the schema.

```js
(0, _merge.merge)(schema, ['*', { type: 'fieldset' }]).should.be.deep.equal(stdForm.form.concat([{ type: 'fieldset' }]));
```

should translate "readOnly" in schema to "readonly" on the merged form defintion.

```js
var merged = (0, _merge.merge)(schema, ['gender']);
merged[0].should.have.property('readonly');
merged[0].readonly.should.eq(true);
```

should push readOnly in schema down into objects and arrays.

```js
var subschema = {
  'type': 'object',
  'readOnly': true,
  'properties': {
    'sub': {
      'type': 'object',
      'properties': {
        'array': {
          'type': 'array',
          'items': {
            'type': 'object',
            'properties': {
              'foo': {
                'type': 'string'
              }
            }
          }
        }
      }
    }
  }
};
var merged = (0, _merge.merge)(subschema, ['*']);
//sub
merged[0].should.have.property('readonly');
merged[0].readonly.should.eq(true);
//array
merged[0].items[0].should.have.property('readonly');
merged[0].items[0].readonly.should.eq(true);
//array items
merged[0].items[0].items[0].should.have.property('readonly');
merged[0].items[0].items[0].readonly.should.eq(true);
```

should push readonly in form def down into objects and arrays.

```js
var subschema = {
  'type': 'object',
  'properties': {
    'sub': {
      'type': 'object',
      'properties': {
        'array': {
          'type': 'array',
          'items': {
            'type': 'object',
            'properties': {
              'foo': {
                'type': 'string'
              }
            }
          }
        }
      }
    }
  }
};
var merged = (0, _merge.merge)(subschema, [{ key: 'sub', readonly: true }]);
//sub
merged[0].should.have.property('readonly');
merged[0].readonly.should.eq(true);
//array
merged[0].items[0].should.have.property('readonly');
merged[0].items[0].readonly.should.eq(true);
//array items
merged[0].items[0].items[0].should.have.property('readonly');
merged[0].items[0].items[0].readonly.should.eq(true);
```

<a name="selectjs"></a>
# select.js
should provide a function for getting and setting an object value.

```js
_select.select.should.be.an('function');
```

<a name="selectjs-select"></a>
## select
should get a value from an object.

```js
var value = (0, _select.select)('frienemies[1].weapon.boomstick.method[0]', data);
value.should.eq('boom');
```

should set a value on an object.

```js
var value = (0, _select.select)('weapon.glove.method[1]', data, 'slice');
data.weapon.glove.method.should.be.deep.equal(['stab', 'slice']);
```

should create any undefined objects or arrays in the path when setting a value.

```js
var data = {};
var value = (0, _select.select)('property.array[1].value', data, 'something');
data.should.be.deep.equal({
  'property': {
    'array': [, { 'value': 'something' }]
  }
});
```

<a name="schema-defaultsjs"></a>
# schema-defaults.js
should hold functions for generating a default form schema from defaults it creates.

```js
_schemaDefaults.defaultForm.should.be.an('function');
_schemaDefaults.createDefaults.should.be.an('function');
```

<a name="schema-defaultsjs-createdefaults"></a>
## createDefaults
should create default rules.

```js
var rules = (0, _schemaDefaults.createDefaults)();
rules.should.be.an('object');
```

<a name="schema-defaultsjs-defaultform"></a>
## defaultForm
should generate default form def from a schema.

```js
var schema = {
  'type': 'object',
  'properties': {
    'name': {
      'title': 'Name',
      'description': 'Gimme yea name lad',
      'type': 'string'
    },
    'gender': {
      'title': 'Choose',
      'type': 'string',
      'enum': ['undefined', 'null', 'NaN']
    },
    'overEighteen': {
      'title': 'Are you over 18 years old?',
      'type': 'boolean',
      'default': false
    },
    'attributes': {
      'type': 'object',
      'required': ['eyecolor'],
      'properties': {
        'eyecolor': { 'type': 'string', 'title': 'Eye color' },
        'haircolor': { 'type': 'string', 'title': 'Hair color' },
        'shoulders': {
          'type': 'object',
          'title': 'Shoulders',
          'properties': {
            'left': { 'type': 'string' },
            'right': { 'type': 'string' }
          }
        }
      }
    }
  }
};
var form = [{
  'title': 'Name',
  'description': 'Gimme yea name lad',
  'schema': {
    'title': 'Name',
    'description': 'Gimme yea name lad',
    'type': 'string'
  },
  'ngModelOptions': {},
  'key': ['name'],
  'type': 'text'
}, {
  'title': 'Choose',
  'schema': {
    'title': 'Choose',
    'type': 'string',
    'enum': ['undefined', 'null', 'NaN']
  },
  'ngModelOptions': {},
  'key': ['gender'],
  'type': 'select',
  'titleMap': [{
    'name': 'undefined',
    'value': 'undefined'
  }, {
    'name': 'null',
    'value': 'null'
  }, {
    'name': 'NaN',
    'value': 'NaN'
  }]
}, {
  'title': 'Are you over 18 years old?',
  'schema': {
    'title': 'Are you over 18 years old?',
    'type': 'boolean',
    'default': false
  },
  'ngModelOptions': {},
  'key': ['overEighteen'],
  'type': 'checkbox'
}, {
  'title': 'attributes',
  'schema': {
    'type': 'object',
    'required': ['eyecolor'],
    'properties': {
      'eyecolor': {
        'type': 'string',
        'title': 'Eye color'
      },
      'haircolor': {
        'type': 'string',
        'title': 'Hair color'
      },
      'shoulders': {
        'type': 'object',
        'title': 'Shoulders',
        'properties': {
          'left': {
            'type': 'string'
          },
          'right': {
            'type': 'string'
          }
        }
      }
    }
  },
  'ngModelOptions': {},
  'key': ['attributes'],
  'type': 'fieldset',
  'items': [{
    'title': 'Eye color',
    'required': true,
    'schema': {
      'type': 'string',
      'title': 'Eye color'
    },
    'ngModelOptions': {},
    'key': ['attributes', 'eyecolor'],
    'type': 'text'
  }, {
    'title': 'Hair color',
    'schema': {
      'type': 'string',
      'title': 'Hair color'
    },
    'ngModelOptions': {},
    'key': ['attributes', 'haircolor'],
    'type': 'text'
  }, {
    'title': 'Shoulders',
    'schema': {
      'type': 'object',
      'title': 'Shoulders',
      'properties': {
        'left': {
          'type': 'string'
        },
        'right': {
          'type': 'string'
        }
      }
    },
    'ngModelOptions': {},
    'key': ['attributes', 'shoulders'],
    'type': 'fieldset',
    'items': [{
      'title': 'left',
      'schema': {
        'type': 'string'
      },
      'ngModelOptions': {},
      'key': ['attributes', 'shoulders', 'left'],
      'type': 'text'
    }, {
      'title': 'right',
      'schema': {
        'type': 'string'
      },
      'ngModelOptions': {},
      'key': ['attributes', 'shoulders', 'right'],
      'type': 'text'
    }]
  }]
}];
var f = (0, _schemaDefaults.defaultForm)(schema, (0, _schemaDefaults.createDefaults)());
f.form.should.be.deep.equal(form);
```

<a name="sf-pathjs"></a>
# sf-path.js
should hold functions for working with object paths and keys.

```js
_sfPath.parse.should.be.an('function');
_sfPath.stringify.should.be.an('function');
_sfPath.normalize.should.be.an('function');
_sfPath.name.should.be.an('function');
```

<a name="traversejs"></a>
# traverse.js
should hold functions for applying functions on branches of a json-schema or ui-schema.

```js
_traverse.traverseSchema.should.be.an('function');
_traverse.traverseForm.should.be.an('function');
```

<a name="validatejs"></a>
# validate.js
should hold a validation function for testing against tv4 until an option to pass in a validator is created.

```js
_validate.validate.should.be.an('function');
```

<a name="validatejs-validate"></a>
## validate
should return a result object {"error":null, "missing":[], "valid":true}, with valid set to true when the data is valid for the schema.

```js
var value = 'Batman';
var result = (0, _validate.validate)(form, value);
result.should.be.deep.equal({ "error": null, "missing": [], "valid": true });
```

should return an error object with a message "Invalid type: array (expected string)" when the data is not valid.

```js
var value = [0];
var result = (0, _validate.validate)(form, value);
result.error.message.should.eq("Invalid type: array (expected string)");
```

<a name="modulejs"></a>
# module.js
should hold all the public functions of the API.

```js
_module.merge.should.be.an('function');
_module.select.should.be.an('function');
_module.traverseSchema.should.be.an('function');
_module.traverseForm.should.be.an('function');
_module.validate.should.be.an('function');
_module.sfPath.should.be.an('object');
_module.schemaDefaults.should.be.an('object');
_module.canonicalTitleMap.should.be.an('function');
```

