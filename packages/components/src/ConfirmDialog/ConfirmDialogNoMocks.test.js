import React from 'react';
import renderer from 'react-test-renderer';
import classNames from 'classnames';
import { shallow, render } from 'enzyme';

import ConfirmDialog from './ConfirmDialog.component';


function mockFakeComponent(name) {
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

jest.mock('react-bootstrap/lib/ProgressBar', () => mockFakeComponent('ProgressBar'));

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


	it('should render the body with overflow hidden if bodyOverflow is set to false', () => {
		// given
		const properties = {
			header: 'Hello world',
			show: true,
			validateAction,
			cancelAction,
		};
		const noOp = () => {};
		// when
		const wrapper = render(
			<ConfirmDialog onHide={noOp} animation={false} {...properties}><p>Content</p></ConfirmDialog>
		);

		// then
		expect(wrapper).toBe(1);
	});
});
