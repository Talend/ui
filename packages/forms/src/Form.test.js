import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

// FIXME: Temporary fix only on tests while the issue
// described on the following pull request isn't fixed.
// https://github.com/mozilla-services/react-jsonschema-form/pull/387
// eslint-disable-next-line no-unused-vars
import { getDefaultRegistry } from 'react-jsonschema-form/lib/utils';

import { Action } from '@talend/react-components';

import Input from 'react-jsonschema-form/lib/components/widgets/TextWidget';
import Select from 'react-jsonschema-form/lib/components/widgets/SelectWidget';

import Form, { renderActionIcon, renderActions } from './Form';
import DatalistWidget from './widgets/DatalistWidget/DatalistWidget';

const data = {
	jsonSchema: {
		title: 'TestForm',
		type: 'object',
		properties: {
			name: {
				type: 'string',
				title: 'Name',
				default: 'John Doe',
			},
			admin: {
				type: 'boolean',
				title: 'Admin',
				default: true,
			},
			roles: {
				type: 'string',
				enum: ['dev', 'pm'],
				enumName: ['Developer', 'Project Manager'],
			},
		},
	},
	uiSchema: {
		admin: {
			'ui:trigger': ['after'],
		},
	},
};

const dataListData = {
	jsonSchema: {
		title: 'TestForm',
		type: 'object',
		properties: {
			datalist: {
				type: 'string',
				default: 'App',
				enum: ['Apple', 'Pine[apple]', 'Banana', 'Cher[ry', 'Lemo}n', 'Grapefruit'],
			},
		},
	},
	uiSchema: {
		datalist: {
			'ui:widget': 'datalist',
		},
	},
};

describe('renderActionIcon', () => {
	it('should render the <i /> component', () => {
		const wrapper = shallow(renderActionIcon('test'));
		expect(wrapper.containsMatchingElement(<i />)).toBeTruthy();
	});

	it('shoud not render the <i /> component', () => {
		expect(renderActionIcon()).toBeNull();
	});
});

describe('renderActions', () => {
	// given
	it('should render actions', () => {
		function noop() {}

		const actions = [
			{
				type: 'button',
				style: 'link',
				label: 'CANCEL',
				onClick: () => {},
			},
			{
				type: 'button',
				style: 'primary',
				label: 'VALIDATE',
				onClick: () => {},
			},
			{
				type: 'submit',
				style: 'primary',
				label: 'SUBMIT',
				disabled: true,
				onClick: () => {},
			},
		];

		// when
		const wrapper = shallow(<div>{renderActions(actions, noop)}</div>);

		// then
		expect(wrapper.find(Action)).toHaveLength(3);
		expect(
			wrapper
				.find(Action)
				.first()
				.props().disabled,
		).toBeFalsy();
		expect(
			wrapper
				.find(Action)
				.last()
				.props().disabled,
		).toBeTruthy();
	});

	it('should render a single submit button', () => {
		const wrapper = shallow(<div>{renderActions()}</div>);
		expect(
			wrapper
				.find(Action)
				.first()
				.props().label,
		).toEqual('Submit');
	});
});

