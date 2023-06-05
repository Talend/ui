import { render } from '@testing-library/react';
import { fromJS } from 'immutable';

import Container from './Form.container';
import Connected from './Form.connect';

jest.unmock('@talend/design-system');

const jsonSchema = {
	type: 'object',
	title: 'Comment',
	properties: {
		name: {
			type: 'string',
		},
	},
};
const uiSchema = [
	{
		key: 'name',
		title: 'Name',
	},
];
describe('Container(Form)', () => {
	const noOp = jest.fn();
	const defaultProps = {
		formId: 'test-form',
		initState: noOp,
		deleteState: noOp,
		className: 'foo',
		onSubmit: jest.fn(),
		onChange: jest.fn(),
		onErrors: jest.fn(),
		onTrigger: jest.fn(),
		formProps: { 'data-testid': 'Form' }, // extra props
	};

	it('should render a Form', () => {
		const { container } = render(
			<Container jsonSchema={jsonSchema} uiSchema={uiSchema} actions={[]} {...defaultProps} />,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should use props.onError', () => {
		const onErrors = jest.fn();
		const setState = jest.fn();
		const event = { target: 'test' };
		const form = new Container({
			state: fromJS({ data: { schema: true } }),
			onErrors,
			setState,
		});
		form.onErrors(event, { foo: 'bar' });
		expect(onErrors).toBeCalledWith(event, { foo: 'bar' });
		expect(setState).toBeCalledWith({ errors: { foo: 'bar' } });
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
		const event = { target: 'test' };
		const form = new Container({
			state: fromJS({ data: { schema: true } }),
			onChange,
			setState,
		});
		form.onChange(event, { foo: 'bar' }, 'my-form', 'key', 'value');
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
		const jsonSchemaFunc = () => jsonSchema;
		const form = new Container({
			jsonSchema: jsonSchemaFunc,
		});
		expect(form.jsonSchema()).toBe(jsonSchema);
	});

	it('should jsonSchema return call results from props.jsonSchema function', () => {
		const jsonSchemaFunc = () => jsonSchema;
		const form = new Container({
			jsonSchema: jsonSchemaFunc,
		});
		expect(form.jsonSchema()).toBe(jsonSchema);
	});

	it('should uiSchema return call results from props.uiSchema function', () => {
		const uiSchemaFunc = () => uiSchema;
		const form = new Container({
			uiSchema: uiSchemaFunc,
		});
		expect(form.uiSchema()).toBe(uiSchema);
	});

	it('should uiSchema return call results from props.uiSchema function', () => {
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
