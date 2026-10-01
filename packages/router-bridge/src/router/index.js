/* eslint-disable import/no-extraneous-dependencies, global-require */
let reactRouter;
let Switch = () => null;
let Route = () => null;
let Router = () => null;
let Link = () => null;
let Redirect = () => null;

let useParams = () => {};
let useRouteMatch = () => {};

let history = null;
let isLegacy = true;

try {
	if (process.env.TALEND_ROUTER_BRIDGE_FORCE_LEGACY === 'true') {
		throw new Error('Forced legacy mode');
	}

	reactRouter = require('react-router');
	// react-router v3 (legacy) also lives in the "react-router" package
	if (!reactRouter.Routes || !reactRouter.UNSAFE_createBrowserHistory) {
		throw new Error('react-router v7 is not installed');
	}
	const React = require('react');
	isLegacy = false;

	Switch = reactRouter.Routes;
	Route = reactRouter.Route;
	Link = reactRouter.Link;
	useParams = reactRouter.useParams;

	// no DOM (SSR, node tests): fall back to an in memory history
	history =
		typeof document === 'undefined'
			? reactRouter.UNSAFE_createMemoryHistory({ v5Compat: true })
			: reactRouter.UNSAFE_createBrowserHistory({ v5Compat: true });
	Router = ({ children, ...props }) => {
		const [state, setState] = React.useState({
			action: history.action,
			location: history.location,
		});
		React.useLayoutEffect(() => history.listen(setState), []);
		return React.createElement(
			reactRouter.Router,
			{ ...props, location: state.location, navigationType: state.action, navigator: history },
			children,
		);
	};

	// react-router v5 API that does not exist anymore
	Redirect = props => React.createElement(reactRouter.Navigate, { replace: true, ...props });
	useRouteMatch = pattern => {
		const location = reactRouter.useLocation();
		const params = reactRouter.useParams();
		if (!pattern) {
			return { path: '/', url: location.pathname, isExact: true, params };
		}
		const { path, exact = false } = typeof pattern === 'string' ? { path: pattern } : pattern;
		const match = reactRouter.matchPath({ path, end: exact }, location.pathname);
		if (!match) {
			return null;
		}
		return {
			path,
			url: match.pathname,
			isExact: location.pathname === match.pathname,
			params: match.params,
		};
	};
} catch (e) {
	isLegacy = true;
	history = null;
	if (process.env.NODE_ENV !== 'production') {
		console.warn(
			'@talend/router-bridge: "react-router" v7 is not loaded, this means you are using react-router v3',
		);
	}
}

export { history, Switch, Route, Router, Link, Redirect, useParams, useRouteMatch, isLegacy };
