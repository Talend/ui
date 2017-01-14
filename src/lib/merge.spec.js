import chai from 'chai';
import { describe, it} from 'mocha';
import { defaultForm, createDefaults } from './schema-defaults';
import { merge } from './merge';

chai.should();

// describe('merge.js', () => {
//   it('should hold functions for generating a default form schema from defaults it creates', () => {
//     defaultForm.should.be.an('function');
//     createDefaults.should.be.an('function');
//   });
//
//   describe('createDefaults', () => {
//     it('should create default rules', () => {
//       const rules = createDefaults();
//       rules.should.be.an('object');
//     });
//   });
// });

describe('merge.js', () => {
  const schema = {
    "type": "object",
    "properties": {
      "name": {
        "title": "Name",
        "description": "Gimme yea name lad",
        "type": "string"
      },
      "gender": {
        "readOnly": true,
        "title": "Choose",
        "type": "string",
        "enum": [
          "undefined",
          "null",
          "NaN",
        ]
      }
    }
  };

  const stdForm = defaultForm(schema, createDefaults());

  it('should contain a function for merging schema and form definitions', () => {
    merge.should.be.an('function');
  })

  describe('merge', () => {
    it('should combine a schema and form definition, regardless of order', () => {
      merge(schema, ['name','gender']).should.be.deep.equal(stdForm.form);
      merge(schema, ['gender']).should.be.deep.equal([stdForm.form[1]]);
      merge(schema, ['gender','name']).should.be.deep.equal([stdForm.form[1],stdForm.form[0]]);
    });

    it('should handle a wildcard * in the form definition', () => {
      merge(schema, ['*']).should.be.deep.equal(stdForm.form);
    });

    it('should allow items that are not in the schema', () => {
      merge(schema, ['*', { type:'fieldset' }]).should.be.deep.equal(stdForm.form.concat([{ type:'fieldset' }]));
    });
  });
/**
  it('should translate "readOnly" in schema to "readonly" on the merged form defintion', () => {
    inject(function(schemaForm){
      var schema = {
        "type": "object",
        "properties": {
          "name": {
            "title": "Name",
            "description": "Gimme yea name lad",
            "type": "string"
          },
          "gender": {
            "readOnly": true,
            "title": "Choose",
            "type": "string",
            "enum": [
              "undefined",
              "null",
              "NaN",
            ]
          }
        }
      };

      var merged = schemaForm.merge(schema, ['gender']);
      merged[0].should.have.property('readonly');
      merged[0].readonly.should.eq(true)
    });
  });

  it('should push readOnly in schema down into objects and arrays', () => {
    inject(function(schemaForm) {
      var schema = {
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

      var merged = schemaForm.merge(schema, ['*']);

      //sub
      merged[0].should.have.property('readonly');
      merged[0].readonly.should.eq(true);

      //array
      merged[0].items[0].should.have.property('readonly');
      merged[0].items[0].readonly.should.eq(true);

      //array items
      merged[0].items[0].items[0].should.have.property('readonly');
      merged[0].items[0].items[0].readonly.should.eq(true);

    });
  });

  it('should push readonly in form def down into objects and arrays', () => {
    inject(function(schemaForm) {
      var schema = {
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

      var merged = schemaForm.merge(schema, [{key: 'sub', readonly: true}]);

      //sub
      merged[0].should.have.property('readonly');
      merged[0].readonly.should.eq(true);

      //array
      merged[0].items[0].should.have.property('readonly');
      merged[0].items[0].readonly.should.eq(true);

      //array items
      merged[0].items[0].items[0].should.have.property('readonly');
      merged[0].items[0].items[0].readonly.should.eq(true);

    });
  });
*/
});
