import { mock } from '@talend/react-cmf';

import Container from './SelectObject.container';
import Connected, { mapStateToProps } from './SelectObject.connect';

describe('Connected SelectObject', () => {
	it('should connect SelectObject', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = mock.store.state();
		const data = [{ label: 'foo' }, { label: 'bar' }];
		state.cmf.collections = { width: { data } };
		state.cmf.components = {
			'Container(FilterBar)': { test: { query: 'foo' } },
			'Container(Tree)': { test: { selectedId: '27' } },
		};
		const props = mapStateToProps(state, {
			id: 'test',
			nameAttr: 'label',
			source: 'width.data',
			tree: { extra: true },
		});
		expect(typeof props).toBe('object');
		expect(props).toEqual({
			query: 'foo',
			sourceData: data,
			tree: {
				extra: true,
				nameAttr: 'label',
			},
		});
	});
});
