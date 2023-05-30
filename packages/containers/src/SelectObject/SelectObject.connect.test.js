import { mock } from '@talend/react-cmf';
import Immutable from 'immutable';

import Container from './SelectObject.container';
import Connected, { mapStateToProps } from './SelectObject.connect';

jest.unmock('@talend/design-system');

describe('Connected SelectObject', () => {
	it('should connect SelectObject', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = mock.store.state();
		const data = new Immutable.List([
			new Immutable.Map({ label: 'foo' }),
			new Immutable.Map({ label: 'bar' }),
		]);
		state.cmf.collections = new Immutable.Map({
			width: new Immutable.Map({ data }),
		});
		state.cmf.components = new Immutable.Map({
			'Container(FilterBar)': new Immutable.Map({
				test: new Immutable.Map({ query: 'foo' }),
			}),
			'Container(Tree)': new Immutable.Map({
				test: new Immutable.Map({ selectedId: '27' }),
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
