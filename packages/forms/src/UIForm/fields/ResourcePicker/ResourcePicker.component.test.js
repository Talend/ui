/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ResourcePicker from './ResourcePicker.component';

jest.unmock('@talend/design-system');
jest.mock(
	'@talend/react-components/lib/ResourcePicker',
	() =>
		({ toolbar, onRowClick, isSelected, collection, ...props }) => (
			<div data-testid="ResourcePicker" data-props={JSON.stringify(props, null, 2)}>
				<div data-testid="toolbar" data-props={JSON.stringify(toolbar, null, 2)}>
					<div>
						<label htmlFor="toolbar-name">{toolbar.name.label}</label>
						<input
							id="toolbar-name"
							type="text"
							onChange={e => toolbar.name.onChange(e)}
							value={toolbar.name.value}
						/>
					</div>
					<div className="tc-resource-picker-state-filters">
						<button onClick={() => toolbar.state.onChange('selection', true)}>state filter</button>
						<button onClick={() => toolbar.state.onChange('certified', true)}>
							certified filter
						</button>
						<button onClick={() => toolbar.state.onChange('favorites', true)}>
							favorites filter
						</button>
					</div>
					<div className="tc-resource-picker-sort-options">
						<button onClick={() => toolbar.sort.onChange('name', 'asc')}>sort by name</button>
						<button onClick={() => toolbar.sort.onChange('date', 'asc')}>sort by date</button>

						<button onClick={() => toolbar.sort.onChange('name', 'desc')}>sort by name desc</button>
						<button onClick={() => toolbar.sort.onChange('date', 'desc')}>sort by date desc</button>
					</div>
				</div>
				<button type="button" onClick={e => onRowClick(e, { id: '0' })}>
					onRowClick
				</button>
				<button type="button" onClick={e => onRowClick(e, { id: '1' })}>
					onRowClick first
				</button>
				<button type="button" onClick={e => isSelected(e)}>
					isSelected
				</button>
				{collection && (
					<span
						data-testid="collection"
						data-collection={JSON.stringify(collection, null, 2)}
					></span>
				)}
				ResourcePicker
			</div>
		),
);

