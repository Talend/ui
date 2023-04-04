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
	reactRouter = require('react-router-dom');
	isLegacy = false;
	const { createBrowserHistory } = require('history');

	Switch = reactRouter.Routes;
	Route = reactRouter.Route;
	Link = reactRouter.Link;
	Redirect = reactRouter.Redirect;
	useParams = reactRouter.useParams;
	useRouteMatch = reactRouter.useRouteMatch;

	history = createBrowserHistory({ basename: window.basename || '/' });
	// eslint-disable-next-line
	Router = props => <reactRouter.Router {...props} history={history} location={history.location} />;
} catch (e) {
	if (process.env.NODE_ENV !== 'production') {
		console.warn(
			'@talend/router-bridge: "react-router-dom" is not loaded, this means you are using react-router v3',
		);
	}
}

export { history, Switch, Route, Router, Link, Redirect, useParams, useRouteMatch, isLegacy };
