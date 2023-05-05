import { render } from '@testing-library/react';
import ViewLayout from './ViewLayout.component';

describe('ViewLayout', () => {
	it('should render a ViewLayout', () => {
		const header = {
			leftElement: <span>left item</span>,
			middleElement: <span>middle item</span>,
			rightElement: <span>right item</span>,
		};

		const bodyElement = <div data-testid="body" />;

		// when
		const { container } = render(<ViewLayout header={header} bodyElement={bodyElement} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
});
