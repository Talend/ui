import chai from 'chai';
import { describe, it } from 'mocha';
import { select } from './select';

chai.should();

describe('select.js', () => {
	const data = {
		name: 'Freddy',
		weapon: {
			glove: {
				method: ['stab'],
			},
		},
		frienemies: [
			{
				name: 'Jason',
				weapon: {
					machette: {
						method: ['slash'],
					},
				},
			},
			{
				name: 'Ash Williams',
				weapon: {
					boomstick: {
						method: ['boom'],
					},
					chainsaw: {
						method: ['hack', 'slash', 'lop'],
					},
				},
			},
		],
	};

	it('should provide a function for getting and setting an object value', () => {
		select.should.be.an('function');
	});

	describe('select', () => {
		it('should get a value from an object', () => {
			let value = select('frienemies[1].weapon.boomstick.method[0]', data);
			value.should.eq('boom');
		});

		it('should set a value on an object', () => {
			let value = select('weapon.glove.method[1]', data, 'slice');
			data.weapon.glove.method.should.be.deep.equal(['stab', 'slice']);
		});

		it('should create any undefined objects or arrays in the path when setting a value', () => {
			let data = {};
			let value = select('property.array[1].value', data, 'something');
			data.should.be.deep.equal({
				property: {
					array: [, { value: 'something' }],
				},
			});
		});
	});
});
