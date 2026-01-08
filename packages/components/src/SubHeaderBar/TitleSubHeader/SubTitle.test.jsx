import { render, screen } from '@testing-library/react';

import { SubTitle } from './SubTitle.component';

jest.unmock('@talend/design-system');

describe('SubTitle', () => {
	let defaultProps;
	beforeEach(() => {
		defaultProps = {
			subTitle: 'mySubTitle',
		};
	});

	it('should render', () => {
		const { container } = render(<SubTitle {...defaultProps} />);
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render in loading mode', () => {
		render(<SubTitle subTitleLoading />);
		expect(document.querySelector('.tc-skeleton')).toBeInTheDocument();
	});

	it('should render with a custom subtitle', () => {
		render(
			<SubTitle
				{...defaultProps}
				subTitleAs={({ subTitle }) => <div data-testid="Custom">{subTitle}</div>}
			/>,
		);
		expect(screen.getByTestId('Custom')).toBeInTheDocument();
	});

	it('should render pass extra props to the subtitle', () => {
		// given
		const subTitleProps = { 'data-feature': '345' };

		// when
		render(<SubTitle {...defaultProps} subTitleProps={subTitleProps} />);

		// then
		expect(screen.getByText('mySubTitle')).toHaveAttribute('data-feature', '345');
	});
});
