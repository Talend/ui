import { mock } from '@talend/react-cmf';
import { List, Map } from 'immutable';

import Container from './SelectObject.container';
import Connected, { mapStateToProps } from './SelectObject.connect';

describe('Connected SelectObject', () => {
	it('should connect SelectObject', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = mock.store.state();
		const data = new List([new Map({ label: 'foo' }), new Map({ label: 'bar' })]);
		state.cmf.collections = new Map({
			width: new Map({ data }),
		});
		state.cmf.components = new Map({
			'Container(FilterBar)': new Map({
				test: new Map({ query: 'foo' }),
			}),
			'Container(Tree)': new Map({
				test: new Map({ selectedId: '27' }),
			}),
		});
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
