import { Provider } from 'react-redux';

import { render, screen } from '@testing-library/react';

import App from '../src/App';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary.component';
import RegistryProvider from '../src/RegistryProvider';

vi.mock('react-redux', () => ({
	esModule: true,
	Provider: vi.fn(props => <div className="ReactReduxProvider">{props.children}</div>),
	connect: vi.importActual('react-redux').connect,
}));

vi.mock('../src/RegistryProvider', () =>
	vi.fn(props => <div className="RegistryProvider">{props.children}</div>),
);
vi.mock('../src/components/ErrorBoundary/ErrorBoundary.component', () =>
	vi.fn(props => <div className="ErrorBoundary">{props.children}</div>),
);

describe('CMF App', () => {
	it('App should init stuff', () => {
		const store = {
			subscribe() {},
			dispatch() {},
			getState() {
				return {};
			},
		};
		render(
			<App store={store}>
				<div className="children">I am a child</div>
			</App>,
		);
		expect(screen.getByText('I am a child')).toBeInTheDocument();
		expect(Provider).toHaveBeenCalledWith(expect.objectContaining({ store }), {});
		expect(RegistryProvider).toHaveBeenCalled();
		expect(ErrorBoundary).toHaveBeenCalled();
	});
});
