import React from 'react';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import Container from './Form.container';
import Connected from './Form.connect';

describe('Container(Form)', () => {
	it('should pass props to Form lib', () => {
		const actions = [];
		const formProps = { other: true };
		const wrapper = shallow(
			<Container
				formId="test-form"
				jsonSchema={{ schema: true }}
				uiSchema={{ uiSchema: true }}
				actions={actions}
				formProps={formProps}  // extra props
			/>,
		);
		const props = wrapper.props();
		expect(props).toMatchSnapshot();
	});

	it('should render a Form', () => {
		const actions = [];
		const formProps = { other: true };
		const wrapper = shallow(
			<Container
				formId="test-form"
				jsonSchema={{ schema: true }}
				uiSchema={{ uiSchema: true }}
				actions={actions}
				formProps={formProps}  // extra props
			/>,
		);
		expect(wrapper.root.node).toMatchSnapshot();
	});

	it('should use props.onSubmit', () => {
		const data = { schema: true };
		const onSubmit = jest.fn();
		const dispatchActionCreator = jest.fn();
		const form = new Container({
			state: fromJS({ data }),
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
		const data = { schema: true };
		const onChange = jest.fn();
		const setState = jest.fn();
		const form = new Container({
			state: fromJS({ data }),
			onChange,
			setState,
		});
		form.onChange({ foo: 'bar' }, 'my-form', 'key', 'value');
		expect(onChange.mock.calls[0]).toMatchSnapshot();
		expect(setState.mock.calls[0]).toMatchSnapshot();
	});

	it('should use props.onTrigger', () => {
		const data = { schema: true };
		const onTrigger = jest.fn();
		const form = new Container({
			state: fromJS({ data }),
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
						'my-form': {
							data: { foo: 'bar' },
						},
					},
				}),
			},
		};
		const formData = Container.getFormData(state, formId);
		expect(formData.get('foo')).toBe('bar');
	});
});

describe('Connected Form', () => {
	it('should connect Form', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
});
