import { convertValue, flattenProperties, getValue, mutateValue } from './properties';

describe('Properties utils', () => {
	describe('#getValue', () => {
		it('should return undefined when key is falsy', () => {
			// given
			const properties = {
				user: {
					firstname: 'toto',
					lastname: 'tata',
				},
			};

			// when
			const value = getValue(properties, {});

			// then
			expect(value).toBeUndefined();
		});

		it('should return the requested value', () => {
			// given
			const properties = {
				user: {
					firstname: 'toto',
					lastname: 'tata',
				},
			};
			const key = ['user', 'firstname'];

			// when
			const value = getValue(properties, { key });

			// then
			expect(value).toBe('toto');
		});
	});

	describe('#convertValue', () => {
		it('should return the original value', () => {
			// given
			const value = '3';

			// when
			const convertedValue = convertValue('unknown', value);

			// then
			expect(convertedValue).toBe(value);
		});

		it('should convert to number value', () => {
			// given
			const value = '3.5';

			// when
			const convertedValue = convertValue('number', value);

			// then
			expect(convertedValue).toBe(3.5);
		});

		it('should convert empty number to undefined value', () => {
			const value = '';

			const convertedValue = convertValue('number', value);

			expect(convertedValue).toBeUndefined();
		});

		it('should convert empty string to undefined value', () => {
			const value = '';

			const convertedValue = convertValue('string', value);

			expect(convertedValue).toBeUndefined();
		});
	});

	describe('#mutateValue', () => {
		it('should return the modified properties', () => {
			// given
			const properties = {
				user: {
					firstname: 'toto',
					lastname: 'tata',
				},
			};
			const key = ['user', 'firstname'];

			// when
			const value = mutateValue(properties, { key }, 'titi');

			// then
			expect(value).toEqual({
				user: {
					firstname: 'titi',
					lastname: 'tata',
				},
			});
		});

		it('should add a value, creating nested objects', () => {
			// given
			const key = ['user', 'firstname'];

			// when
			const value = mutateValue(undefined, { key }, 'titi');

			// then
			expect(value).toEqual({
				user: {
					firstname: 'titi',
				},
			});
		});

		it('should delete the value', () => {
			// given
			const properties = {
				user: {
					firstname: 'toto',
					lastname: 'tata',
				},
			};
			const key = ['user', 'firstname'];

			// when
			const value = mutateValue(properties, { key }, undefined);

			// then
			expect(value).toEqual({
				user: {
					lastname: 'tata',
				},
			});
		});
	});

	describe('#flattenProperties', () => {
		it('should handle object and arrays', () => {
			// given
			const properties = {
				$datasetMetadata: {
					name: 'test payload',
				},
				configuration: {
					connection: {
						parameters: [{ key: 'debug', value: '4' }],
					},
				},
				$remoteEngineId: 'test-id',
			};
			// when
			const value = flattenProperties(properties);

			// then
			expect(value).toEqual({
				$remoteEngineId: 'test-id',
				'datasetMetadata.name': 'test payload',
				'figuration.connection.parameters[0].key': 'debug',
				'figuration.connection.parameters[0].value': '4',
			});
		});
		it('should handle primitive types', () => {
			expect(flattenProperties(null));
			expect(flattenProperties('flat')).toEqual('flat');
		});
	});
});
