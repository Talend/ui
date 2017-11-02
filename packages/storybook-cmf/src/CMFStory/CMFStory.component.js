import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { store, RegistryProvider } from 'react-cmf';
import mock from 'react-cmf/lib/mock';

/**
 * @param {object} props react props
 * @example
<CMFStory name="Hello world"></CMFStory>
 */
class CMFStory extends React.Component {
	constructor(props) {
		super(props);
		let state;
		if (props) {
			state = props.state;
		}
		if (!state) {
			state = mock.state();
		}
		this.store = store.initialize(
			props.reducer,
			state,
			props.enhancer,
			props.middleware
		);
	}

	getChildContext() {
		return { router: {} };
	}

	render() {
		return (
			<Provider store={this.store}>
				<RegistryProvider>
					{this.props.children}
				</RegistryProvider>
			</Provider>
		);
	}
}

CMFStory.propTypes = {
	state: PropTypes.object,
	children: PropTypes.node,
	reducer: PropTypes.func,
	enhancer: PropTypes.func,
	middleware: PropTypes.arrayOf(PropTypes.func),
};
CMFStory.contextTypes = {
	registry: PropTypes.object,
};
CMFStory.childContextTypes = {
	router: PropTypes.object,
};

export default CMFStory;
