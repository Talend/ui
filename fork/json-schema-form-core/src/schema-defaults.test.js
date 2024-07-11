import { select } from './select';

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
		expect(typeof select).toBe('function');
	});

	describe('select', () => {
		it('should get a value from an object', () => {
			let value = select('frienemies[1].weapon.boomstick.method[0]', data);
			expect(value).toBe('boom');
		});

		it('should set a value on an object', () => {
			let value = select('weapon.glove.method[1]', data, 'slice');
			expect(value).toBe('slice');
			expect(data.weapon.glove.method[1]).toBe('slice');
			expect(data.weapon.glove.method).toEqual(['stab', 'slice']);
		});

		it('should create any undefined objects or arrays in the path when setting a value', () => {
			let data = {};
			let value = select('property.array[1].value', data, 'something');
			expect(data).toMatchObject({
				property: {
					array: [, { value: 'something' }],
				},
			});
			expect(value).toBe('something');
		});
	});
});
