import { screen, render, fireEvent } from '@testing-library/react';
import { mock } from '@talend/react-cmf';
import TreeView, {
	DEFAULT_STATE,
	DEFAULT_PROPS,
	transform,
	mapStateToProps,
} from './TreeView.container';

describe('TreeView', () => {
	let context;
	let state;
	let data;

	beforeEach(() => {
		context = mock.store.context();
		state = mock.store.state();
		data = [
			{ id: 1, name: 'foo', children: [{ id: 11, name: 'fofo', childre: [] }] },
			{ id: 2, name: 'bar', children: [] },
		];
		context.store.getState = () => state;
	});

	it('should render', () => {
		const { container } = render(<TreeView.WrappedComponent id="my-treeview" data={data} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should select element', () => {
		// given
		const prevState = {
			state: DEFAULT_STATE,
		};
		const setState = jest.fn(fn => {
			prevState.state = fn(prevState);
		});
		const dispatchActionCreator = jest.fn();
		const onSelect = jest.fn();
		const onSelectActionCreator = 'my:action';
		const props = {
			id: 'my-treeview',
			setState,
			dispatchActionCreator,
			data,
			onSelect,
			onSelectActionCreator,
		};
		render(<TreeView.WrappedComponent {...props} />);

		// when
		fireEvent.click(screen.getByText('foo'));

		// then
		expect(setState).toHaveBeenCalled();
		expect(prevState.state).not.toBe(DEFAULT_STATE);
		expect(prevState.state.selectedId).toEqual(1);
		expect(onSelect).toHaveBeenCalledWith(expect.anything());
		expect(dispatchActionCreator).toHaveBeenCalled();
		expect(dispatchActionCreator.mock.calls[0][0]).toBe(onSelectActionCreator);
		expect(dispatchActionCreator.mock.calls[0][1].props).toMatchObject(props);
		expect(dispatchActionCreator.mock.calls[0][2]).toEqual(expect.anything());
	});

	it('should open/close on toggle', () => {
		const prevState = {
			state: DEFAULT_STATE,
		};
		const setState = jest.fn(fn => {
			const res = fn(prevState);
			prevState.state = res;
		});
		const props = {
			id: 'my-treeview',
			setState,
			data,
		};
		render(<TreeView.WrappedComponent {...props} />);

		// when
		fireEvent.click(document.querySelector('button'));

		// then
		expect(setState).toHaveBeenCalled();
		expect(prevState.state).not.toBe(DEFAULT_STATE);
		expect(prevState.state.opened).toEqual([1]);

		// when
		fireEvent.click(document.querySelector('button'));

		// then
		expect(setState.mock.calls.length).toBe(2);
		expect(prevState.state.opened).toEqual([]);
	});

	it('should setState onSelect', () => {
		const prevState = {
			state: DEFAULT_STATE,
		};
		const setState = jest.fn(fn => {
			prevState.state = fn(prevState);
		});
		const dispatchActionCreator = jest.fn();
		const onSelect = jest.fn();
		const onSelectActionCreator = 'my:action';
		const props = {
			id: 'my-treeview',
			setState,
			dispatchActionCreator,
			data,
			onSelect,
			onSelectActionCreator,
		};
		render(<TreeView.WrappedComponent {...props} />);
		fireEvent.click(screen.getByText('foo'));
		expect(setState).toHaveBeenCalled();
		expect(prevState.state).not.toBe(DEFAULT_STATE);
		expect(prevState.state.selectedId).toEqual(1);
		expect(onSelect).toHaveBeenCalledWith(expect.anything());
		expect(dispatchActionCreator).toHaveBeenCalled();
		expect(dispatchActionCreator.mock.calls[0][0]).toBe(onSelectActionCreator);
		expect(dispatchActionCreator.mock.calls[0][1].props).toMatchObject(props);
		expect(dispatchActionCreator.mock.calls[0][2]).toEqual(expect.anything());
	});

	it('should unselect onSelect twice', () => {
		// given
		const prevState = {
			state: DEFAULT_STATE,
		};
		const setState = jest.fn(fn => {
			prevState.state = fn(prevState);
		});
		const onSelect = jest.fn();
		const props = {
			id: 'my-treeview',
			setState,
			data,
			onSelect,
		};
		render(<TreeView.WrappedComponent {...props} />, { context });

		// when
		fireEvent.click(screen.getByText('foo'));

		// then
		expect(setState).toHaveBeenCalled();
		expect(prevState.state).not.toBe(DEFAULT_STATE);
		expect(prevState.state.selectedId).toEqual(1);
		expect(onSelect).toHaveBeenCalledWith(expect.anything());

		// when
		fireEvent.click(screen.getByText('foo'));

		// then
		expect(prevState.state.selectedId).toBe();
	});
});

describe('mapStateToProps', () => {
	it('should return props', () => {
		const state = mock.store.state();
		const barList = [{ foo: 'bar' }];
		const data = { foo: { bar: barList } };
		state.cmf.collections = { ...state.cmf.collections, data };
		const props = mapStateToProps(state, { collection: 'data.foo.bar' });
		expect(props.data).toBe(barList);
	});
});

describe('transform', () => {
	it('should return undefined if no items', () => {
		expect(transform()).toBeUndefined();
	});

	it('should add toggled booleans', () => {
		const props = {
			...DEFAULT_PROPS,
			state: {
				opened: [1, 11, 111],
				selectedId: 11,
			},
		};
		const items = [
			{
				id: 1,
				name: '1',
				children: [
					{
						id: 11,
						name: '11',
						children: [{ id: 111, name: '111' }],
					},
				],
			},
			{
				id: 2,
				name: '2',
			},
		];
		const structure = transform(items, props);
		expect(structure[0].id).toBe(1);
		expect(structure[0].isOpened).toBe(true);
		expect(structure[0].children[0].id).toBe(11);
		expect(structure[0].children[0].isOpened).toBe(true);
	});

	it("should unfold selected's parents", () => {
		const props = {
			...DEFAULT_PROPS,
			state: {
				opened: [1, 11, 111],
				selectedId: 111,
			},
		};
		const items = [
			{
				id: 1,
				name: '1',
				children: [
					{
						id: 11,
						name: '11',
						children: [{ id: 111, name: '1111' }],
					},
				],
			},
			{
				id: 2,
				name: '2',
			},
		];

		const structure = transform(items, props);
		expect(structure[0].isOpened).toBe(true);
		expect(structure[0].children[0].isOpened).toBe(true);
		expect(structure[0].children[0].children[0].isOpened).toBe(true);
		expect(structure[1].isOpened).toBe(false);
	});
});
