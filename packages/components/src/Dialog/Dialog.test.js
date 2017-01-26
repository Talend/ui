import React from 'react';
import renderer from 'react-test-renderer';
import classNames from 'classnames';
import Dialog from './Dialog.component';

function getFakeComponent(name) {
	const fakeComponent = ({ children, className, ...rest }) => {
		const mergedClassName = classNames(className, name);
		return (<div {...rest} className={mergedClassName}>{children}</div>);
	};
	fakeComponent.propTypes = {
		children: React.PropTypes.oneOfType([React.PropTypes.any]),
		className: React.PropTypes.string,
	};
	return fakeComponent;
}

jest.mock('react-dom');
jest.mock('react-bootstrap/lib/Modal', () => {
	const Modal = getFakeComponent('Modal');
	Modal.Header = getFakeComponent('Header');
	Modal.Title = getFakeComponent('Title');
	Modal.Body = getFakeComponent('Body');
	Modal.Footer = getFakeComponent('Footer');

	return Modal;
});

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
	action: {
		label: 'OK',
		onClick: jest.fn(),
	},
};
const largeProps = {
	show: true,
	header: 'Hello world',
	size: 'large',
	action: {
		label: 'OK',
		onClick: jest.fn(),
	},
};
const children = (<div>BODY</div>);

describe('Dialog', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Dialog {...defaultProps}>{children}</Dialog>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render header', () => {
		const wrapper = renderer.create(
			<Dialog {...headerProps}>{children}</Dialog>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render action', () => {
		const wrapper = renderer.create(
			<Dialog {...actionProps}>{children}</Dialog>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render small', () => {
		const wrapper = renderer.create(
			<Dialog {...smallProps}>{children}</Dialog>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render large', () => {
		const wrapper = renderer.create(
			<Dialog {...largeProps}>{children}</Dialog>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