describe('<Form/>', () => {
	let wrapper;
	const onSubmit = jest.fn();
	const onChange = jest.fn();
	const onTrigger = jest.fn();

	it('should have a displayName', () => {
		expect(Form.displayName).toBe('TalendForm');
	});

	describe('render simple elements', () => {
		beforeEach(() => {
			wrapper = mount(<Form noHtml5Validate data={data} />);
		});

		it('should render the <Input/> component', () => {
			expect(wrapper.containsMatchingElement(<Input />)).toBeTruthy();
		});

		it('should the <Toggle/> component', () => {
			expect(wrapper.containsMatchingElement(<input type="checkbox" />)).toBeTruthy();
		});

		it('should render the <Select /> component', () => {
			expect(wrapper.containsMatchingElement(<Select />)).toBeTruthy();
		});

		it('should render the novalidate attribute', () => {
			const form = wrapper.find('form').first();
			expect(form.props().noValidate).toBeTruthy();
		});
	});

	describe('render datalist', () => {
		beforeEach(() => {
			wrapper = mount(
				<Form noHtml5Validate data={dataListData} onChange={onChange} onSubmit={onSubmit} />,
			);
		});

		it('should Render the <DatalistWidget /> component', () => {
			expect(wrapper.find(DatalistWidget).length).toEqual(1);
		});

		it('should handle changes', () => {
			// given
			const input = wrapper.find('input').first();

			// when
			input.simulate('change', { target: { value: 'App' } });

			// then
			expect(input.props().value).toEqual('App');
		});
	});

	describe('events', () => {
		beforeEach(() => {
			jest.resetAllMocks();
			wrapper = mount(
				<Form data={data} onChange={onChange} onTrigger={onTrigger} onSubmit={onSubmit} />,
			);
		});

		// TODO: Follow what's happening on https://github.com/airbnb/enzyme/issues/364
		// and update accordingly.
		// So far it's not possible to get the onChange method to be bubbled up to the
		// form
		it('should handles change', done => {
			// given
			const input = wrapper.find('input').first();

			// when
			input.simulate('change', { target: { value: 'Test' } });

			// then
			expect(input.props().value).toEqual('Test');
			setTimeout(() => {
				wrapper.setState({}, () => {
					expect(onChange.mock.calls.length).toEqual(1);
					done();
				});
			}, 100);
		});

		it('should handles triggers and change if fied as ui:trigger property', done => {
			// given
			const input = wrapper.find('input').at(1);

			// when
			input.simulate('change', { target: { value: true } });

			// then
			setTimeout(() => {
				wrapper.setState({}, () => {
					expect(onChange.mock.calls.length).toEqual(1);
					expect(onTrigger.mock.calls.length).toEqual(1);
					done();
				});
			}, 100);
		});

		it('should not trigger onTrigger if updated field has no ui:trigger property', done => {
			// given
			const input = wrapper.find('input').first();

			// when
			input.simulate('change', { target: { value: 'Test' } });

			// then
			setTimeout(() => {
				wrapper.setState({}, () => {
					expect(onTrigger.mock.calls.length).toEqual(0);
					expect(onChange.mock.calls.length).toEqual(1);
					done();
				});
			}, 100);
		});

		it('should handle submit', () => {
			wrapper.simulate('submit');
			expect(onSubmit.mock.calls.length).toEqual(1);
		});
	});

	describe('children', () => {
		it('should render children', () => {
			wrapper = shallow(
				<Form data={data} onSubmit={onSubmit}>
					<h1>test</h1>
				</Form>,
			);
			expect(wrapper.find('h1')).toBeDefined();
		});
	});

	describe('actions', () => {
		it('should render default actions when no actions specified', () => {
			// when
			wrapper = mount(<Form data={data} onSubmit={onSubmit} />);

			// then
			const actions = wrapper.find('button');
			expect(actions.length).toEqual(1);
			expect(actions.first().props().type).toEqual('submit');
		});

		it('should render pass-in form actions', () => {
			// given
			const onClickReset = jest.fn();
			const formActions = [
				{
					style: 'primary',
					type: 'submit',
					onClick: onSubmit,
					label: 'Submit',
				},
				{
					style: 'link',
					type: 'reset',
					onClick: onClickReset,
					label: 'Reset',
				},
			];

			// when
			wrapper = mount(
				<Form data={data} onSubmit={onSubmit} onChange={onChange} actions={formActions} />,
			);

			// then
			const actions = wrapper.find('button');
			expect(actions.length).toEqual(2);

			expect(actions.first().props().type).toEqual('submit');
			const reset = actions.at(1);
			expect(reset.props().type).toEqual('reset');

			reset.simulate('click');
			expect(onClickReset.mock.calls.length).toEqual(1);
			expect(onClickReset.mock.calls[0][0]).toBeTruthy();
			expect(onClickReset.mock.calls[0][1]).toMatchSnapshot();
		});

		it('should render form with custom css', () => {
			// given
			const customData = {
				jsonSchema: {
					title: 'TestForm',
					type: 'object',
					properties: {
						name: {
							required: true,
							type: 'string',
							title: 'Name',
							default: 'John Doe',
						},
						roles: {
							type: 'string',
							enum: ['dev', 'pm'],
							enumName: ['Developer', 'Project Manager'],
						},
					},
				},
			};
			const onClickReset = jest.fn();
			const formActions = [
				{
					style: 'primary',
					type: 'submit',
					onClick: onSubmit,
					label: 'Submit',
					disabled: true,
				},
				{
					style: 'link',
					type: 'reset',
					onClick: onClickReset,
					label: 'Reset',
				},
			];

			// when
			const form = renderer
				.create(
					<Form
						className="form"
						buttonBlockClass="buttons"
						data={customData}
						onSubmit={onSubmit}
						onChange={onChange}
						actions={formActions}
					/>,
				)
				.toJSON();

			// then
			expect(form).toMatchSnapshot();
		});
	});
});
