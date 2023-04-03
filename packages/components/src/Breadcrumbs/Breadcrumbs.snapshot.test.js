import { screen, render } from '@testing-library/react';
import { BreadcrumbsComponent } from './Breadcrumbs.component';

describe('Breadcrumbs', () => {
	it('should do nothing if items property is empty', () => {
		render(<BreadcrumbsComponent items={undefined} />);
		expect(screen.getByLabelText('breadcrumb')).toBeInTheDocument();
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	it('should render all items without a dropdown menu if default max items is not reached', () => {
		const items = [
			{ text: 'Text A', title: 'Go to Page Text A' },
			{ text: 'Text B', title: 'Go to Page Text B' },
			{ text: 'Text C', title: 'Go to Page Text C' },
			{ text: 'Text D', title: 'Go to Page Text D' },
		];
		render(<BreadcrumbsComponent items={items} />);
		expect(screen.getByLabelText('breadcrumb')).toBeInTheDocument();
		expect(screen.getByText('Text A')).toBeInTheDocument();
		expect(screen.getByText('Text B')).toBeInTheDocument();
		expect(screen.getByText('Text C')).toBeInTheDocument();
		expect(screen.getByText('Text D')).toBeInTheDocument();
	});

	it('should render items with a dropdown menu if default max items is reached', () => {
		const items = [
			{ text: 'Text A', title: 'Go to Page Text A' },
			{ text: 'Text B', title: 'Go to Page Text B' },
			{ text: 'Text C', title: 'Go to Page Text C' },
			{ text: 'Text D', title: 'Go to Page Text D' },
			{ text: 'Text E', title: 'Go to Page Text E' },
		];

		render(<BreadcrumbsComponent items={items} />);
		expect(screen.getByLabelText('breadcrumb')).toBeInTheDocument();
		expect(screen.getByText('Text A')).toBeInTheDocument();
	});
});
