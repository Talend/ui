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

const subtitleProps = {
	header: 'Hello world',
	subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	show: true,
};
const errorProps = {
	header: 'Hello world',
	subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	error: 'Vestibulum molestie id massa eu pretium.',
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
const flexProps = {
	header: 'Hello World',
	flex: true,
};

const children = <div>BODY</div>;

describe('Dialog', () => {
	it('should render', () => {
		const wrapper = shallow(<Dialog {...defaultProps}>{children}</Dialog>);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render header', () => {
		const wrapper = shallow(<Dialog {...headerProps}>{children}</Dialog>);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render subtitle', () => {
		const wrapper = shallow(<Dialog {...subtitleProps}>{children}</Dialog>);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render error', () => {
		const wrapper = shallow(<Dialog {...errorProps}>{children}</Dialog>);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render action', () => {
		const wrapper = shallow(<Dialog {...actionProps}>{children}</Dialog>);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render small', () => {
		const wrapper = shallow(<Dialog {...smallProps}>{children}</Dialog>);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render large', () => {
		const wrapper = shallow(<Dialog {...largeProps}>{children}</Dialog>);
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
	it('render modal without modal-flex class if flex prop is not set', () => {
		const wrapper = shallow(<Dialog {...defaultProps}>{children}</Dialog>);
		expect(wrapper.hasClass('modal-flex')).toBe(false);
	});
	it('render modal with modal-flex class if flex prop is true', () => {
		const wrapper = shallow(<Dialog {...flexProps}>{children}</Dialog>);
		expect(wrapper.hasClass('modal-flex')).toBe(true);
	});
});
