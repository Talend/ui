import React from 'react';
import { shallow } from 'enzyme';
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
				formProps={{ other: true }} // extra props
			/>
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
			/>
		);
		expect(wrapper.root.node).toMatchSnapshot();
	});

	it('should use props.onSubmit', () => {
		const onSubmit = jest.fn();
		const dispatchActionCreator = jest.fn();
		const form = new Container({
			state: fromJS({ data: { schema: true } }),
			setState: jest.fn(),
			onSubmitActionCreator: 'myaction',
			onSubmit,
			dispatchActionCreator,
		});
		form.onSubmit({ foo: 'bar' });
		expect(onSubmit.mock.calls[0][0]).toMatchSnapshot();
		expect(dispatchActionCreator.mock.calls[0]).toMatchSnapshot();
	});

	it('should use props.onChange', () => {
		const onChange = jest.fn();
		const setState = jest.fn();
		const form = new Container({
			state: fromJS({ data: { schema: true } }),
			onChange,
			setState,
		});
		form.onChange({ foo: 'bar' }, 'my-form', 'key', 'value');
		expect(onChange.mock.calls[0]).toMatchSnapshot();
		expect(setState.mock.calls[0]).toMatchSnapshot();
	});

	it('should use props.onTrigger', () => {
		const onTrigger = jest.fn();
		const form = new Container({
			state: fromJS({ data: { schema: true } }),
			onTrigger,
		});
		form.onTrigger({ foo: 'bar' }, 'my-form', 'key', 'value');
		expect(onTrigger.mock.calls[0]).toMatchSnapshot();
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
});

describe('Connected Form', () => {
	it('should connect Form', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});
