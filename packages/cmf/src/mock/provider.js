import PropTypes from 'prop-types';
import React from 'react';
import mock from './store';

const store = mock.store();
/**
 * This component help you to mock the provider.
 * If you want to write a pure component that use an other which
 * is connected on CMF, you will need to provide a CMF store.
 * @example
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';

import AppMenu from './AppMenu.component';

describe('AppMenu', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Provider registry={customRegistry}>
				<AppMenu />
			</Provider>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
 */
class MockProvider extends React.Component {
	getChildContext() {
		let st = this.props.store;
		if (!st) {
			st = store;
		}
		if (this.props.state) {
			st.state = this.props.state;
			st.getState = () => this.props.state;
		}
		const context = {
			store: st,
			registry: this.props.registry || {},
		};
		return context;
	}

	render() {
		return <div className="mock-provider">{this.props.children}</div>;
	}
}

MockProvider.propTypes = {
	children: PropTypes.node.isRequired,
	store: PropTypes.object,
	state: PropTypes.object,
	registry: PropTypes.object,
};

MockProvider.childContextTypes = {
	store: PropTypes.object,
	registry: PropTypes.object,
};

export default MockProvider;
