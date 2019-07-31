/**
 * Internal module, you should not use it directly
 * @module react-cmf/lib/App
 */
import PropTypes from 'prop-types';

import React from 'react';
import { Provider } from 'react-redux';

import RegistryProvider from './RegistryProvider';
import UIRouter from './UIRouter';
import onError from './onError';
import { ErrorFeedBack } from './components';

/**
 * The React component that render your app and provide CMF environment.
 * @param  {object} props { store }
 * @return {object} ReactElement
 */
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		onError.subscribe(errors => this.setState({ error: errors[0] }));
	}

	// eslint-disable-next-line class-methods-use-this
	componentDidCatch(error) {
		this.setState({ error: { error } });
	}

	render() {
		return (
			<Provider store={this.props.store}>
				<RegistryProvider>
					{this.state.error ? (
						<ErrorFeedBack />
					) : (
						this.props.children
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
};
App.defaultProps = {
	ErrorFeedBack: onError.ErrorFeedBack,
};
