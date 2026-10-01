import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect, ReactReduxContext } from 'react-redux';
import { Router } from 'react-router';
import isEqualWith from 'lodash.isequalwith';
import { onLocationChanged } from './actions';
import createSelectors from './selectors';

const createConnectedRouter = structure => {
	const { getLocation } = createSelectors(structure);
	/*
	 * ConnectedRouter listens to a history object passed from props.
	 * When history is changed, it dispatches action to redux store.
	 * Then, store will pass props to component to render.
	 * This creates uni-directional flow from history->store->router->components.
	 */

	class ConnectedRouter extends PureComponent {
		constructor(props) {
			super(props);

			const { store, history, onLocationChanged, stateCompareFunction } = props;

			this.inTimeTravelling = false;
			this.mounted = false;
			// react-router v7 `Router` does not listen to a history, it renders the given location
			this.state = { location: history.location, action: history.action };

			// Subscribe to store changes to check if we are in time travelling
			this.unsubscribe = store.subscribe(() => {
				// Allow time travel debugging compatibility to be turned off
				// as the detection for this (below) is error prone in apps where the
				// store may be unmounted, a navigation occurs, and then the store is re-mounted
				// during the app's lifetime. Detection could be much improved if Redux DevTools
				// simply set a global variable like `REDUX_DEVTOOLS_IS_TIME_TRAVELLING=true`.
				const isTimeTravelDebuggingAllowed = !props.noTimeTravelDebugging;

				// Extract store's location
				const {
					pathname: pathnameInStore,
					search: searchInStore,
					hash: hashInStore,
					state: stateInStore,
				} = getLocation(store.getState());
				// Extract history's location
				const {
					pathname: pathnameInHistory,
					search: searchInHistory,
					hash: hashInHistory,
					state: stateInHistory,
				} = history.location;

				// If we do time travelling, the location in store is changed but location in history is not changed
				if (
					isTimeTravelDebuggingAllowed &&
					props.history.action === 'PUSH' &&
					(pathnameInHistory !== pathnameInStore ||
						searchInHistory !== searchInStore ||
						hashInHistory !== hashInStore ||
						// react-router locations have a `null` state where history v5 had `undefined`
						!isEqualWith(
							stateInStore === null ? undefined : stateInStore,
							stateInHistory === null ? undefined : stateInHistory,
							stateCompareFunction,
						))
				) {
					this.inTimeTravelling = true;
					// Update history's location to match store's location
					history.push(
						{
							pathname: pathnameInStore,
							search: searchInStore,
							hash: hashInStore,
						},
						stateInStore,
					);
				}
			});

			const handleLocationChange = (location, action, isFirstRendering = false) => {
				// Dispatch onLocationChanged except when we're in time travelling
				if (!this.inTimeTravelling) {
					onLocationChanged(location, action, isFirstRendering);
				} else {
					this.inTimeTravelling = false;
				}
				if (this.mounted) {
					this.setState({ location, action });
				}
			};

			// Listen to history changes
			// history v5 and react-router v7 call the listener with `{ location, action }`
			this.unlisten = history.listen(({ location, action }) =>
				handleLocationChange(location, action),
			);

			if (!props.noInitialPop) {
				// Dispatch a location change action for the initial location.
				// This makes it backward-compatible with react-router-redux.
				// But, we add `isFirstRendering` to `true` to prevent double-rendering.
				handleLocationChange(history.location, history.action, true);
			}
		}

		componentDidMount() {
			this.mounted = true;
			// the location may have changed between the constructor and the mount
			const { history } = this.props;
			if (history.location !== this.state.location) {
				this.setState({ location: history.location, action: history.action });
			}
		}

		componentWillUnmount() {
			this.mounted = false;
			this.unlisten();
			this.unsubscribe();
		}

		render() {
			const { omitRouter, history, children } = this.props;

			// The `omitRouter` option is available for applications that must
			// have a Router instance higher in the component tree but still desire
			// to use connected-react-router for its Redux integration.

			if (omitRouter) {
				return <>{children}</>;
			}

			return (
				<Router
					location={this.state.location}
					navigationType={this.state.action}
					navigator={history}
				>
					{children}
				</Router>
			);
		}
	}

	ConnectedRouter.propTypes = {
		store: PropTypes.shape({
			getState: PropTypes.func.isRequired,
			subscribe: PropTypes.func.isRequired,
		}).isRequired,
		history: PropTypes.shape({
			action: PropTypes.string.isRequired,
			listen: PropTypes.func.isRequired,
			location: PropTypes.object.isRequired,
			push: PropTypes.func.isRequired,
		}).isRequired,
		basename: PropTypes.string,
		children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
		onLocationChanged: PropTypes.func.isRequired,
		noInitialPop: PropTypes.bool,
		noTimeTravelDebugging: PropTypes.bool,
		stateCompareFunction: PropTypes.func,
		omitRouter: PropTypes.bool,
	};

	const mapDispatchToProps = dispatch => ({
		onLocationChanged: (location, action, isFirstRendering) =>
			dispatch(onLocationChanged(location, action, isFirstRendering)),
	});

	const ConnectedRouterWithContext = props => {
		const Context = props.context || ReactReduxContext;

		if (Context == null) {
			throw 'Please upgrade to react-redux v6';
		}

		return (
			<Context.Consumer>
				{({ store }) => <ConnectedRouter store={store} {...props} />}
			</Context.Consumer>
		);
	};

	ConnectedRouterWithContext.propTypes = {
		context: PropTypes.object,
	};

	return connect(null, mapDispatchToProps)(ConnectedRouterWithContext);
};

export default createConnectedRouter;
