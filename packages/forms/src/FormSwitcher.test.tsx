import React from 'react';

import { render, screen } from '@testing-library/react';

import FormSwitcher from './FormSwitcher';
import { data } from '../__mocks__/data';

describe('FormSwitcher', () => {
	it('should render skeleton if props.loading', () => {
		render(<FormSwitcher loading />);
		expect(screen.getByTestId('form.skeleton')).toBeVisible();
	});

	it('should render UIForm when uiSchema is an array', () => {
		render(<FormSwitcher data={data} />);
		expect(screen.queryByTestId('form.skeleton')).not.toBeInTheDocument();
		expect(screen.getAllByRole('button')).toHaveLength(2);
	});
});
