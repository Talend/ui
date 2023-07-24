import { render, screen } from '@testing-library/react';
import HeaderTitle from './HeaderTitle.component';

describe('HeaderTitle', () => {
	it('should render HeaderTitle', () => {
		const { container } = render(<HeaderTitle title="Pipelines" />);

		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByRole('heading')).toHaveTextContent('Pipelines');
	});
});
