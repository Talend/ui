import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { mount } from 'enzyme';

import AboutDialog from './AboutDialog.component';

function mockFakeComponent(name) {
	const fakeComponent = ({ children, className, ...rest }) => {
		const mergedClassName = classNames(className, name);
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

jest.mock('react-dom');
jest.mock('react-bootstrap/lib/Modal', () => {
	const Modal = mockFakeComponent('Modal');
	Modal.Header = mockFakeComponent('Header');
	Modal.Title = mockFakeComponent('Title');
	Modal.Body = mockFakeComponent('Body');
	Modal.Footer = mockFakeComponent('Footer');
	return Modal;
});

describe('AboutDialog', () => {
	it('should render the body with overflow hidden if bodyOverflow is set to false', () => {
		const onToggle = jest.fn();
		const props = {
			show: true,
			version: 'Summer 18',
			icon: 'talend-tdp-colored',
			onToggle,
			services: ['API', 'Dataset', 'Preparation', 'Transformation'].map(name => ({
				version: '2.8.0-SNAPSHOT',
				build: '87d0dcd-12e0d6f',
				name,
			})),
		};

		const wrapper = mount(<AboutDialog {...props} />);

		wrapper
			.find('button')
			.at(0)
			.simulate('click');

		expect(onToggle).toHaveBeenCalled();
	});
});
