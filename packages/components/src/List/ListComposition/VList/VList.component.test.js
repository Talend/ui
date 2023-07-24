/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { screen, render } from '@testing-library/react';
import VList from './VList.component';
import { ListContext } from '../context';

jest.unmock('@talend/design-system');
jest.mock('../../../VirtualizedList', () => {
	const Original = jest.requireActual('../../../VirtualizedList').default;
	const TestVList = ({ type, collection, ...props }) => (
		<div data-testid="VirtualizedList" data-props={JSON.stringify({ type, collection })}>
			{props.headerAction}
			{props.children}
		</div>
	);
	Object.entries(Original).forEach(([key, value]) => {
		TestVList[key] = value;
	});
	return TestVList;
});

describe('List VList', () => {
	it('should render collection', () => {
		// given
		const contextValue = {
			collection: [
				{ id: '1', name: 'first' },
				{ id: '2', name: 'two' },
			],
			columns: [
				{ key: 'id', label: 'Id' },
				{ key: 'name', label: 'Name' },
			],
			visibleColumns: ['id', 'name'],
			setColumns: jest.fn(),
		};

		// when
		render(
			<ListContext.Provider value={contextValue}>
				<VList />
			</ListContext.Provider>,
		);

		// then
		const props = JSON.parse(screen.getByTestId('VirtualizedList').dataset.props);
		expect(props.collection).toEqual(contextValue.collection);
	});

	it('should pass displayMode from context in uncontrolled mode', () => {
		// given
		const contextValue = { displayMode: 'large', collection: [], setColumns: jest.fn() };

		// when
		render(
			<ListContext.Provider value={contextValue}>
				<VList />
			</ListContext.Provider>,
		);

		// then
		const props = JSON.parse(screen.getByTestId('VirtualizedList').dataset.props);
		expect(props.type).toBe('LARGE');
	});

	it('should pass displayMode from props in controlled mode', () => {
		// given
		const contextValue = { displayMode: 'large', collection: [], setColumns: jest.fn() };

		// when
		render(
			<ListContext.Provider value={contextValue}>
				<VList type="TABLE" />
			</ListContext.Provider>,
		);

		// then
		const props = JSON.parse(screen.getByTestId('VirtualizedList').dataset.props);
		expect(props.type).toBe('TABLE');
	});

	it('Should not display column chooser by default', () => {
		// given
		const contextValue = { collection: [{ id: 0 }, { id: 1 }], setColumns: jest.fn() };

		// when
		render(
			<ListContext.Provider value={contextValue}>
				<VList />
			</ListContext.Provider>,
		);
		expect(screen.queryByRole('button', { name: 'Column chooser' })).toBeNull();
	});

	it('Should display column chooser from boolean', () => {
		const contextValue = {
			displayMode: 'table',
			collection: [],
			columns: [],
			setColumns: jest.fn(),
			setVisibleColumns: jest.fn(),
		};
		render(
			<ListContext.Provider value={contextValue}>
				<VList type="TABLE" columnChooser>
					<VList.Text label="Id" dataKey="id" />
					<VList.Text label="name" dataKey="name" />
				</VList>
			</ListContext.Provider>,
		);
		expect(screen.getByRole('button')).toBeVisible();
		expect(screen.getByRole('button')).toHaveAttribute('data-feature', 'column-chooser.open');
	});
});
