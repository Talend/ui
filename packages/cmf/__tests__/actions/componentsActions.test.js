import {
	addComponentState,
	mergeComponentState,
	removeComponentState,
} from '../../src/actions/componentsActions';

describe('test component state management action creators', () => {
	it('addComponentState dispatch well formed action object', () => {
		expect(addComponentState(
			'componentName', 'key', { searchQuery: '' }
		)).toMatchSnapshot();
	});

	it('mergeComponentState dispatch well formed acton object', () => {
		expect(mergeComponentState(
				'componentName', 'key', { searchQuery: 'JSON' }
		)).toMatchSnapshot();
	});

	it('removeComponentState dispatch well formed acton object', () => {
		expect(removeComponentState('componentName', 'key')).toMatchSnapshot();
	});
});
