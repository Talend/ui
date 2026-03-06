import { render } from '@testing-library/react';

import Form from './Form';
import FormGroup from './FormGroup';

describe('<Form>', () => {
	it('should support horizontal', () => {
		render(
			<Form horizontal className="my-form">
				<FormGroup />
			</Form>,
		);
		expect(document.querySelector('form')).toHaveClass('form-horizontal');
	});

	it('should support inline', () => {
		render(
			<Form inline className="my-form">
				<FormGroup />
			</Form>,
		);
		expect(document.querySelector('form')).toHaveClass('form-inline');
	});

	it('should support custom componentClass', () => {
		render(
			<Form componentClass="fieldset" horizontal className="my-form">
				<FormGroup />
			</Form>,
		);
		expect(document.querySelector('fieldset')).toHaveClass('form-horizontal');
	});
});
