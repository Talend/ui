import React from 'react';
import renderer from 'react-test-renderer';
import ConfirmDialog from './ConfirmDialog.component';

jest.mock('react-dom');
jest.mock('react-bootstrap/lib/Modal', () => {
	function getFakeComponent(name) {
		return ({ children, className, ...rest }) => { // eslint-disable-line
			const mergedClassName = `${className || ''} ${name}`;
			return (<div {...rest} className={mergedClassName}>{children}</div>);
		};
	}

	const Modal = getFakeComponent('Modal');
	Modal.Header = getFakeComponent('Header');
	Modal.Title = getFakeComponent('Title');
	Modal.Body = getFakeComponent('Body');
	Modal.Footer = getFakeComponent('Footer');

	return Modal;
});

const children = (<div>BODY</div>);

const cancelAction = {
	label: 'CANCEL',
	onClick: jest.fn(),
	tooltipPlacement: 'top',
};

const validateAction = {
	label: 'OK',
	onClick: jest.fn(),
	tooltipPlacement: 'top',
};

describe('ConfirmDialog', () => {
	it('should render with defaults values', () => {
		// given
		const properties = {
			header: 'Hello world',
			show: true,
			validateAction,
			cancelAction,
		};

		// when
		const wrapper = renderer.create(
			<ConfirmDialog {...properties}>{children}</ConfirmDialog>
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render without header', () => {
		// given
		const properties = {
			show: true,
			validateAction,
			cancelAction,
		};

		// when
		const wrapper = renderer.create(
			<ConfirmDialog {...properties}>{children}</ConfirmDialog>
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with a small container', () => {
		// given
		const properties = {
			show: true,
			header: 'Hello world',
			size: 'small',
			validateAction,
			cancelAction,
		};

		// when
		const wrapper = renderer.create(
			<ConfirmDialog {...properties}>{children}</ConfirmDialog>
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with a large container', () => {
		// given
		const properties = {
			show: true,
			header: 'Hello world',
			size: 'large',
			validateAction,
			cancelAction,
		};

		// when
		const wrapper = renderer.create(
			<ConfirmDialog {...properties}>{children}</ConfirmDialog>
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
