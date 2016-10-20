import React from 'react';
import renderer from 'react-test-renderer';

import Action from './Action.component';

jest.mock('react-dom');

const myAction = {
	label: 'Click me',
	icon: 'fa fa-asterisk',
	onClick: jest.fn(),
	extra: 'extra',
};

describe('Action', () => {
	it('should render a button', () => {
		const wrapper = renderer.create(<Action {...myAction} />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should click on the button trigger the onclick props', () => {
		const wrapper = renderer.create(<Action {...myAction} />).toJSON();
		wrapper.props.onClick();
		expect(myAction.onClick).toHaveBeenCalled();
		expect(myAction.onClick.mock.calls.length).toBe(1);
		const args = myAction.onClick.mock.calls[0];
		expect(args.length).toBe(2);
		expect(args[0]).toBe();
		expect(args[1].action.extra).toBe('extra');
	});
});
