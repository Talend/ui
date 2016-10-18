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
    it('should render its name', () => {
        const wrapper = renderer.create(
            <Provider>
                <AppMenu />
            </Provider>
        ).toJSON();
        expect(wrapper).toMatchSnapshot();
    });
});
 */
class MockProvider extends React.Component {
	constructor(props) {
		super(props);
	}
	getChildContext() {
		let st = this.props.store;
		if (!st) {
			st = store;
		}
		if (this.props.state) {
			st.state = this.props.state;
		}
		return { store: st };
	}
	render() {
		return (
			<div className="mock-provider">
				{this.props.children}
			</div>
		);
	}
}

MockProvider.propTypes = {
	store: React.PropTypes.object,
	state: React.PropTypes.object,
};

MockProvider.childContextTypes = {
	store: React.PropTypes.object,
};

export default MockProvider;
