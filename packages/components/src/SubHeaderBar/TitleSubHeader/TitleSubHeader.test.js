import { render, screen } from '@testing-library/react';

import TitleSubHeader from './TitleSubHeader.component';

jest.unmock('@talend/design-system');

describe('TitleSubHeader', () => {
	let defaultProps;

	beforeEach(() => {
		defaultProps = {
			title: 'myTitle',
			onSubmit: jest.fn(),
		};
	});

	it('should render', () => {
		const { container } = render(<TitleSubHeader {...defaultProps} />);
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByText('myTitle')).toBeInTheDocument();
		expect(screen.getByRole('heading')).toHaveTextContent('myTitle');
		expect(screen.queryAllByRole('button').length).toBe(0);
	});

	it('should render with an icon', () => {
		render(<TitleSubHeader {...defaultProps} iconId="myIconId" />);
		expect(document.querySelector('svg[name="myIconId"]')).toBeInTheDocument();
	});

	it('should render InlineEditing', () => {
		render(<TitleSubHeader {...defaultProps} editable />);
		const btn = screen.getByTestId('inlineediting.button.edit');
		expect(btn).toBeVisible();
		expect(screen.getByTestId('inlineediting')).toHaveAttribute(
			'data-feature',
			'subheaderbar.rename',
		);
	});

	it('should render skeleton', () => {
		render(<TitleSubHeader {...defaultProps} loading />);
		expect(document.querySelector('.tc-skeleton')).toBeInTheDocument();
		expect(screen.queryByText('myTitle')).not.toBeInTheDocument();
	});

	it('should render inProgress', () => {
		const { container } = render(<TitleSubHeader {...defaultProps} inProgress />);
		expect(container.firstChild).toHaveClass('tc-subheader-details-blink');
	});

	it('should render pass extra props to the title', () => {
		// given
		const titleProps = { 'data-test': '123' };

		// when
		render(<TitleSubHeader {...defaultProps} titleProps={titleProps} />);

		// then
		expect(screen.getByRole('heading')).toHaveAttribute('data-test', '123');
	});
});
