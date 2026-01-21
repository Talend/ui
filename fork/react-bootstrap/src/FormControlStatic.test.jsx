/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';

import FormControl from './FormControl';

describe('<FormControl.Static>', () => {
	it('should render correctly', () => {
		render(
			<FormControl.Static name="foo" className="my-form-control-static">
				Static text
			</FormControl.Static>,
		);
		expect(document.querySelector('.form-control-static.my-form-control-static')).toHaveTextContent(
			'Static text',
		);
	});

	it('should support custom componentClass', () => {
		function MyComponent({ children, ...props }) {
			return <div {...props}>{children}</div>;
		}

		render(<FormControl.Static componentClass={MyComponent}>Static text</FormControl.Static>);
		expect(document.querySelector('.form-control-static')).toHaveTextContent('Static text');
	});
});
