import React from 'react';
import { mount } from 'enzyme';
import mock from '@talend/react-cmf/lib/mock';
import wrap from './wrap';

describe('wrap', () => {
	const Button = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;
	Button.displayName = 'Button';
	let context = mock.context();
	context.registry = {};
	it('should create a component', () => {
		const WrappedButton = wrap(Button, 'MyButton');
		expect(WrappedButton.displayName).toBe('Connect(CMF(MyButton))');
		const wrapper = mount(<WrappedButton text="hello" />, {
			context,
			childContextTypes: {
				registry: React.PropTypes.object,
			},
		});
		expect(wrapper.find('button').props().children[1]).toBe('hello');
	});
});
