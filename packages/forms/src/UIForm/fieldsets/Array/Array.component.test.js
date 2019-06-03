import React from 'react';
import { shallow, mount } from 'enzyme';
import ArrayWidget from './Array.component';
import { UIFormContext } from '../../context';
import widgets from '../../utils/widgets';
import templates from '../../utils/templates';

const schema = {
	description: 'My array description',
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

// eslint-disable-next-line react/prop-types
const ContextProvider = ({ children, valueUpdater = val => val }) => {
	const properties = {
		user: {
			firstname: 'my firstname',
			lastname: 'my lastname',
		},
		comment: '',
	};
	const contextValue = valueUpdater({
		id: 'myForm',
		onChange: jest.fn('onChange'),
		onFinish: jest.fn('onFinish'),
		onTrigger: jest.fn('onTrigger'),
		state: { properties, errors: {} },
		templates,
		widgets,
	});
	return <UIFormContext.Provider value={contextValue}>{children}</UIFormContext.Provider>;
};

describe('Array component', () => {
	it('should render array', () => {
		// when
		const wrapper = shallow(
			<ContextProvider>
				<ArrayWidget id={'talend-array'} schema={schema} value={value} />
			</ContextProvider>,
		);

		// then
		expect(wrapper.find(ArrayWidget).getElement()).toMatchSnapshot();
	});

	it("should render array that can't be reordered", () => {
		// given
		const nonReorderSchema = {
			...schema,
			reorder: false,
		};

		// when
		const wrapper = shallow(
			<ContextProvider>
				<ArrayWidget id={'talend-array'} schema={nonReorderSchema} value={value} />
			</ContextProvider>,
		);

		// then
		expect(wrapper.find(ArrayWidget).getElement()).toMatchSnapshot();
	});

	it('should render array with Add/Delete button disabled', () => {
		// given
		const disabledSchema = {
			...schema,
			disabled: true,
		};
		// when
		const wrapper = mount(
			<ContextProvider>
				<ArrayWidget id={'talend-array'} schema={disabledSchema} value={value} />
			</ContextProvider>,
		);
		// then
		expect(wrapper.find('Action#talend-array-btn').prop('disabled')).toBe(true);
	});

	describe('#onAdd', () => {
		it('should trigger onChange and validation with additional empty item', () => {
			// given
			const onChange = jest.fn();
			const onFinish = jest.fn();
			const wrapper = mount(
				<ContextProvider valueUpdater={val => ({ ...val, onChange, onFinish })}>
					<ArrayWidget id={'talend-array'} schema={schema} value={value} />
				</ContextProvider>,
			);

			// when
			wrapper.find('button.tf-array-add').simulate('click');

			// then
			const payload = { schema, value: value.concat({}) };
			expect(onChange).toBeCalledWith(expect.anything(), payload);
			expect(onFinish).toBeCalledWith(expect.anything(), payload);
		});

		it('should close all items with closeable item widget', () => {
			// given
			const onChange = jest.fn();
			const onFinish = jest.fn();
			const wrapper = mount(
				<ContextProvider valueUpdater={val => ({ ...val, onChange, onFinish })}>
					<ArrayWidget
						id={'talend-array'}
						schema={{ ...schema, itemWidget: 'collapsibleFieldset' }}
						value={value}
					/>
				</ContextProvider>,
			);

			// when
			wrapper.find('button.tf-array-add').simulate('click');

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
	});

	describe('#onRemove', () => {
		it('should trigger onChange and validation with new list', () => {
			// given
			const onChange = jest.fn();
			const onFinish = jest.fn();
			const wrapper = mount(
				<ContextProvider valueUpdater={val => ({ ...val, onChange, onFinish })}>
					<ArrayWidget id={'talend-array'} schema={schema} value={value} />
				</ContextProvider>,
			);

			// when
			wrapper
				.find('button.theme-delete')
				.at(1)
				.simulate('click');

			// then
			const payload = { schema, value: [value[0], value[2]] };
			expect(onChange).toBeCalledWith(expect.anything(), payload);
			expect(onFinish).toBeCalledWith(expect.anything(), payload, expect.anything());
		});

		it('should pass widget hook function to shift errors indexes', () => {
			// given
			const onChange = jest.fn();
			const onFinish = jest.fn();
			const wrapper = mount(
				<ContextProvider valueUpdater={val => ({ ...val, onFinish, onChange })}>
					<ArrayWidget id={'talend-array'} schema={schema} value={value} />
				</ContextProvider>,
			);

			wrapper
				.find('button.theme-delete')
				.at(1)
				.simulate('click');
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
			const wrapper = mount(
				<ContextProvider valueUpdater={val => ({ ...val, onFinish, onChange })}>
					<ArrayWidget id={'talend-array'} schema={schema} value={value} />
				</ContextProvider>,
			);

			// when
			wrapper
				.find('button.tf-array-item-reorder')
				.at(1)
				.simulate('click');

			// then
			const payload = { schema, value: [value[1], value[0], value[2]] };
			expect(onChange).toBeCalledWith(expect.anything(), payload);
			expect(onFinish).toBeCalledWith(expect.anything(), payload, expect.anything());
		});

		it('should pass widget hook function to shift errors indexes', () => {
			// given
			const onChange = jest.fn();
			const onFinish = jest.fn();
			const wrapper = mount(
				<ContextProvider valueUpdater={val => ({ ...val, onFinish, onChange })}>
					<ArrayWidget id={'talend-array'} schema={schema} value={value} />
				</ContextProvider>,
			);

			wrapper
				.find('button.tf-array-item-reorder')
				.at(1)
				.simulate('click');
			const options = onFinish.mock.calls[0][2];
			const oldErrors = {
				'comments,0,name': 'This is required',
				'comments,1,name': 'This is too short',
				'comments,1,comment': 'This is not long enough',
				'comments,2,email': 'This is too long',
			};

			// when
			const newErrors = options.widgetChangeErrors(oldErrors);

			// then
			expect(newErrors).toEqual({
				'comments,0,name': 'This is too short',
				'comments,0,comment': 'This is not long enough',
				'comments,1,name': 'This is required',
				'comments,2,email': 'This is too long',
			});
		});
	});

	describe('#renderItem', () => {
		it('should render item at given index', () => {
			// when
			const wrapper = mount(
				<ContextProvider>
					<ArrayWidget id={'talend-array'} schema={schema} value={value} />
				</ContextProvider>,
			);

			// then
			expect(wrapper.find('input#myForm_comments_0_name').length).toBe(1);
			expect(wrapper.find('input#myForm_comments_0_email').length).toBe(1);
			expect(wrapper.find('textarea#myForm_comments_0_comment').length).toBe(1);
		});
	});

	describe('#isCloseable', () => {
		it('should pass isCloseable true if widget has isCloseable property set to true', () => {
			// given
			const myCloseableWidget = () => <div />;
			myCloseableWidget.isCloseable = true;

			// when
			const wrapper = mount(
				<ContextProvider
					valueUpdater={val => ({
						...val,
						widgets: { ...val.widgets, myCloseableWidget },
					})}
				>
					<ArrayWidget
						id={'talend-array'}
						schema={{ ...schema, itemWidget: 'myCloseableWidget' }}
						value={value}
					/>
				</ContextProvider>,
			);

			// then
			expect(wrapper.find('Translate(DefaultArrayTemplate)').prop('isCloseable')).toEqual(true);
		});

		it('should pass isCloseable false if widget has isCloseable property set to false', () => {
			// given
			const myCloseableWidget = () => <div />;
			myCloseableWidget.isCloseable = false;

			// when
			const wrapper = mount(
				<ContextProvider
					valueUpdater={val => ({
						...val,
						widgets: { ...val.widgets, myCloseableWidget },
					})}
				>
					<ArrayWidget
						id={'talend-array'}
						schema={{ ...schema, itemWidget: 'myCloseableWidget' }}
						value={value}
					/>
				</ContextProvider>,
			);

			// then
			expect(wrapper.find('Translate(DefaultArrayTemplate)').prop('isCloseable')).toEqual(false);
		});

		it('should pass isCloseable false if widget does not have isCloseable property', () => {
			// given
			const myCloseableWidget = () => <div />;

			// when
			const wrapper = mount(
				<ContextProvider
					valueUpdater={val => ({
						...val,
						widgets: { ...val.widgets, myCloseableWidget },
					})}
				>
					<ArrayWidget
						id={'talend-array'}
						schema={{ ...schema, itemWidget: 'myCloseableWidget' }}
						value={value}
					/>
				</ContextProvider>,
			);

			expect(wrapper.find('Translate(DefaultArrayTemplate)').prop('isCloseable')).toBeFalsy();
		});
	});
});
