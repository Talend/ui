import React from 'react';
import { mount, shallow } from 'enzyme';
import { fromJS } from 'immutable';

import Container from './Form.container';
import Connected from './Form.connect';

describe('Container(Form)', () => {
	it('should pass props to Form lib', () => {
		const wrapper = shallow(
			<Container
				formId="test-form"
				jsonSchema={{ schema: true }}
				uiSchema={{ uiSchema: true }}
				actions={[]}
				className="foo"
				onTrigger={jest.fn()}
				formProps={{ other: true }} // extra props
				loading
			/>,
		);
		const props = wrapper.props();
		expect(props).toMatchSnapshot();
	});

	it('should render a Form', () => {
		const wrapper = shallow(
			<Container
				formId="test-form"
				jsonSchema={{ schema: true }}
				uiSchema={{ uiSchema: true }}
				actions={[]}
				formProps={{ other: true }} // extra props
			/>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with prop uiform = false : Form', () => {
		const wrapper = mount(<Container jsonSchema={{}} uiSchema={{}} uiform={false} />);

		expect(wrapper.find('TalendForm').length).toBe(1);
		expect(wrapper.find('TalendUIForm').length).toBe(0);
	});

	it('should render with prop uiform = true : UIForm', () => {
		const wrapper = mount(<Container jsonSchema={{}} uiSchema={{}} uiform />);
		expect(wrapper.find('TalendForm').length).toBe(1);
		expect(wrapper.find('TalendUIForm').length).toBe(1);
	});

	it('should render UIForm with language prop set', () => {
		const wrapper = mount(
			<Container
				formId="test-form"
				jsonSchema={{}}
				uiSchema={{}}
				actions={[]}
				formProps={{ other: true }}
				uiform
				language={{ OBJECT_REQUIRED: 'Field translated' }}
			/>,
		).find('TalendUIForm');
		expect(wrapper.props().language.OBJECT_REQUIRED).toEqual('Field translated');
	});

	it('should render UIForm with customFormat prop set', () => {
		// given
		const notABCRegExp = /[^abc]+/g;
		const customFormats = {
			noABC: fieldData => {
				if (typeof fieldData === 'string' && !notABCRegExp.test(fieldData)) {
					return 'test custom';
				}
				return null;
			},
		};
		const customValidation = (schema, value) =>
			value.length >= 5 && 'Custom validation : The value should be less than 5 chars';
		const wrapper = mount(
			<Container
				formId="test-form"
				jsonSchema={{}}
				uiSchema={{}}
				actions={[]}
				formProps={{ other: true }}
				uiform
				customFormats={customFormats}
				customValidation={customValidation}
			/>,
		).find('TalendUIForm');
		expect(wrapper.props().customFormats).toEqual(customFormats);
		expect(wrapper.props().customValidation).toEqual(customValidation);
	});

	it('should use props.onError', () => {
		const onErrors = jest.fn();
		const form = new Container({
			state: fromJS({ data: { schema: true } }),
			onErrors,
		});
		form.onErrors(null, { foo: 'bar' });
		expect(onErrors.mock.calls[0][1]).toEqual({ foo: 'bar' });
	});

	it('should use props.onSubmit', () => {
		const onSubmit = jest.fn();
		const dispatchActionCreator = jest.fn();
		const setState = jest.fn();
		const form = new Container({
			state: fromJS({ data: { schema: true } }),
			setState,
			onSubmitActionCreator: 'myaction',
			onSubmit,
			dispatchActionCreator,
		});
		form.onSubmit(null, { foo: 'bar' });
		expect(onSubmit.mock.calls[0][0]).toEqual({ foo: 'bar' });
		expect(dispatchActionCreator.mock.calls[0][0]).toBe('myaction');
		expect(dispatchActionCreator.mock.calls[0][1]).toBe(null);
		expect(dispatchActionCreator.mock.calls[0][2].formData).toEqual({ foo: 'bar' });
		expect(dispatchActionCreator.mock.calls[0][2].props.state.size).toBe(1);
		expect(setState.mock.calls.length).toBe(0);
	});

	it('should use props.onChange', () => {
		const onChange = jest.fn();
		const setState = jest.fn();
		const form = new Container({
			state: fromJS({ data: { schema: true } }),
			onChange,
			setState,
		});
		form.onChange(null, { foo: 'bar' }, 'my-form', 'key', 'value');
		expect(onChange.mock.calls[0]).toMatchSnapshot();
		expect(setState.mock.calls[0]).toMatchSnapshot();
	});

	it('should have getFormData static', () => {
		expect(typeof Container.getFormData).toBe('function');
		const formId = 'my-form';
		const state = {
			cmf: {
				components: fromJS({
					'Container(Form)': {
						[formId]: {
							data: { foo: 'bar' },
						},
					},
				}),
			},
		};
		const formData = Container.getFormData(state, formId);
		expect(formData.get('foo')).toBe('bar');
	});

	it('should formActions return props.action', () => {
		const actions = { foo: 'bar' };
		const form = new Container({
			actions,
		});
		expect(form.formActions()).toBe(actions);
	});

	it('should formActions return call results from props.actions function', () => {
		const actions = { foo: 'bar' };
		const actionsFunc = () => actions;
		const form = new Container({
			actions: actionsFunc,
		});
		expect(form.formActions()).toBe(actions);
	});

	it('should jsonSchema return call results from props.jsonSchema function', () => {
		const jsonSchema = { foo: 'bar' };
		const jsonSchemaFunc = () => jsonSchema;
		const form = new Container({
			jsonSchema: jsonSchemaFunc,
		});
		expect(form.jsonSchema()).toBe(jsonSchema);
	});

	it('should jsonSchema return call results from props.jsonSchema function', () => {
		const jsonSchema = { foo: 'bar' };
		const jsonSchemaFunc = () => jsonSchema;
		const form = new Container({
			jsonSchema: jsonSchemaFunc,
		});
		expect(form.jsonSchema()).toBe(jsonSchema);
	});

	it('should uiSchema return call results from props.uiSchema function', () => {
		const uiSchema = { foo: 'bar' };
		const uiSchemaFunc = () => uiSchema;
		const form = new Container({
			uiSchema: uiSchemaFunc,
		});
		expect(form.uiSchema()).toBe(uiSchema);
	});

	it('should uiSchema return call results from props.uiSchema function', () => {
		const uiSchema = { foo: 'bar' };
		const uiSchemaFunc = () => uiSchema;
		const form = new Container({
			uiSchema: uiSchemaFunc,
		});
		expect(form.uiSchema()).toBe(uiSchema);
	});

	it('use ArrayFieldTemplate given by props over default ArrayFieldTemplate', () => {
		const wrapper = shallow(
			<Container
				ArrayFieldTemplate="ArrayFieldTemplate"
				formId="test-form"
				jsonSchema={{ schema: true }}
				uiSchema={{ uiSchema: true }}
				actions={[]}
				className="foo"
				formProps={{ other: true }} // extra props
			/>,
		);
		const props = wrapper.props();
		expect(props).toHaveProperty('ArrayFieldTemplate', 'ArrayFieldTemplate');
	});
});

describe('Connected Form', () => {
	it('should connect Form', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});
