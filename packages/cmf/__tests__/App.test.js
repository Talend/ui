import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import App from '../src/App';
import RegistryProvider from '../src/RegistryProvider';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary.component';

describe('CMF App', () => {
	it('App should init stuff', () => {
		const store = {
			subscribe() {},
			dispatch() {},
			getState() {
				return {};
			},
		};
		const history = {};
		const wrapper = shallow(
			<App store={store} history={history}>
				<div className="children" />
			</App>,
		);
		expect(
			wrapper.contains(
				<Provider store={store}>
					<RegistryProvider>
						<ErrorBoundary fullPage>
							<div className="children" />
						</ErrorBoundary>
					</RegistryProvider>
				</Provider>,
			),
		).toEqual(true);
	});
});
