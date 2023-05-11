import renderer from 'react-test-renderer';
// rewrite tests using react-testing-library
import { screen, render } from '@testing-library/react';
import { Status, STATUS } from './Status.component';

const currentStatus = {
	status: 'successful',
	label: 'Successful',
	icon: 'fa fa-check',
	actions: [
		{
			label: 'cancel',
			icon: 'fa fa-cancel',
			onClick: jest.fn(),
			bsSize: 'small',
		},
		{
			label: 'delete',
			icon: 'fa fa-delete',
			onClick: jest.fn(),
			bsSize: 'small',
		},
	],
};

const inProgressStatus = {
	status: 'inProgress',
	label: 'In Progress',
	actions: [
		{
			label: 'cancel',
			icon: 'fa fa-cancel',
			onClick: jest.fn(),
			bsSize: 'small',
		},
		{
			label: 'delete',
			icon: 'fa fa-delete',
			onClick: jest.fn(),
			bsSize: 'small',
		},
	],
};

const inProgressStatusWithPercent = {
	status: 'inProgress',
	label: 'In Progress',
	progress: '70',
	actions: [
		{
			label: 'cancel',
			icon: 'fa fa-cancel',
			onClick: jest.fn(),
			bsSize: 'small',
		},
		{
			label: 'delete',
			icon: 'fa fa-delete',
			onClick: jest.fn(),
			bsSize: 'small',
		},
	],
};

const skeletonStatusProps = {
	status: STATUS.SKELETON,
};

describe('Status', () => {
	it('should render a label with Icon', () => {
		// when
		const { container } = render(<Status {...currentStatus} />);

		// then
		expect(screen.getByText('Successful')).toBeVisible();
		expect(screen.getByText('cancel')).toBeVisible();
		expect(screen.getByText('delete')).toBeVisible();
		expect(document.querySelector('.tc-status-icon .CoralIcon')).toHaveAttribute(
			'name',
			'fa fa-check',
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render a label', () => {
		// given
		const props = {
			...currentStatus,
			icon: '',
		};

		// when
		render(<Status {...props} />);

		// then
		expect(screen.getByText('Successful')).toBeVisible();
		expect(document.querySelector('.tc-status-icon .CoralIcon')).toBeNull();
	});
	it('should render a label with Icon without actions', () => {
		// when
		render(<Status {...currentStatus} actions={[]} />);

		// then
		expect(screen.getByText('Successful')).toBeVisible();
		expect(screen.queryByText('cancel')).not.toBeInTheDocument();
		expect(screen.queryByText('delete')).not.toBeInTheDocument();
	});

	it('should render a label with a continuous circular progress', () => {
		// when
		render(<Status {...inProgressStatus} />);

		// then
		expect(screen.getByText('In Progress')).toBeVisible();
		expect(screen.getByTestId('circular-progress')).toHaveClass('theme-animate');
	});

	it('should render a label with a fixed circular progress', () => {
		// when
		render(<Status {...inProgressStatusWithPercent} />);

		// then
		expect(screen.getByText('In Progress')).toBeVisible();
		expect(screen.getByTestId('circular-progress')).toHaveClass('theme-fixed');
		expect(screen.getByTestId('circular-progress')).toHaveAttribute('aria-label', 'Loading... 70%');
	});

	it('should render a label with a skeleton', () => {
		// when
		render(<Status {...skeletonStatusProps} />);

		// then
		const skeletons = document.querySelectorAll('.tc-skeleton');
		expect(skeletons).toHaveLength(2);
		expect(skeletons[0]).toHaveClass('tc-skeleton-circle');
		expect(skeletons[1]).toHaveClass('tc-skeleton-text');
	});
});
