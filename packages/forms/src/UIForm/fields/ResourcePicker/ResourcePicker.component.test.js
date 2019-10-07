import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button } from 'react-bootstrap';
import ResourceComponent from '@talend/react-components/lib/ResourcePicker/Resource';
import StateFilter from '@talend/react-components/lib/ResourcePicker/Toolbar/StateFilter';
import SortOptions from '@talend/react-components/lib/ResourcePicker/Toolbar/SortOptions';

import ResourcePicker from './ResourcePicker.component';

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
		onChange: jest.fn(),
		onFinish: jest.fn(),
		onTrigger: jest.fn(() => Promise.resolve({ collection })),
		schema,
	};

	it('should render simple select', done => {
		const wrapper = mount(
			<ResourcePicker
				id={'mySelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn(
					() =>
						new Promise(resolve => {
							resolve({ collection });
							done();
						}),
				)}
				schema={schema}
			/>,
		);

		expect(wrapper.find('.tc-resource-picker-sort-options button').length).toBe(2);
		expect(wrapper.find('.tc-resource-picker-state-filters button').length).toBe(3);
		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.find('ResourcePicker').props().toolbar.name.value).toEqual('');
	});

	it('should render simple select with wanted sort and filter', done => {
		const wrapper = mount(
			<ResourcePicker
				id={'mySelect'}
				isValid
				errorMessage={'My Error Message'}
				onChange={jest.fn()}
				onFinish={jest.fn()}
				onTrigger={jest.fn(
					() =>
						new Promise(resolve => {
							resolve({ collection });
							done();
						}),
				)}
				schema={{ ...schema, options: { filters: ['certified'], sort: ['name'] } }}
			/>,
		);

		expect(wrapper.find('.tc-resource-picker-sort-options button').length).toBe(1);
		expect(wrapper.find('.tc-resource-picker-state-filters button').length).toBe(1);
	});

	it('should call onTrigger when mounting component', () => {
		shallow(<ResourcePicker {...props} />);

		expect(props.onTrigger).toBeCalledWith(undefined, {
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
		const wrapper = await mount(<ResourcePicker {...props} />);
		await wrapper.instance().busy;
		wrapper.update();

		wrapper
			.find(ResourceComponent)
			.at(0)
			.simulate('click');
		expect(props.onChange).toBeCalledWith(expect.anything(), {
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
		expect(props.onTrigger).toBeCalled();
		expect(props.onTrigger).toBeCalledWith(expect.anything(), {
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

		const wrapper = await mount(<ResourcePicker {...multi} />);
		await wrapper.instance().busy;
		wrapper.update();

		wrapper
			.find(ResourceComponent)
			.at(0)
			.simulate('click');
		wrapper
			.find(ResourceComponent)
			.at(1)
			.simulate('click');
		expect(props.onChange).toBeCalledWith(expect.anything(), {
			schema: expect.anything(),
			value: ['0', '1'],
		});
		expect(props.onTrigger).toBeCalled();
		expect(props.onTrigger).toBeCalledWith(expect.anything(), {
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
		const onChangeUnselect = jest.fn();
		const multi = {
			...props,
			onChange: onChangeUnselect,
			schema: {
				...props.schema,
				multi: true,
			},
		};
		const wrapper = await mount(<ResourcePicker {...multi} />);
		await wrapper.instance().busy;
		wrapper.update();

		wrapper
			.find(ResourceComponent)
			.at(0)
			.simulate('click');
		wrapper
			.find(ResourceComponent)
			.at(0)
			.simulate('click');
		expect(onChangeUnselect.mock.calls.length).toBe(2);
	});

	it('should not unselect single selection when value is required', async () => {
		const onChangeUnselect = jest.fn();
		const unselectProps = {
			...props,
			onChange: onChangeUnselect,
			schema: {
				...props.schema,
				required: true,
			},
		};
		const wrapper = await mount(<ResourcePicker {...unselectProps} />);
		await wrapper.instance().busy;
		wrapper.update();

		wrapper
			.find(ResourceComponent)
			.at(0)
			.simulate('click');
		wrapper
			.find(ResourceComponent)
			.at(0)
			.simulate('click');
		expect(onChangeUnselect.mock.calls.length).toBe(1);
	});

	it('should unselect single selection when value is not required', async () => {
		const onChangeUnselect = jest.fn();
		const unselectProps = {
			...props,
			onChange: onChangeUnselect,
			schema: {
				...props.schema,
				required: false,
			},
		};
		const wrapper = await mount(<ResourcePicker {...unselectProps} />);
		await wrapper.instance().busy;
		wrapper.update();

		wrapper
			.find(ResourceComponent)
			.at(0)
			.simulate('click');
		wrapper
			.find(ResourceComponent)
			.at(0)
			.simulate('click');
		expect(onChangeUnselect.mock.calls.length).toBe(2);
	});

	it('should not allow multi selection', async () => {
		const wrapper = await mount(<ResourcePicker {...props} />);
		await wrapper.instance().busy;
		wrapper.update();

		wrapper
			.find(ResourceComponent)
			.at(0)
			.simulate('click');
		wrapper
			.find(ResourceComponent)
			.at(1)
			.simulate('click');
		expect(props.onChange).toBeCalledWith(expect.anything(), {
			schema: expect.anything(),
			value: '1',
		});
	});

	describe('filters', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});
		it('should filter on selection', async () => {
			const wrapper = mount(<ResourcePicker {...props} />);
			await wrapper.instance().busy;
			wrapper.update();

			wrapper
				.find(StateFilter)
				.find(Button)
				.at(0)
				.simulate('click');

			expect(props.onTrigger).toBeCalledWith(null, {
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
			const wrapper = mount(<ResourcePicker {...props} />);
			await wrapper.instance().busy;
			wrapper.update();

			wrapper
				.find(StateFilter)
				.find(Button)
				.at(1)
				.simulate('click');

			expect(props.onTrigger).toBeCalledWith(null, {
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
			const wrapper = mount(<ResourcePicker {...props} />);
			await wrapper.instance().busy;
			wrapper.update();

			wrapper
				.find(StateFilter)
				.find(Button)
				.at(2)
				.simulate('click');

			expect(props.onTrigger).toBeCalledWith(null, {
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
		it('should filter', () => {
			const wrapper = shallow(<ResourcePicker {...props} />);

			wrapper.instance().nameFilterChanged({ target: { value: 'test' } });
			wrapper.update();

			expect(props.onTrigger).toHaveBeenLastCalledWith(null, {
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

			expect(
				wrapper
					.find('FieldTemplate')
					.shallow()
					.children()
					.at(1)
					.prop('toolbar').name.value,
			).toBe('test');
		});
	});

	describe('sort', () => {
		it('should sort by name', async () => {
			const wrapper = mount(<ResourcePicker {...props} />);
			await wrapper.instance().busy;
			wrapper.update();

			wrapper
				.find(SortOptions)
				.find(Button)
				.at(0)
				.simulate('click');

			expect(props.onTrigger).toBeCalledWith(null, {
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
			const wrapper = mount(<ResourcePicker {...props} />);
			await wrapper.instance().busy;
			wrapper.update();

			wrapper
				.find(SortOptions)
				.find(Button)
				.at(1)
				.simulate('click');

			expect(props.onTrigger).toBeCalledWith(null, {
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
