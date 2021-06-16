import merge from './merge';

/* eslint-disable react/prop-types */

describe('default merge', () => {
	it('should return default uiSpecs props', () => {
		expect(merge({}, [])).toEqual({
			jsonSchema: {},
			uiSchema: [],
			mergedSchema: [],
		});
	});
});
