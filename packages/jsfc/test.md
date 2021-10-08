# TOC
   - [merge.js](#mergejs)
     - [merge](#mergejs-merge)
   - [schema-defaults.js](#schema-defaultsjs)
     - [createDefaults](#schema-defaultsjs-createdefaults)
     - [defaultForm](#schema-defaultsjs-defaultform)
<a name=""></a>
 
<a name="mergejs"></a>
# merge.js
should contain a function for merging schema and form definitions.

```js
_merge.merge.should.be.an('function');
```

<a name="mergejs-merge"></a>
## merge
should combine a schema and form definition, regardless of order.

```js
(0, _merge.merge)(schema, ['name', 'gender']).should.be.deep.equal(stdForm.form);
(0, _merge.merge)(schema, ['gender']).should.be.deep.equal([stdForm.form[1]]);
(0, _merge.merge)(schema, ['gender', 'name']).should.be.deep.equal([stdForm.form[1], stdForm.form[0]]);
```

should handle a wildcard * in the form definition.

```js
(0, _merge.merge)(schema, ['*']).should.be.deep.equal(stdForm.form);
```

should allow items that are not in the schema.

```js
(0, _merge.merge)(schema, ['*', { type: 'fieldset' }]).should.be.deep.equal(stdForm.form.concat([{ type: 'fieldset' }]));
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

