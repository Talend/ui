import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import App from '../src/App';
import RegistryProvider from '../src/RegistryProvider';
import CMFRouter from '../src/route/CMFRouter';

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
		const wrapper = shallow(<App store={store} history={history} />);
		expect(wrapper.contains(
			<Provider store={store}>
				<RegistryProvider>
					<CMFRouter history={history} />
				</RegistryProvider>
			</Provider>)
		).toEqual(true);
	});
});
