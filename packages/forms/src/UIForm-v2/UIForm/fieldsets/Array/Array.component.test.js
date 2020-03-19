import React from 'react';
import { shallow, mount } from 'enzyme';
import ArrayWidget from './Array.component';

const schema = {
	key: ['comments'],
	items: [
		{
			key: ['comments', '', 'name'],
			title: 'Name',
			required: true,
			schema: { title: 'Name', type: 'string' },
			type: 'text',
		},
		{
			key: ['comments', '', 'email'],
			title: 'Email',
			description: 'Email will be used for evil.',
			schema: {
				title: 'Email',
				type: 'string',
				pattern: '^\\S+@\\S+$',
				description: 'Email will be used for evil.',
			},
			type: 'text',
		},
		{
			key: ['comments', '', 'comment'],
			type: 'textarea',
			rows: 3,
			title: 'Comment',
			maxlength: 20,
			validationMessage: "Don't be greedy!",
			schema: {
				title: 'Comment',
				type: 'string',
				maxLength: 20,
				validationMessage: "Don't be greedy!",
			},
		},
	],
	title: 'comments',
	required: true,
	schema: {
		type: 'array',
		maxItems: 2,
		items: {
			type: 'object',
			properties: {
				name: { title: 'Name', type: 'string' },
				email: {
					title: 'Email',
					type: 'string',
					pattern: '^\\S+@\\S+$',
					description: 'Email will be used for evil.',
				},
				comment: {
					title: 'Comment',
					type: 'string',
					maxLength: 20,
					validationMessage: "Don't be greedy!",
				},
			},
			required: ['name', 'comment'],
		},
	},
	type: 'array',
};

const value = [
	{
		name: 'Jimmy',
		email: 'jimmy@lol.com',
		comment: "Let's do this",
	},
	{
		name: 'JM',
		email: 'jm@lol.com',
		comment: "Let's do that instead",
	},
	{
		name: 'Goeffroy',
		email: 'geoffroy@lol.com',
		comment: "Don't user ternary !",
	},
];

