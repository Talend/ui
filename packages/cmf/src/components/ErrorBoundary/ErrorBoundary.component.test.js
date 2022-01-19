import React from 'react';
import PropTypes from 'prop-types';
import { render, screen } from '@testing-library/react';

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
		render(
			<ErrorBoundary>
				<TestChildren />
			</ErrorBoundary>,
		);
		expect(screen.getByText('hello world')).toBeDefined();
	});
	it('should render error panel when children break', () => {
		render(
			<ErrorBoundary>
				<TestChildren breaking />
			</ErrorBoundary>,
		);
		expect(screen.getByText('Error: Bad')).toBeDefined();
		expect(() => screen.getByText('hello world')).toThrow();
		expect(global.console.error).toHaveBeenCalled();
	});
});
