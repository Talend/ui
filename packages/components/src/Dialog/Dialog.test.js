/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from './Dialog.component';

jest.mock('@talend/react-bootstrap', () => {
	const Modal = props => (
		<div data-testid="Modal" data-size={props.bsSize} {...props}>
			{props.children}
		</div>
	);
	Modal.Header = props => <div data-testid="Header">{props.children}</div>;
	Modal.Title = props => <div data-testid="Title">{props.children}</div>;
	Modal.Body = props => <div data-testid="Body">{props.children}</div>;
	Modal.Footer = props => <div data-testid="Footer">{props.children}</div>;
	return { Modal };
});
jest.mock('../Actions/Action', () => props => (
	<button data-testid="Action" {...props}>
		{props.label}
	</button>
));
jest.mock('../ActionBar', () => () => <div data-testid="ActionBar" />);

const children = <div>BODY</div>;

describe('Dialog', () => {
	it('should render', () => {
		const { container } = render(<Dialog show>{children}</Dialog>);
		expect(container).toMatchSnapshot();
	});
	it('should render header', () => {
		render(
			<Dialog header="Hello world" show>
				{children}
			</Dialog>,
		);
		expect(screen.getByTestId('Header')).toBeInTheDocument();
	});
	it('should render subtitle', () => {
		render(
			<Dialog show header="Hello world" subtitle="Lorem ipsum">
				{children}
			</Dialog>,
		);
		expect(screen.getByText('Lorem ipsum')).toBeVisible();
	});
	it('should render error instead of subtitle', () => {
		render(
			<Dialog header="Hello world" subtitle="Lorem ipsum" error="Vestibulum" show>
				{children}
			</Dialog>,
		);
		expect(screen.getByText('Vestibulum')).toBeVisible();
		expect(screen.queryByText('Lorem ipsum')).not.toBeInTheDocument();
	});
	it('should render action', () => {
		const action = {
			label: 'OK',
			onClick: jest.fn(),
		};
		render(
			<Dialog show header="Hello world" action={action}>
				{children}
			</Dialog>,
		);
		userEvent.click(screen.getByText('OK'));
		expect(action.onClick).toHaveBeenCalled();
	});
	it('should render small', () => {
		render(
			<Dialog show header="Hello world" size="small">
				{children}
			</Dialog>,
		);
		expect(screen.getByTestId('Modal')).toHaveAttribute('data-size', 'small');
	});
	it('should render large', () => {
		render(
			<Dialog show size="large">
				{children}
			</Dialog>,
		);
		expect(screen.getByTestId('Modal').dataset.size).toBe('large');
	});
	it('should spread props', () => {
		render(<Dialog id="my-id" className="foo" />);
		expect(screen.getByTestId('Modal')).toHaveAttribute('id', 'my-id');
		expect(screen.getByTestId('Modal')).toHaveClass('foo');
	});
	it('render modal without modal-flex class if flex prop is not set', () => {
		let { rerender } = render(<Dialog show>{children}</Dialog>);
		expect(screen.getByTestId('Modal')).not.toHaveClass('modal-flex');
		rerender(
			<Dialog show flex>
				{children}
			</Dialog>,
		);
		expect(screen.getByTestId('Modal')).toHaveClass('modal-flex');
	});
});
