import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import ErrorBoundary from './ErrorBoundary.component';

// missing in jsdom: https://github.com/jsdom/jsdom/issues/1721

function TestChildren(props) {
	if (props.breaking) {
		throw new Error('Bad');
	}
	return <div>hello world</div>;
}
TestChildren.propTypes = {
	breaking: PropTypes.bool,
};

describe('Component ErrorBoundary', () => {
	beforeEach(() => {
		global.window.URL.createObjectURL = jest.fn();
		global.console = {
			log: jest.fn(),
			error: jest.fn(),
		};
	});
	it('should render children', () => {
		const wrapper = mount(
			<ErrorBoundary>
				<TestChildren />
			</ErrorBoundary>,
		);
		expect(wrapper.text()).toEqual('hello world');
		expect(wrapper.find('ErrorPanel').length).toBe(0);
	});
	it('should render error panel when children break', () => {
		const wrapper = mount(
			<ErrorBoundary>
				<TestChildren breaking />
			</ErrorBoundary>,
		);
		expect(wrapper.text()).not.toEqual('hello world');
		expect(wrapper.find('ErrorPanel').length).toBe(1);
		expect(global.console.error).toHaveBeenCalled();
	});
});