describe('Array component', () => {
	it('should render array', () => {
		// when
		const wrapper = shallow(
			<ArrayWidget
				description={'My array description'}
				errorMessage={'This array is not correct'}
				id={'talend-array'}
				isValid
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={schema}
				value={value}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it("should render array that can't be reordered", () => {
		// given
		const nonReorderSchema = {
			...schema,
			reorder: false,
		};

		// when
		const wrapper = shallow(
			<ArrayWidget
				description={'My array description'}
				errorMessage={'This array is not correct'}
				id={'talend-array'}
				isValid
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={nonReorderSchema}
				value={value}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render a readOnly array', () => {
		const wrapper = mount(
			<ArrayWidget
				description={'My array description'}
				errorMessage={'This array is not correct'}
				id={'talend-array'}
				isValid
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={{ ...schema, readOnly: true }}
				value={value}
				errors={[]}
			/>,
		);
		expect(wrapper.find('Action').length).toBe(0);
	});

	it('should render array with Add/Delete button disabled', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};
		// when
		const wrapper = mount(
			<ArrayWidget
				description={'My array description'}
				id={'talend-array'}
				isValid
				onChange={jest.fn()}
				onFinish={jest.fn()}
				schema={disabledSchema}
				value={value}
				errors={{}}
			/>,
		);
		// then
		expect(wrapper.find('Action#talend-array-btn').prop('disabled')).toBe(true);
	});

	describe('#onAdd', () => {
		it('should trigger onChange and validation with additional empty item', () => {
			// given
			const onChange = jest.fn();
			const onFinish = jest.fn();
			const event = { target: {} };
			const wrapper = shallow(
				<ArrayWidget
					description={'My array description'}
					errorMessage={'This array is not correct'}
					id={'talend-array'}
					isValid
					onChange={onChange}
					onFinish={onFinish}
					schema={schema}
					value={value}
				/>,
			);

			// when
			wrapper.instance().onAdd(event);

			// then
			const payload = { schema, value: value.concat({}) };
			expect(onChange).toBeCalledWith(event, payload);
			expect(onFinish).toBeCalledWith(event, payload);
		});

		it('should close all items with closeable item widget', () => {
			// given
			const onChange = jest.fn();
			const onFinish = jest.fn();
			const event = { target: {} };
			const wrapper = shallow(
				<ArrayWidget
					description={'My array description'}
					errorMessage={'This array is not correct'}
					id={'talend-array'}
					isValid
					onChange={onChange}
					onFinish={onFinish}
					schema={{ ...schema, itemWidget: 'collapsibleFieldset' }}
					value={value}
				/>,
			);

			// when
			wrapper.instance().onAdd(event);

			// then
			const newValues = onChange.mock.calls[0][1].value;
			newValues.forEach((item, index) => {
				if (index === newValues.length - 1) {
					expect(item).toEqual({});
				} else {
					expect(item.isClosed).toBe(true);
				}
			});
		});

		it('should add first enum value as default for single select', () => {
			const selectSchema = {
				key: 'Color',
				type: 'array',
				items: [
					{
						key: ['Color', ''],
						type: 'select',
					},
				],
				schema: {
					items: {
						type: 'string',
						enum: ['White', 'Red', 'Black'],
					},
				},
			};

			// given
			const onChange = jest.fn();
			const onFinish = jest.fn();
			const event = { target: {} };
			const wrapper = shallow(
				<ArrayWidget
					description={'My array description'}
					errorMessage={'This array is not correct'}
					id={'talend-array'}
					isValid
					onChange={onChange}
					onFinish={onFinish}
					schema={selectSchema}
					value={[]}
				/>,
			);

			// when
			wrapper.instance().onAdd(event);

			// then
			const payload = { schema: selectSchema, value: ['White'] };
			expect(onChange).toBeCalledWith(event, payload);
			expect(onFinish).toBeCalledWith(event, payload);
		});
	});

	describe('#onRemove', () => {
		it('should trigger onChange and validation with new list', () => {
			// given
			const onChange = jest.fn();
			const onFinish = jest.fn();
			const event = { target: {} };
			const wrapper = shallow(
				<ArrayWidget
					description={'My array description'}
					errorMessage={'This array is not correct'}
					id={'talend-array'}
					isValid
					onChange={onChange}
					onFinish={onFinish}
					schema={schema}
					value={value}
				/>,
			);

			// when
			wrapper.instance().onRemove(event, 1);

			// then
			const payload = { schema, value: [value[0], value[2]] };
			expect(onChange).toBeCalledWith(event, payload);
			expect(onFinish).toBeCalledWith(event, payload, expect.anything());
		});

		it('should pass widget hook function to shift errors indexes', () => {
			// given
			const onFinish = jest.fn();
			const event = { target: {} };
			const wrapper = shallow(
				<ArrayWidget
					description={'My array description'}
					errorMessage={'This array is not correct'}
					id={'talend-array'}
					isValid
					onChange={jest.fn()}
					onFinish={onFinish}
					schema={schema}
					value={value}
				/>,
			);

			wrapper.instance().onRemove(event, 1);
			const options = onFinish.mock.calls[0][2];

			const oldErrors = {
				'comments,0,name': 'This is required',
				'comments,1,email': 'This is too long',
				'comments,2,name': 'This is too short',
				'comments,2,comment': 'This is not long enough',
			};

			// when
			const newErrors = options.widgetChangeErrors(oldErrors);

			// then
			expect(newErrors).toEqual({
				'comments,0,name': 'This is required',
				'comments,1,name': 'This is too short',
				'comments,1,comment': 'This is not long enough',
			});
		});
	});

	describe('#onReorder', () => {
		it('should trigger onChange and validation with new list', () => {
			// given
			const onChange = jest.fn();
			const onFinish = jest.fn();
			const event = { target: {} };
			const wrapper = shallow(
				<ArrayWidget
					description={'My array description'}
					errorMessage={'This array is not correct'}
					id={'talend-array'}
					isValid
					onChange={onChange}
					onFinish={onFinish}
					schema={schema}
					value={value}
				/>,
			);

			// when
			wrapper.instance().onReorder(event, { previousIndex: 0, nextIndex: 2 });

			// then
			const payload = { schema, value: [value[1], value[2], value[0]] };
			expect(onChange).toBeCalledWith(event, payload);
			expect(onFinish).toBeCalledWith(event, payload, expect.anything());
		});

		it('should pass widget hook function to shift errors indexes', () => {
			// given
			const onFinish = jest.fn();
			const event = { target: {} };
			const wrapper = shallow(
				<ArrayWidget
					description={'My array description'}
					errorMessage={'This array is not correct'}
					id={'talend-array'}
					isValid
					onChange={jest.fn()}
					onFinish={onFinish}
					schema={schema}
					value={value}
				/>,
			);

			wrapper.instance().onReorder(event, { previousIndex: 0, nextIndex: 2 });
			const options = onFinish.mock.calls[0][2];

			const oldErrors = {
				'comments,0,name': 'This is required',
				'comments,1,email': 'This is too long',
				'comments,2,name': 'This is too short',
				'comments,2,comment': 'This is not long enough',
			};

			// when
			const newErrors = options.widgetChangeErrors(oldErrors);

			// then
			expect(newErrors).toEqual({
				'comments,2,name': 'This is required',
				'comments,0,email': 'This is too long',
				'comments,1,name': 'This is too short',
				'comments,1,comment': 'This is not long enough',
			});
		});
	});

	describe('#renderItem', () => {
		it('should render item at given index', () => {
			// given
			const wrapper = shallow(
				<ArrayWidget
					description={'My array description'}
					errorMessage={'This array is not correct'}
					id={'talend-array'}
					isValid
					schema={schema}
					value={value}
				/>,
			);

			// when
			const item = wrapper.instance().renderItem(1);

			// then
			expect(item).toMatchSnapshot();
		});

		it('should render adapt schema injecting the index deeply', () => {
			// given
			const deepSchema = {
				...schema,
				items: [
					{
						widget: 'fieldset',
						title: 'Extra level of fieldset for nesting',
						items: schema.items,
					},
				],
			};
			const wrapper = shallow(
				<ArrayWidget
					description={'My array description'}
					errorMessage={'This array is not correct'}
					id={'talend-array'}
					isValid
					schema={deepSchema}
					value={value}
				/>,
			);

			// when
			const item = wrapper.instance().renderItem(1);

			// then
			const nestedItemsKey = item.props.schema.items[0].items.map(nextItem => nextItem.key);
			expect(nestedItemsKey).toEqual([
				['comments', 1, 'name'],
				['comments', 1, 'email'],
				['comments', 1, 'comment'],
			]);
		});
	});

	describe('#isCloseable', () => {
		it('should pass isCloseable true if widget has isCloseable property set to true', () => {
			const widgets = { myCloseableWidget: { isCloseable: true } };
			const wrapper = shallow(
				<ArrayWidget
					description={'My array description'}
					errorMessage={'This array is not correct'}
					id={'talend-array'}
					isValid
					schema={{ ...schema, itemWidget: 'myCloseableWidget' }}
					widgets={widgets}
					value={value}
				/>,
			);
			expect(
				wrapper.find('withI18nextTranslation(DefaultArrayTemplate)').prop('isCloseable'),
			).toEqual(true);
		});

		it('should pass isCloseable false if widget has isCloseable property set to false', () => {
			const widgets = { someWidget: { isCloseable: false } };
			const wrapper = shallow(
				<ArrayWidget
					description={'My array description'}
					errorMessage={'This array is not correct'}
					id={'talend-array'}
					isValid
					schema={{ ...schema, itemWidget: 'someWidget' }}
					widgets={widgets}
					value={value}
				/>,
			);
			expect(
				wrapper.find('withI18nextTranslation(DefaultArrayTemplate)').prop('isCloseable'),
			).toEqual(false);
		});

		it('should pass isCloseable false if widget does not have isCloseable property', () => {
			const widgets = { someWidget: {} };
			const wrapper = shallow(
				<ArrayWidget
					description={'My array description'}
					errorMessage={'This array is not correct'}
					id={'talend-array'}
					isValid
					schema={{ ...schema, itemWidget: 'someWidget' }}
					widgets={widgets}
					value={value}
				/>,
			);
			expect(
				wrapper.find('withI18nextTranslation(DefaultArrayTemplate)').prop('isCloseable'),
			).toEqual(false);
		});
	});
});
