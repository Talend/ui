import React from 'react';
import { shallow } from 'enzyme';
import Dialog from './Dialog.component';

jest.mock('react-dom');

const defaultProps = {
	show: true,
};
const headerProps = {
	header: 'Hello world',
	show: true,
};
const actionProps = {
	show: true,
	header: 'Hello world',
	action: {
		label: 'OK',
		onClick: jest.fn(),
	},
};
const smallProps = {
	show: true,
	header: 'Hello world',
	size: 'small',
	onHide: jest.fn(),
	dialogClassName: 'customDialogClassName',
	keyboard: true,
	backdrop: false,
	action: {
		label: 'OK',
		onClick: jest.fn(),
	},
};
const largeProps = {
	show: true,
	header: 'Hello world',
	size: 'large',
	onHide: jest.fn(),
	dialogClassName: 'customDialogClassName',
	keyboard: true,
	backdrop: false,
	action: {
		label: 'OK',
		onClick: jest.fn(),
	},
};

const children = (<div>BODY</div>);

describe('Dialog', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Dialog {...defaultProps}>{children}</Dialog>
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render header', () => {
		const wrapper = shallow(
			<Dialog {...headerProps}>{children}</Dialog>
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render action', () => {
		const wrapper = shallow(
			<Dialog {...actionProps}>{children}</Dialog>
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render small', () => {
		const wrapper = shallow(
			<Dialog {...smallProps}>{children}</Dialog>
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render large', () => {
		const wrapper = shallow(
			<Dialog {...largeProps}>{children}</Dialog>
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should spread props', () => {
		const wrapper = shallow(<Dialog foo="bar" id="my-id" className="foo" />);
		expect(wrapper.props()).toMatchObject({
			foo: 'bar',
			id: 'my-id',
			className: 'foo',
		});
	});
});
