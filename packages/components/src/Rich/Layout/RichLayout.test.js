import { render, screen } from '@testing-library/react';
import RichLayout from './RichLayout.component';

const Content = <div data-testid="Content">Content</div>;
const Header = <div data-testid="Header">Header</div>;
const Footer = <div data-testid="Footer">Footer</div>;

describe('RichLayout', () => {
	it('should render RichLayout with header, content and footer', () => {
		const { container } = render(
			<RichLayout id="richlayout" Header={Header} Content={Content} Footer={Footer} />,
		);
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByTestId('Header')).toHaveTextContent('Header');
		expect(screen.getByTestId('Content')).toHaveTextContent('Content');
		expect(screen.getByTestId('Footer')).toHaveTextContent('Footer');
	});

	it('should render with a text in the body', () => {
		render(<RichLayout id="richlayout" text="loreum" />);
		expect(screen.getByText('loreum')).toBeInTheDocument();
		expect(screen.getByText('loreum').parentElement).toHaveAttribute(
			'id',
			'richlayout-body-content',
		);
	});
});
