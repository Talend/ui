import PropTypes from 'prop-types';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { RegistryProvider } from '../RegistryProvider';
import mock from './store';

class ErrorBoundary extends Component {
	static propTypes = {
		children: PropTypes.any,
		onError: PropTypes.func,
	};

	componentDidCatch(error, errorInfo) {
		if (this.props.onError) {
			this.props.onError(error, errorInfo);
		}
		this.setState({ hasError: true });
	}

	render() {
		if (this.state && this.state.hasError) {
			return <div className="error">Error</div>;
		}
		return this.props.children;
	}
}

const store = mock.store();
/**
 * This component help you to mock the provider.
 * If you want to write a pure component that use an other which
 * is connected on CMF, you will need to provide a CMF store.
 * @example
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-cmf/lib/mock';

import AppMenu from './AppMenu.component';

describe('AppMenu', () => {
	it('should render', () => {
		render(
			<Provider>
				<AppMenu />
			</Provider>
		);
		expect(screen.getByRole('button')).toBeDefined();
	});
});
 */
function MockProvider(props) {
	let st = props.store;
	if (!st) {
		st = store;
	}
	if (props.state) {
		st.state = props.state;
		st.getState = () => props.state;
	}
	const context = {
		store: st,
		registry: props.registry || {},
	};
	return (
		<div className="mock-provider">
			<Provider store={context.store}>
				<RegistryProvider value={context.registry}>{props.children}</RegistryProvider>
			</Provider>
		</div>
	);
}

MockProvider.propTypes = {
	children: PropTypes.node.isRequired,
	store: PropTypes.object,
	state: PropTypes.object,
	registry: PropTypes.object,
};

MockProvider.getEnzymeOption = context => ({
	wrappingComponent: MockProvider,
	wrappingComponentProps: context,
});
MockProvider.ErrorBoundary = ErrorBoundary;

export default MockProvider;
