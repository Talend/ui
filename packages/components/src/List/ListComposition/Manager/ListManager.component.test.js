/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ListManager from './ListManager.component';
import { ListContext } from '../context';

function TestConsumer(props) {
	return (
		<div data-testid="TestConsumer" data-props={JSON.stringify(props)}>
			<span data-testid="displayMode">{props.displayMode}</span>
			<button onClick={() => props.setDisplayMode('large')}>Large</button>
			<input
				type="text"
				value={props.textFilter}
				onChange={e => props.setTextFilter(e.target.value)}
			/>
			<button onClick={() => props.setColumns(props.newValue)}>setColumns</button>
			<button onClick={() => props.setFilteredColumns(props.newValue)}>setFilteredColumns</button>
			<button onClick={() => props.setSortParams(props.newValue)}>setSortParams</button>
		</div>
	);
}

function ContextTestConsumer(props) {
	const context = useContext(ListContext);
	return <TestConsumer {...context} {...props} />;
}

describe('List Manager', () => {
	it('should display children', () => {
		// when
		render(
			<ListManager>
				<ContextTestConsumer />
			</ListManager>,
		);

		// then
		expect(screen.getByTestId('TestConsumer')).toBeVisible();
	});

	it('should pass collection', () => {
		// given
		const collection = [{ id: 0 }, { id: 1 }];

		// when
		render(
			<ListManager collection={collection}>
				<ContextTestConsumer />
			</ListManager>,
		);

		// then
		const props = JSON.parse(screen.getByTestId('TestConsumer').dataset.props);
		expect(props.collection).toEqual(collection);
	});

	it('should propagate display mode', () => {
		// given
		render(
			<ListManager collection={[{ id: 0 }, { id: 1 }]}>
				<ContextTestConsumer />
			</ListManager>,
		);
		expect(screen.getByTestId('displayMode')).toHaveTextContent('table');

		// when
		userEvent.click(screen.getByText('Large'));

		// then
		expect(screen.getByTestId('displayMode')).toHaveTextContent('large');
	});

	it('should propagate filter', () => {
		// given
		render(
			<ListManager
				collection={[
					{ id: 0, name: 'toto' },
					{ id: 1, name: 'tata' },
				]}
			>
				<ContextTestConsumer />
			</ListManager>,
		);

		const newFilter = 'toto';

		// when
		userEvent.type(screen.getByRole('textbox'), newFilter);

		// then
		const props = JSON.parse(screen.getByTestId('TestConsumer').dataset.props);
		expect(props.textFilter).toBe(newFilter);
		expect(props.collection).toEqual([{ id: 0, name: 'toto' }]);
	});

	it('should propagate column list', () => {
		// given
		render(
			<ListManager
				collection={[
					{ dataKey: 'id', label: 'ID' },
					{ dataKey: 'name', label: 'Name' },
				]}
			>
				<ContextTestConsumer newValue={['id', 'name']} />
			</ListManager>,
		);

		// when
		userEvent.click(screen.getByText('setColumns'));

		// then
		const props = JSON.parse(screen.getByTestId('TestConsumer').dataset.props);
		expect(props.columns).toEqual(['id', 'name']);
	});

	it('should propagate filtered column list', () => {
		// given
		render(
			<ListManager
				collection={[
					{ dataKey: 'id', label: 'ID' },
					{ dataKey: 'name', label: 'Name' },
				]}
			>
				<ContextTestConsumer newValue={['name']} />
			</ListManager>,
		);

		const filteredColumns = ['name'];

		// when
		userEvent.click(screen.getByText('setFilteredColumns'));

		// then
		const props = JSON.parse(screen.getByTestId('TestConsumer').dataset.props);
		expect(props.filteredColumns).toEqual(filteredColumns);
	});

	it('should propagate sort', () => {
		// given
		render(
			<ListManager
				collection={[
					{ id: 0, name: 'toto' },
					{ id: 1, name: 'tata' },
				]}
			>
				<ContextTestConsumer newValue={{ sortBy: 'name', isDescending: false }} />
			</ListManager>,
		);
		let props = JSON.parse(screen.getByTestId('TestConsumer').dataset.props);
		expect(props.sortParams).toEqual({});
		expect(props.collection).toEqual([
			{ id: 0, name: 'toto' },
			{ id: 1, name: 'tata' },
		]);

		// when
		userEvent.click(screen.getByText('setSortParams'));

		// then
		props = JSON.parse(screen.getByTestId('TestConsumer').dataset.props);
		expect(props.sortParams).toEqual({ sortBy: 'name', isDescending: false });
		expect(props.collection).toEqual([
			{ id: 1, name: 'tata' },
			{ id: 0, name: 'toto' },
		]);
	});
});
