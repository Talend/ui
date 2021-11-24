import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import wrap from './wrap';

describe('wrap', () => {
	const Button = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;
	Button.propTypes = {
		onClick: PropTypes.func,
		children: PropTypes.node,
	};
	Button.displayName = 'Button';
	Button.foo = 'bar';
	Button.childContextTypes = 'should not be here';
	it('should create a component', () => {
		const WrappedButton = wrap(Button, 'MyButton');
		expect(WrappedButton.displayName).toBe('MyButton');
		const wrapper = mount(<WrappedButton text="hello" />);
		expect(wrapper.find('button').props().children[1]).toBe('hello');
	});

	it('should re-expose all attributes', () => {
		const WrappedButton = wrap(Button, 'MyButton');
		expect(WrappedButton.foo).toBe('bar');
		expect(WrappedButton.childContextTypes).toBeUndefined();
		expect(WrappedButton.propTypes).not.toEqual(Button.propTypes);
	});
});
