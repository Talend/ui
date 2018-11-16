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

import history from './history';
import RegistryProvider from './RegistryProvider';
import UIRouter from './UIRouter';
import onError from './onError';

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

	componentDidMount() {
		onError.subscribe(error => this.setState({ error }));
	}

	// eslint-disable-next-line class-methods-use-this
	componentDidCatch(error) {
		onError.report(error);
	}

	render() {
		const hist = this.props.history || history.get(this.props.store);
		const ErrorFeedback = this.props.ErrorFeedBack;
		return (
			<Provider store={this.props.store}>
				<RegistryProvider>
					{this.state.error ? (
						<ErrorFeedback error={this.state.error} />
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
	ErrorFeedBack: PropTypes.func,
};
App.defaultProps = {
	ErrorFeedBack: onError.ErrorFeedBack,
};
