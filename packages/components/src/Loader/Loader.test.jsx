import { render, screen } from '@testing-library/react';
import Loader from './Loader.component';
import { CIRCULAR_PROGRESS_SIZE as SIZE } from '../constants';

describe('Loader', () => {
	it('should render', () => {
		const { container } = render(<Loader />);
		expect(screen.getByLabelText('Loading...')).toHaveClass('theme-default');
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render a small loader', () => {
		render(<Loader size={SIZE.small} />);
		expect(screen.getByLabelText('Loading...')).toHaveClass('theme-small');
	});
	it('should render a default loader', () => {
		render(<Loader size={SIZE.default} />);
		expect(screen.getByLabelText('Loading...')).toHaveClass('theme-default');
	});
	it('should render a large loader', () => {
		render(<Loader size={SIZE.large} />);
		expect(screen.getByLabelText('Loading...')).toHaveClass('theme-large');
	});
});
