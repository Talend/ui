import getDataAttrFromProps from './getDataAttrFromProps';

describe('getDataAttrFromProps tests', () => {
	it('should get only data attributes from props', () => {
		const props = {
			key: 'a',
			id: 'b',
			other: 'c',
			'data-test': 'd',
			'data-feature': 'e',
		};
		expect(getDataAttrFromProps(props)).toEqual({
			'data-test': 'd',
			'data-feature': 'e',
		});
	});
});
