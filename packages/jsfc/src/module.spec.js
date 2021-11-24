import chai from 'chai';
import { describe, it } from 'mocha';
import {
	merge,
	select,
	traverseSchema,
	traverseForm,
	validate,
	sfPath,
	schemaDefaults,
	canonicalTitleMap,
	jsonref,
} from '.';

chai.should();

describe('module.js', () => {
	it('should hold all the public functions of the API', () => {
		merge.should.be.an('function');
		select.should.be.an('function');
		traverseSchema.should.be.an('function');
		traverseForm.should.be.an('function');
		validate.should.be.an('function');
		sfPath.should.be.an('object');
		schemaDefaults.should.be.an('object');
		canonicalTitleMap.should.be.an('function');
		jsonref.should.be.an('function');
	});
});
