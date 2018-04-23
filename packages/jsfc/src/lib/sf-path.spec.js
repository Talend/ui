import chai from 'chai';
import { describe, it } from 'mocha';
import { parse, stringify, normalize, name } from './sf-path';

chai.should();

describe('sf-path.js', () => {
	it('should hold functions for working with object paths and keys', () => {
		parse.should.be.an('function');
		stringify.should.be.an('function');
		normalize.should.be.an('function');
		name.should.be.an('function');
	});

	// describe('parse', () => {
	//   it('should ', () => {
	//     should.be.eq();
	//   });
	// });
	//
	// describe('stringify', () => {
	//   it('should ', () => {
	//     should.be.eq();
	//   });
	// });
	//
	// describe('normalize', () => {
	//   it('should ', () => {
	//     should.be.eq();
	//   });
	// });
	//
	// describe('name', () => {
	//   it('should ', () => {
	//     should.be.eq();
	//   });
	// });
});
