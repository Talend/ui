import { fireEvent, render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import Container, { DEFAULT_STATE, DISPLAY_NAME } from './FilterBar.container';
import Connected from './FilterBar.connect';
import { getComponentState, getQuery } from './FilterBar.selectors';

/**
 * Returns a plain-object shim with the Immutable.Map interface required by FilterBar.container
 * and FilterBar.selectors (production code still uses Immutable).
 * Only implements the subset of Immutable.Map used in these tests.
 */
const makeState = (obj = {}) => ({
	_data: { ...obj },
	get(key, def) {
		const val = this._data[key];
		return val !== undefined ? val : def;
	},
	set(key, val) {
		return makeState({ ...this._data, [key]: val });
	},
	has(key) {
		return key in this._data;
	},
	hasIn([key, ...rest]) {
		if (!(key in this._data)) return false;
		const val = this._data[key];
		if (!rest.length) return true;
		return val && typeof val.hasIn === 'function' ? val.hasIn(rest) : rest[0] in (val || {});
	},
	getIn([key, ...rest]) {
		const val = this._data[key];
		if (!rest.length) return val;
		if (val && typeof val.getIn === 'function') return val.getIn(rest);
		return (val || {})[rest[0]];
	},
});

describe('Filter connected', () => {
	it('should connect filter', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});

describe('Filter container', () => {
	it('should render', () => {
		const props = {
			docked: false,
			value: 'a filter',
			navbar: true,
			dockable: true,
			collectionToFilter: 'myCollectionToFilter',
			onFilter: () => jest.fn(),
			t: () => jest.fn(),
		};
		const { container } = render(<Container {...props} />);
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should call setState when onFilter event trigger', () => {
		const props = {
			onFilter: jest.fn(),
			setState: jest.fn(),
			state: makeState({ docked: false }),
		};
		render(<Container {...props} />);
		const query = 'foo';
		fireEvent.change(document.querySelector('input'), { target: { value: query } });
		expect(props.setState).toHaveBeenCalledWith({ query });
	});
	it('should call onFilter when onFilter event trigger', async () => {
		const props = {
			onFilter: jest.fn(),
			setState: jest.fn(),
			state: makeState({ docked: false }),
		};
		const query = 'foo';
		render(<Container {...props} />);
		fireEvent.focus(screen.getByRole('search'));
		fireEvent.change(document.querySelector('input'), { target: { value: query } });
		expect(props.onFilter).toHaveBeenCalledWith(expect.anything(), {
			query,
			props: {
				dockable: true,
				...props,
			},
		});
	});
	it('should call onBlur when onBlur event trigger', () => {
		const props = {
			onBlur: jest.fn(),
			setState: jest.fn(),
			state: makeState({ docked: false }),
		};
		render(<Container {...props} />);
		fireEvent.blur(document.querySelector('input'));
		expect(props.onBlur).toHaveBeenCalled();
	});
	it('should call onFocus when onFocus event trigger', () => {
		const props = {
			onBlur: jest.fn(),
			setState: jest.fn(),
			state: makeState({ docked: false }),
			onFocus: jest.fn(),
		};
		render(<Container {...props} />);
		fireEvent.focus(document.querySelector('input'));
		expect(props.onFocus).toHaveBeenCalled();
	});
	it('should call setState when onToggle event trigger', () => {
		const state = makeState({ docked: false });
		const prevState = { state };
		const setState = jest.fn(fn => {
			prevState.state = fn(prevState);
		});
		const props = {
			setState,
			state,
			dockable: true,
			onToggle: jest.fn(),
		};
		render(<Container {...props} />);
		fireEvent.blur(document.querySelector('input'));
		expect(props.setState).toHaveBeenCalled();
		expect(prevState.state).not.toBe(state);
		expect(prevState.state.get('docked')).toBe(true);
		expect(props.onToggle).toHaveBeenCalled();
	});
});

describe('Filter Selectors', () => {
	it('should return the filter component state', () => {
		const componentState = makeState({
			query: 'Toto was here',
			docked: true,
		});
		const state = {
			cmf: {
				components: makeState({ [DISPLAY_NAME]: makeState({ myFilterComponent: componentState }) }),
			},
		};
		expect(getComponentState(state, 'myFilterComponent')).toEqual(componentState);
	});
	it('should return the default filter component state', () => {
		const state = {
			cmf: {
				components: makeState(),
			},
		};
		expect(getComponentState(state, 'myFilterComponent')).toEqual(DEFAULT_STATE);
	});
	it('should return the query', () => {
		const componentState = makeState({
			query: 'Hello world',
			docked: true,
		});
		const state = {
			cmf: {
				components: makeState({ [DISPLAY_NAME]: makeState({ myFilterComponent: componentState }) }),
			},
		};
		expect(getQuery(state, 'myFilterComponent')).toEqual('Hello world');
	});
});
