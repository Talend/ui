import { render, screen } from '@testing-library/react';

import FormSkeleton from './FormSkeleton';

describe('FormSkeleton', () => {
	it('should render skeleton', () => {
		render(<FormSkeleton />);
		expect(screen.getByTestId('form.skeleton')).toHaveAttribute('aria-busy', 'true');
		expect(screen.getByTestId('form.skeleton.fields')).toBeInTheDocument();
		expect(screen.getByTestId('form.skeleton.buttons')).toBeInTheDocument();
	});

	it('should render skeleton without actions', () => {
		render(<FormSkeleton actions={[]} />);
		expect(screen.queryByTestId('form.skeleton.buttons')).not.toBeInTheDocument();
	});
});