describe('ResourcePicker field', () => {
	const collection = [
		{
			id: '0',
			name: 'Title with few actions',
			modified: 1442880000000,
			icon: 'talend-file-xls-o',
			author: 'First Author',
			flags: ['CERTIFIED', 'FAVORITE'],
		},
		{
			id: '1',
			name: 'Title with lot of actions',
			modified: 1537574400000,
			icon: 'talend-file-xls-o',
			author: 'Second Author',
		},
		{
			id: '2',
			name: 'Title with persistant actions',
			modified: 1474502400000,
			author: 'Jean-Pierre DUPONT',
			icon: 'talend-file-xls-o',
			flags: ['FAVORITE'],
		},
		{
			id: '3',
			name: 'Title with icon',
			modified: 1506038400000,
			author: 'Third Author',
			icon: 'talend-file-xls-o',
			flags: ['CERTIFIED'],
		},
		{
			id: '4',
			name: 'Title in input mode',
			modified: 1506038400000,
			author: 'Jean-Pierre DUPONT',
			icon: 'talend-file-xls-o',
		},
		{
			id: '5',
			name: 'Title with long long long long long long long long long long long text',
			modified: 1547478328552,
			author: 'Jean-Pierre DUPONT with super super super long text',
			icon: 'talend-file-xls-o',
			flags: ['CERTIFIED', 'FAVORITE'],
		},
	];

	const schema = {
		title: 'My ResourcePicker title',
		description: 'ResourcePicker me',
		placeholder: 'Please select a value',
		required: true,
		schema: {
			type: 'object',
		},
		triggers: [
			{ action: 'resourcePickerSelected', onEvent: 'change' },
			{ action: 'resourcePickerFiltered', onEvent: 'filter' },
		],
	};
	const props = {
		id: 'mySelect',
		onChange: jest.fn(),
		onFinish: jest.fn(),
		onTrigger: jest.fn(() => Promise.resolve({ collection })),
		schema,
	};
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('should render ResourcePicker', async () => {
		const { container } = render(
			<ResourcePicker {...props} isValid errorMessage="My Error Message" />,
		);
		expect(props.onTrigger).toHaveBeenCalledWith(undefined, {
			errors: undefined,
			filters: { certified: false, favorites: false, name: '', selected: [], selection: false },
			properties: undefined,
			schema: {
				description: 'ResourcePicker me',
				placeholder: 'Please select a value',
				required: true,
				schema: { type: 'object' },
				title: 'My ResourcePicker title',
				triggers: [
					{ action: 'resourcePickerSelected', onEvent: 'change' },
					{ action: 'resourcePickerFiltered', onEvent: 'filter' },
				],
			},
			trigger: { action: 'resourcePickerFiltered', onEvent: 'filter' },
		});
		expect(screen.getByTestId('ResourcePicker')).toBeInTheDocument();
		await screen.findByTestId('collection');
		expect(container.firstChild).toMatchSnapshot();
		const resultCollection = JSON.parse(screen.getByTestId('collection').dataset.collection);
		expect(resultCollection).toBeDefined();
	});

	it('should render with wanted sort and filter', async () => {
		render(
			<ResourcePicker
				{...props}
				schema={{ ...schema, options: { filters: ['certified'], sort: ['name'] } }}
			/>,
		);
		await screen.findByTestId('collection');

		const toolbar = JSON.parse(screen.getByTestId('toolbar').dataset.props);
		expect(toolbar).toMatchObject({
			name: { label: 'Please select a value' },
			sort: { types: ['name'] },
			state: { certified: false, types: ['certified'] },
		});
	});

	it('should call onTrigger when mounting component', () => {
		render(<ResourcePicker {...props} />);

		expect(props.onTrigger).toHaveBeenCalledWith(undefined, {
			schema: expect.anything(),
			errors: undefined,
			properties: undefined,
			trigger: {
				action: 'resourcePickerFiltered',
				onEvent: 'filter',
			},
			filters: {
				certified: false,
				favorites: false,
				name: '',
				selected: [],
				selection: false,
			},
		});
	});

	it('should call onChange when selecting an item', async () => {
		render(<ResourcePicker {...props} />);
		await screen.findByTestId('collection');
		await userEvent.click(screen.getByText('onRowClick'));

		expect(props.onChange).toHaveBeenCalledWith(expect.anything(), {
			schema: {
				description: 'ResourcePicker me',
				placeholder: 'Please select a value',
				required: true,
				schema: {
					type: 'object',
				},
				title: 'My ResourcePicker title',
				triggers: [
					{
						action: 'resourcePickerSelected',
						onEvent: 'change',
					},
					{
						action: 'resourcePickerFiltered',
						onEvent: 'filter',
					},
				],
			},
			value: '0',
		});
		expect(props.onTrigger).toHaveBeenCalled();
		expect(props.onTrigger).toHaveBeenCalledWith(expect.anything(), {
			errors: undefined,
			properties: undefined,
			schema: expect.anything(),
			trigger: {
				action: 'resourcePickerSelected',
				onEvent: 'change',
			},
			value: '0',
		});
	});

	it('should allow multi selection', async () => {
		const multi = {
			...props,
			schema: {
				...props.schema,
				multi: true,
			},
		};

		render(<ResourcePicker {...multi} />);
		await screen.findByTestId('collection');
		await userEvent.click(screen.getByText('onRowClick'));
		await userEvent.click(screen.getByText('onRowClick first'));

		expect(props.onChange).toHaveBeenCalledWith(expect.anything(), {
			schema: expect.anything(),
			value: ['0', '1'],
		});
		expect(props.onTrigger).toHaveBeenCalled();
		expect(props.onTrigger).toHaveBeenCalledWith(expect.anything(), {
			errors: undefined,
			properties: undefined,
			schema: expect.anything(),
			trigger: {
				action: 'resourcePickerSelected',
				onEvent: 'change',
			},
			value: ['0', '1'],
		});
	});

	it('should unselect in multi case', async () => {
		const multi = {
			...props,
			schema: {
				...props.schema,
				multi: true,
			},
		};
		render(<ResourcePicker {...multi} />);
		await screen.findByTestId('collection');
		await userEvent.click(screen.getByText('onRowClick'));
		await userEvent.click(screen.getByText('onRowClick'));

		expect(props.onChange.mock.calls.length).toBe(2);
		expect(props.onChange).toHaveBeenCalledWith(expect.anything(), {
			schema: expect.anything(),
			value: [],
		});
	});

	it('should not unselect single selection when value is required', async () => {
		const unselectProps = {
			...props,
			schema: {
				...props.schema,
				required: true,
			},
		};
		render(<ResourcePicker {...unselectProps} />);
		await screen.findByTestId('collection');

		await userEvent.click(screen.getByText('onRowClick'));
		await userEvent.click(screen.getByText('onRowClick'));
		expect(props.onChange.mock.calls.length).toBe(1);
	});

	it('should unselect single selection when value is not required', async () => {
		const unselectProps = {
			...props,
			schema: {
				...props.schema,
				required: false,
			},
		};
		render(<ResourcePicker {...unselectProps} />);
		await screen.findByTestId('collection');

		await userEvent.click(screen.getByText('onRowClick'));
		await userEvent.click(screen.getByText('onRowClick'));

		expect(props.onChange.mock.calls.length).toBe(2);
		expect(props.onChange).toHaveBeenCalledWith(expect.anything(), {
			schema: expect.anything(),
			value: undefined,
		});
	});

	it('should not allow multi selection', async () => {
		render(<ResourcePicker {...props} />);
		await screen.findByTestId('collection');
		await userEvent.click(screen.getByText('onRowClick'));
		await userEvent.click(screen.getByText('onRowClick first'));
		expect(props.onChange).toHaveBeenCalledWith(expect.anything(), {
			schema: expect.anything(),
			value: '1',
		});
	});

	describe('filters', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it('should filter on selection', async () => {
			render(<ResourcePicker {...props} />);
			await screen.findByTestId('collection');
			await userEvent.click(screen.getByText('state filter'));

			expect(props.onTrigger).toHaveBeenCalledWith(null, {
				schema: expect.anything(),
				errors: undefined,
				properties: undefined,
				trigger: {
					action: 'resourcePickerFiltered',
					onEvent: 'filter',
				},
				filters: {
					certified: false,
					favorites: false,
					name: '',
					selected: [],
					selection: true,
				},
			});
		});

		it('should filter on certified', async () => {
			render(<ResourcePicker {...props} />);
			await screen.findByTestId('collection');
			await userEvent.click(screen.getByText('certified filter'));

			expect(props.onTrigger).toHaveBeenCalledWith(null, {
				schema: expect.anything(),
				errors: undefined,
				properties: undefined,
				trigger: {
					action: 'resourcePickerFiltered',
					onEvent: 'filter',
				},
				filters: {
					certified: true,
					favorites: false,
					name: '',
					selected: [],
					selection: false,
				},
			});
		});

		it('should filter on favorites', async () => {
			render(<ResourcePicker {...props} />);
			await screen.findByTestId('collection');
			await userEvent.click(screen.getByText('favorites filter'));

			expect(props.onTrigger).toHaveBeenCalledWith(null, {
				schema: expect.anything(),
				errors: undefined,
				properties: undefined,
				trigger: {
					action: 'resourcePickerFiltered',
					onEvent: 'filter',
				},
				filters: {
					certified: false,
					favorites: true,
					name: '',
					selected: [],
					selection: false,
				},
			});
		});
		xit('should filter', async () => {
			render(<ResourcePicker {...props} />);
			await screen.findByTestId('collection');
			fireEvent.change(screen.getByLabelText('Please select a value'), {
				target: { value: 'test' },
			});

			expect(props.onTrigger).toHaveBeenCalledWith(expect.anything(), {
				schema: expect.anything(),
				errors: undefined,
				properties: undefined,
				trigger: {
					action: 'resourcePickerFiltered',
					onEvent: 'filter',
				},
				filters: {
					certified: false,
					favorites: false,
					name: 'test',
					selected: [],
					selection: false,
				},
			});
		});
	});

	describe('sort', () => {
		it('should sort by name', async () => {
			render(<ResourcePicker {...props} />);
			await screen.findByTestId('collection');
			await userEvent.click(screen.getByText('sort by name'));

			expect(props.onTrigger).toHaveBeenCalledWith(null, {
				schema: expect.anything(),
				errors: undefined,
				properties: undefined,
				trigger: {
					action: 'resourcePickerFiltered',
					onEvent: 'filter',
				},
				filters: {
					certified: false,
					favorites: false,
					name: '',
					selected: [],
					selection: false,
					orders: {
						name: 'asc',
					},
				},
			});
		});

		it('should sort by date', async () => {
			render(<ResourcePicker {...props} />);
			await screen.findByTestId('collection');
			await userEvent.click(screen.getByText('sort by date'));

			expect(props.onTrigger).toHaveBeenCalledWith(null, {
				schema: expect.anything(),
				errors: undefined,
				properties: undefined,
				trigger: {
					action: 'resourcePickerFiltered',
					onEvent: 'filter',
				},
				filters: {
					certified: false,
					favorites: false,
					name: '',
					selected: [],
					selection: false,
					orders: {
						date: 'asc',
					},
				},
			});
		});
	});
});
