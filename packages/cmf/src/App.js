/**
 * The CMF App component which should be used to start your react application
 * @module react-cmf/lib/App
 * @example
import React from 'react';
import { render } from 'react-dom';
import { App, store as cmfStore } from '@talend/react-cmf';
import myreducer from './reducer';

const store = cmfstore.initialize(myreducer);
render(
	<App store={store} history={syncHistoryWithStore(browserHistory, store)} />,
	document.getElementById('app'),
);
 */
import PropTypes from 'prop-types';

import React from 'react';
import { Provider } from 'react-redux';
import noop from 'lodash/noop';

import history from './history';
import RegistryProvider from './RegistryProvider';
import UIRouter from './UIRouter';

/**
 * The React component that render your app and provide CMF environment.
 * If you don't need the router, you just have to provide a children.
 * @param  {object} props { store, history }
 * @return {object} ReactElement
 */
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidCatch(error, info) {
		this.setState({
			error,
			info,
		});
		if (this.props.onError) {
			this.props.onError.report(error, info);
		}
	}
	render() {
		const hist = this.props.history || history.get(this.props.store);
		return (
			<Provider store={this.props.store}>
				<RegistryProvider>
					{this.state.error ? (
						<div className="alert alert-danger">
							{this.props.onError.getUserFeedback(this.state.error)}
						</div>
					) : (
						this.props.children || <UIRouter history={hist} loading={this.props.loading} />
					)}
				</RegistryProvider>
			</Provider>
		);
	}
}

App.displayName = 'CMFApp';
App.propTypes = {
	store: PropTypes.object.isRequired,
	children: PropTypes.node,
	history: PropTypes.object,
	loading: PropTypes.string,
	onError: PropTypes.shape({
		getUserFeedback: PropTypes.func,
		report: PropTypes.func,
	}),
};
App.defaultProps = {
	onError: {
		getUserFeedback: () => 'An error occured, please reload the app',
		report: noop,
	},
};
