import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import getDefaultT from '../../../translate';
import BadgeDelete from './BadgeDelete.component';

describe('BadgeDelete', () => {
	it('should render', () => {
		// given
		const onClick = jest.fn();
		const props = {
			id: 'my-id',
			onClick,
			t: getDefaultT(),
		};
		// when
		render(<BadgeDelete {...props} />);
		// then
		expect(screen.getByLabelText('Delete')).toBeInTheDocument();
	});
	it('should trigger on click function', async () => {
		const user = userEvent.setup();
		// given
		const onClick = jest.fn();
		const props = {
			id: 'my-id',
			onClick,
			t: getDefaultT(),
		};
		// when
		render(<BadgeDelete {...props} />);
		// then
		await user.click(screen.getByLabelText('Delete'));
		expect(onClick).toHaveBeenCalledTimes(1);
	});
	it('should pass the props label to the button', () => {
		// given
		const onClick = jest.fn();
		const props = {
			label: 'My custom label',
			id: 'my-id',
			onClick,
			t: getDefaultT(),
		};
		// when
		render(<BadgeDelete {...props} />);
		// then
		expect(screen.getByLabelText('My custom label')).toBeInTheDocument();
	});
	it('should pass the props dataFeature to the button', () => {
		// given
		const onClick = jest.fn();
		const props = {
			id: 'my-id',
			dataFeature: 'feature-delete',
			onClick,
			t: getDefaultT(),
		};
		// when
		render(<BadgeDelete {...props} />);
		// then
		expect(screen.getByLabelText('Delete')).toBeInTheDocument();
		expect(screen.getByLabelText('Delete')).toHaveAttribute('data-feature', 'feature-delete');
	});
});
