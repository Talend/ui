import React from 'react';
import { mount, shallow } from 'enzyme';
import renderer from 'react-test-renderer';

// FIXME: Temporary fix only on tests while the issue
// described on the following pull request isn't fixed.
// https://github.com/mozilla-services/react-jsonschema-form/pull/387
// eslint-disable-next-line no-unused-vars
import { getDefaultRegistry } from 'react-jsonschema-form/lib/utils';

import Button from 'react-bootstrap/lib/Button';

import Input from 'react-jsonschema-form/lib/components/widgets/TextWidget';
import Checkbox from 'react-jsonschema-form/lib/components/widgets/CheckboxWidget';
import Select from 'react-jsonschema-form/lib/components/widgets/SelectWidget';

import Form, { renderActionIcon, renderActions } from '../src/Form';

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
};

describe('renderActionIcon', () => {
	it('Renders the <i /> component', () => {
		const wrapper = shallow(renderActionIcon('test'));
		expect(wrapper.containsMatchingElement(<i />)).toBeTruthy();
	});
	it("Doesn't render the <i /> component", () => {
		expect(renderActionIcon()).toBeNull();
	});
});

describe('renderActions', () => {
	it('Renders actions', () => {
		const actions = [{
			type: 'button',
			style: 'link',
			label: 'CANCEL',
		}, {
			type: 'submit',
			style: 'primary',
			label: 'VALIDATE',
		}];
		const wrapper = shallow(<div>{renderActions(actions)}</div>);
		expect(wrapper.find(Button)).toHaveLength(2);
	});
	it('Renders a single submit button', () => {
		const wrapper = shallow(renderActions());
		expect(wrapper.containsMatchingElement(<button type="submit">Submit</button>)).toBeTruthy();
	});
});

describe('<Form/>', () => {
	let wrapper;
	const onSubmit = jest.fn();
	const onChange = jest.fn();

	beforeEach(() => {
		wrapper = mount(<Form
			noHtml5Validate
			data={data}
			onChange={onChange}
			onSubmit={onSubmit}
		/>);
	});

	it('Renders the <Input/> component', () => {
		expect(wrapper.containsMatchingElement(<Input />)).toBeTruthy();
	});

	it('Renders the <Checkbox/> component', () => {
		expect(wrapper.containsMatchingElement(<Checkbox />)).toBeTruthy();
	});

	it('Renders the <Select/> component', () => {
		expect(wrapper.containsMatchingElement(<Select />)).toBeTruthy();
	});

	// TODO: Follow what's happening on https://github.com/airbnb/enzyme/issues/364
	// and update accordingly.
	// So far it's not possible to get the onChange method to be bubbled up to the
	// form
	it('Handles changes', () => {
		const input = wrapper.find('input').first();
		input.simulate('change', { target: { value: 'Test' } });
		expect(input.props().value).toEqual('Test');
		// expect(onChange.mock.calls.length).toEqual(1);
	});

	it('Handles submit', () => {
		wrapper.simulate('submit');
		expect(onSubmit.mock.calls.length).toEqual(1);
	});

	it('Renders the <form /> with an attribute novalidate', () => {
		const form = wrapper.find('form').first();
		expect(form.props().noValidate).toBeTruthy();
	});

	describe('<Form actions/>', () => {
		it('Renders default actions when no actions specified', () => {
			const actions = wrapper.find('button');
			expect(actions.length).toEqual(1);
			expect(actions.first().props().type).toEqual('submit');
		});

		it('Renders pass-in form actions', () => {
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
			wrapper = mount(<Form
				data={data}
				onSubmit={onSubmit}
				onChange={onChange}
				actions={formActions}
			/>);
			const actions = wrapper.find('button');
			expect(actions.length).toEqual(2);

			expect(actions.first().props().type).toEqual('submit');
			const reset = actions.at(1);
			expect(reset.props().type).toEqual('reset');

			reset.simulate('click');
			expect(onClickReset.mock.calls.length).toEqual(1);
		});

		it('Renders form with custom css', () => {
			const customData = {
				jsonSchema: {
					title: 'TestForm',
					type: 'object',
					properties: {
						name: {
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
				},
				{
					style: 'link',
					type: 'reset',
					onClick: onClickReset,
					label: 'Reset',
				},
			];
			const form = renderer.create(<Form
				className="form"
				buttonBlockClass="buttons"
				data={customData}
				onSubmit={onSubmit}
				onChange={onChange}
				actions={formActions}
			/>).toJSON();
			expect(form).toMatchSnapshot();
		});
	});
});
