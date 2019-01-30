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
	};
	const props = {
		onChange: jest.fn(),
		onFinish: jest.fn(),
		onTrigger: jest.fn(() => Promise.resolve({ collection })),
		schema,
	};

	it('should render simple select', done => {
		const wrapper = shallow(
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

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should call onTrigger when mounting component', () => {
		shallow(<ResourcePicker {...props} />);

		expect(props.onTrigger).toBeCalledWith(undefined, {
			schema: props.schema,
			trigger: {
				parameters: {
					certified: false,
					favorites: false,
					name: '',
					selected: [],
					selection: false,
				},
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
	});

	it('should unselect', async () => {
		const wrapper = await mount(<ResourcePicker {...props} />);
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
		expect(props.onChange).toBeCalledWith(expect.anything(), {
			schema: expect.anything(),
			value: undefined,
		});
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
				trigger: {
					parameters: {
						certified: false,
						favorites: false,
						name: '',
						selected: [],
						selection: true,
					},
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
				trigger: {
					parameters: {
						certified: true,
						favorites: false,
						name: '',
						selected: [],
						selection: false,
					},
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
				trigger: {
					parameters: {
						certified: false,
						favorites: true,
						name: '',
						selected: [],
						selection: false,
					},
				},
			});
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
				trigger: {
					parameters: {
						certified: false,
						favorites: false,
						name: '',
						selected: [],
						selection: false,
						orders: {
							name: 'asc',
						},
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
				trigger: {
					parameters: {
						certified: false,
						favorites: false,
						name: '',
						selected: [],
						selection: false,
						orders: {
							date: 'asc',
						},
					},
				},
			});
		});
	});
});
