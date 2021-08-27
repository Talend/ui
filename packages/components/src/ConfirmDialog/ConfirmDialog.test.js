import PropTypes from 'prop-types';
import React from 'react';
import renderer from 'react-test-renderer';
import classNames from 'classnames';
import { mount } from 'enzyme';

import ConfirmDialog from './ConfirmDialog.component';

function mockFakeComponent(name) {
	const fakeComponent = ({ children, className, ...rest }) => {
		const mergedClassName = classNames(className, name, 'mocked-component');
		return (
			<div {...rest} className={mergedClassName}>
				{children}
			</div>
		);
	};
	fakeComponent.propTypes = {
		children: PropTypes.oneOfType([PropTypes.any]),
		className: PropTypes.string,
	};
	return fakeComponent;
}

jest.mock('@talend/react-bootstrap/lib/Modal', () => {
	const Modal = mockFakeComponent('Modal');
	Modal.Header = mockFakeComponent('Header');
	Modal.Title = mockFakeComponent('Title');
	Modal.Body = mockFakeComponent('Body');
	Modal.Footer = mockFakeComponent('Footer');

	return Modal;
});
jest.mock('@talend/react-bootstrap/lib/ProgressBar', () => mockFakeComponent('ProgressBar'));

const children = <div>BODY</div>;

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
		const wrapper = renderer
			.create(<ConfirmDialog {...properties}>{children}</ConfirmDialog>)
			.toJSON();

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
		const wrapper = renderer
			.create(<ConfirmDialog {...properties}>{children}</ConfirmDialog>)
			.toJSON();

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
		const wrapper = renderer
			.create(<ConfirmDialog {...properties}>{children}</ConfirmDialog>)
			.toJSON();

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
		const wrapper = renderer
			.create(<ConfirmDialog {...properties}>{children}</ConfirmDialog>)
			.toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with a progress bar', () => {
		// given
		const properties = {
			show: true,
			header: 'Hello world',
			size: 'large',
			validateAction,
			cancelAction,
			progressLabel: 'This is loading',
			progressValue: 25,
		};

		// when
		const wrapper = renderer
			.create(<ConfirmDialog {...properties}>{children}</ConfirmDialog>)
			.toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render the body with overflow hidden if bodyOverflow is set to false', () => {
		// given
		const properties = {
			header: 'Hello world',
			show: true,
			validateAction,
			cancelAction,
			bodyOverflow: false,
		};
		const noOp = () => {};
		// when
		const wrapper = mount(
			<ConfirmDialog onHide={noOp} animation={false} {...properties}>
				<p>Content</p>
			</ConfirmDialog>,
		);

		// then
		expect(wrapper.find('ConfirmDialog').getElement().props.bodyOverflow).toBe(false);
	});

	it('should render with additional actions', () => {
		// given
		const properties = {
			header: 'Hello world',
			show: true,
			validateAction,
			cancelAction,
			secondaryActions: [
				{
					label: 'Keep on Github',
					onClick: jest.fn(),
					bsStyle: 'info',
				},
			],
		};

		// when
		const wrapper = renderer
			.create(<ConfirmDialog {...properties}>{children}</ConfirmDialog>)
			.toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
