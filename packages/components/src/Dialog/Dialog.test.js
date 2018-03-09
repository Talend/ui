import PropTypes from 'prop-types';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import classNames from 'classnames';
import Dialog from './Dialog.component';

function mockFakeComponent(name) {
	const fakeComponent = ({ children, className, ...rest }) => {
		const mergedClassName = classNames(className, name);
		return (<div {...rest} className={mergedClassName}>{children}</div>);
	};
	fakeComponent.propTypes = {
		children: PropTypes.oneOfType([PropTypes.any]),
		className: PropTypes.string,
	};
	return fakeComponent;
}

jest.mock('react-dom');
// jest.mock('react-bootstrap/lib/Modal', () => {
// 	const Modal = mockFakeComponent('Modal');
// 	Modal.Header = mockFakeComponent('Header');
// 	Modal.Title = mockFakeComponent('Title');
// 	Modal.Body = mockFakeComponent('Body');
// 	Modal.Footer = mockFakeComponent('Footer');

// 	return Modal;
// });

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
	bsDialogProps: {
		onHide: jest.fn(),
		dialogClassName: 'customDialogClassName',
		keyboard: true,
		backdrop: false,
	},
	action: {
		label: 'OK',
		onClick: jest.fn(),
	},
};
const largeProps = {
	show: true,
	header: 'Hello world',
	size: 'large',
	bsDialogProps: {
		onHide: jest.fn(),
		dialogClassName: 'customDialogClassName',
		keyboard: true,
		backdrop: false,
	},
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
});
