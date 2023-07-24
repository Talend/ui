import { Map } from 'immutable';
import { screen, render, fireEvent } from '@testing-library/react';
import Container, { DEFAULT_STATE, DISPLAY_NAME } from './FilterBar.container';
import Connected from './FilterBar.connect';
import { getComponentState, getQuery } from './FilterBar.selectors';

jest.unmock('@talend/design-system');

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
			state: Map({ docked: false }),
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
			state: Map({ docked: false }),
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
			state: Map({ docked: false }),
		};
		render(<Container {...props} />);
		fireEvent.blur(document.querySelector('input'));
		expect(props.onBlur).toHaveBeenCalled();
	});
	it('should call onFocus when onFocus event trigger', () => {
		const props = {
			onBlur: jest.fn(),
			setState: jest.fn(),
			state: Map({ docked: false }),
			onFocus: jest.fn(),
		};
		render(<Container {...props} />);
		fireEvent.focus(document.querySelector('input'));
		expect(props.onFocus).toHaveBeenCalled();
	});
	it('should call setState when onToggle event trigger', () => {
		const state = Map({ docked: false });
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
		const componentState = Map({
			query: 'Toto was here',
			docked: true,
		});
		const state = {
			cmf: {
				components: Map({ [DISPLAY_NAME]: Map({ myFilterComponent: componentState }) }),
			},
		};
		expect(getComponentState(state, 'myFilterComponent')).toEqual(componentState);
	});
	it('should return the default filter component state', () => {
		const state = {
			cmf: {
				components: Map(),
			},
		};
		expect(getComponentState(state, 'myFilterComponent')).toEqual(DEFAULT_STATE);
	});
	it('should return the query', () => {
		const componentState = Map({
			query: 'Hello world',
			docked: true,
		});
		const state = {
			cmf: {
				components: Map({ [DISPLAY_NAME]: Map({ myFilterComponent: componentState }) }),
			},
		};
		expect(getQuery(state, 'myFilterComponent')).toEqual('Hello world');
	});
});
