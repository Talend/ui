import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';

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
		const wrapper = render(
			<ErrorBoundary>
				<TestChildren />
			</ErrorBoundary>,
		);
		expect(wrapper.container.querySelector('div').textContent).toEqual('hello world');
	});
	it('should render error panel when children break', () => {
		const wrapper = render(
			<ErrorBoundary>
				<TestChildren breaking />
			</ErrorBoundary>,
		);
		expect(wrapper.container.querySelector('div').textContent).not.toEqual('hello world');
		expect(wrapper.container.querySelector('.error-title').textContent).toBe('Error: Bad');
		expect(global.console.error).toHaveBeenCalled();
	});
});
