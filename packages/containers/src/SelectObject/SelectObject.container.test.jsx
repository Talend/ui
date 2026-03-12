/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { screen, render, fireEvent } from '@testing-library/react';
import { mock } from '@talend/react-cmf';
// eslint-disable-next-line @talend/import-depth
import { prepareCMF } from '@talend/react-cmf/lib/mock/rtl';

import Container, { getById, filter, filterAll } from './SelectObject.container';

vi.mock('./SelectObject.component', () => ({
	default: ({ getProps, ...props }) => (
		<div data-testid="SelectObject">
			<button onClick={() => getProps(props)}>getProps</button>
		</div>
	),
}));

describe('Container SelectObject', () => {
	it('should render', () => {
		const context = mock.store.context();
		const { container } = render(
			<mock.Provider {...context}>
				<Container />
			</mock.Provider>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should default props with Tree map the selectedId', async () => {
		const tree = {};
		const getProps = jest.fn();
		const item = { id: '1', name: 'foo' };
		const sourceData = [item];
		render(
			await prepareCMF(
				<Container tree={tree} selectedId="1" sourceData={sourceData} getProps={getProps} />,
			),
		);
		fireEvent.click(screen.getByText('getProps'));
		const props = getProps.mock.calls[0][0];
		expect(props).toEqual({
			breadCrumbsRootLabel: 'root',
			idAttr: 'id',
			nameAttr: 'name',
			preview: undefined,
			selected: item,
			selectedId: '1',
			sourceData: [item],
			tree: {
				onSelect: expect.anything(),
				selectedId: '1',
			},
		});
	});
	it('should set selectedId props to the only matched item if nothing selected', async () => {
		const getProps = jest.fn();
		const tree = {};
		const item1 = { id: '1', name: 'foo' };
		const item2 = { id: '2', name: 'bar' };
		const sourceData = [item1, item2];

		render(
			await prepareCMF(
				<Container tree={tree} sourceData={sourceData} query="f" getProps={getProps} />,
			),
		);
		fireEvent.click(screen.getByText('getProps'));
		const props = getProps.mock.calls[0][0];
		expect(props).toMatchObject({
			breadCrumbsRootLabel: 'root',
			idAttr: 'id',
			nameAttr: 'name',
			query: 'f',
			selected: item1,
			sourceData,
			filteredData: expect.any(Array),
			results: {
				idAttr: 'id',
				nameAttr: 'name',
				onClick: expect.anything(),
				selectedId: '1',
			},
		});
		expect(props.filteredData).toEqual([{ ...item1, currentPosition: 'root' }]);
	});
	it('should call props.setState when onTreeClick is called', () => {
		const props = { idAttr: 'id', setState: jest.fn() };
		const instance = new Container(props);
		const data = { id: '1', name: 'foo' };
		instance.onTreeClick(data);
		expect(props.setState).toHaveBeenCalledWith({ selectedId: '1' });
	});
	it('should call props.setState when onTreeClick is called', () => {
		const props = { idAttr: 'id', setState: jest.fn() };
		const instance = new Container(props);
		const data = { id: '1', name: 'foo' };
		instance.onTreeClick(data);
		expect(props.setState).toHaveBeenCalledWith({ selectedId: '1' });
	});
	it('should call filter and getById', () => {
		const props = {
			sourceData: [],
			query: 'query',
			selectedId: 1,
		};
		const instance = new Container(props);
		instance.filter = jest.fn();
		instance.getById = jest.fn();
		instance.render();
		expect(instance.filter).toHaveBeenCalled();
		expect(instance.getById).toHaveBeenCalled();
	});

	describe('getById', () => {
		it('should return nothing if not found and POO if found', () => {
			const subfirst = { id: 11 };
			const first = { id: 1, children: [subfirst] };
			const second = { id: 2 };
			const items = [first, second];
			expect(getById(items, 11)).toEqual({ id: 11 });
			expect(getById(items, 3)).toBe();
		});
		it('should return be able to support some options', () => {
			const subfirst = { myid: 11 };
			const first = { myid: 1, children: [subfirst] };
			const second = { myid: 2 };
			const items = [first, second];
			expect(getById(items, 11, { idAttr: 'myid' })).toEqual({ myid: 11 });
			expect(getById(items, 3)).toBe();
		});
	});
	describe('filter', () => {
		it('does not match on non leaf element (non leaf element have children)', () => {
			// given
			const subfirst = { id: 11, name: 'sub' };
			const first = {
				id: 1,
				name: 'abc',
				children: [subfirst],
			};
			const second = { id: 2, name: 'foo' };
			const items = [first, second];

			// when
			const results = filter(items, 'ab');

			// then
			expect(results.length).toBe(0);
		});
		it('does match only on leaf element', () => {
			// given
			const subfirst = { id: 11, name: 'sub' };
			const first = {
				id: 1,
				name: 'abc',
				children: [subfirst],
			};
			const second = { id: 2, name: 'foo' };
			const items = [first, second];

			// when
			const results = filter(items, 'sub');

			// then
			expect(results.length).toBe(1);
			expect(results[0].name).toBe('sub');
			expect(results[0].toggled).toBeFalsy();
			expect(results[0].currentPosition).toBe('root > abc');
			expect(results[0].children).toBeFalsy();
		});
		it('does match on multiple leaf elements of different depth, result is list', () => {
			// given
			const subfirst = { id: 11, name: 'sub' };
			const first = {
				id: 1,
				name: 'abc',
				children: [subfirst],
			};
			const second = { id: 2, name: 'sub' };
			const items = [first, second];

			// when
			const results = filter(items, 'sub');

			// then
			expect(results.length).toBe(2);
			expect(results[0].name).toBe('sub');
			expect(results[0].currentPosition).toBe('root > abc');
			expect(results[1].name).toBe('sub');
			expect(results[1].currentPosition).toBe('root');
			expect(results[0].toggled).toBeFalsy();
			expect(results[0].children).toBeFalsy();
			expect(results[1].children).toBeFalsy();
		});

		it('does match on multiple leaf children of a node', () => {
			// given
			const subfirst = { id: 11, name: 'sub1' };
			const subsecond = {
				id: 12,
				name: 'sub2',
				children: [{}],
			};
			const subthird = { id: 13, name: 'sub3' };
			const first = {
				id: 1,
				name: 'abc',
				children: [subfirst, subsecond, subthird],
			};
			const second = { id: 2, name: 'sub' };
			const items = [first, second];

			// when
			const results = filter(items, 'sub');

			// then
			expect(results.length).toBe(3);
			expect(results[0].name).toBe('sub1');
			expect(results[0].currentPosition).toBe('root > abc');
			expect(results[1].name).toBe('sub3');
			expect(results[1].currentPosition).toBe('root > abc');
			expect(results[2].name).toBe('sub');
			expect(results[2].currentPosition).toBe('root');
			expect(results[0].toggled).toBeFalsy();
			expect(results[0].children).toBeFalsy();
			expect(results[1].children).toBeFalsy();
			expect(results[2].children).toBeFalsy();
		});

		it('does match on multiple leaf children of different node', () => {
			// given
			const subfirst = { id: 11, name: 'sub1' };
			const subsecond = { id: 13, name: 'sub2' };
			const first = {
				id: 1,
				name: 'abc',
				children: [subfirst],
			};
			const second = {
				id: 2,
				name: 'sub',
				children: [subsecond],
			};
			const items = [first, second];

			// when
			const results = filter(items, 'sub');

			// then
			expect(results.length).toBe(2);
			expect(results[0].name).toBe('sub1');
			expect(results[0].currentPosition).toBe('root > abc');
			expect(results[1].name).toBe('sub2');
			expect(results[1].currentPosition).toBe('root > sub');
			expect(results[0].toggled).toBeFalsy();
			expect(results[0].children).toBeFalsy();
			expect(results[1].children).toBeFalsy();
		});

		it('return the original struct if no query or empty query is provided', () => {
			// given
			const subfirst = { id: 11, name: 'sub1' };
			const subsecond = {
				id: 12,
				name: 'sub2',
				children: [{}],
			};
			const subthird = { id: 13, name: 'sub3' };
			const first = {
				id: 1,
				name: 'abc',
				children: [subfirst, subsecond, subthird],
			};
			const second = { id: 2, name: 'sub' };
			const items = [first, second];

			// when
			const results = filter(items, '');
			const results2 = filter(items);

			// then
			expect(results).toBe(items);
			expect(results2).toBe(items);
		});
	});

	describe('filterAll', () => {
		it('does match on non leaf element (non leaf element have children)', () => {
			const tree = [
				{
					id: 1,
					name: 'abc',
					children: [
						{
							id: 2,
							name: 'sub abc',
							children: [
								{
									id: 3,
									name: 'sub sub abc',
								},
							],
						},
					],
				},
				{
					id: 1,
					name: 'def',
				},
			];

			const items = tree;
			const results = filterAll(items, 'ab');

			expect(results.length).toBe(3);
			expect(results[0].name).toBe('abc');
			expect(results[0].currentPosition).toBe('root');

			expect(results[1].name).toBe('sub abc');
			expect(results[1].currentPosition).toBe('root > abc');

			expect(results[2].name).toBe('sub sub abc');
			expect(results[2].currentPosition).toBe('root > abc > sub abc');
		});

		it('does match on multiple leaf elements of different depth, result is list', () => {
			// given
			const subfirst = { id: 11, name: 'sub' };
			const first = {
				id: 1,
				name: 'abc',
				children: [subfirst],
			};
			const second = { id: 2, name: 'sub' };
			const items = [first, second];

			// when
			const results = filter(items, 'sub');

			// then
			expect(results.length).toBe(2);
			expect(results[0].name).toBe('sub');
			expect(results[0].currentPosition).toBe('root > abc');
			expect(results[1].name).toBe('sub');
			expect(results[1].currentPosition).toBe('root');
			expect(results[0].toggled).toBeFalsy();
			expect(results[0].children).toBeFalsy();
			expect(results[1].children).toBeFalsy();
		});
	});
});
