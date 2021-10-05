import {
	addState,
	mergeState,
	removeState,
} from '../../src/actions/componentsActions';

describe('test component state management action creators', () => {
	it('addState dispatch well formed action object', () => {
		expect(addState(
			'componentName', 'key', { searchQuery: '' }
		)).toMatchSnapshot();
	});

	it('mergeState dispatch well formed acton object', () => {
		expect(mergeState(
				'componentName', 'key', { searchQuery: 'JSON' }
		)).toMatchSnapshot();
	});

	it('removeState dispatch well formed acton object', () => {
		expect(removeState('componentName', 'key')).toMatchSnapshot();
	});
});
