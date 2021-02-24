let reactRouterV5;
let Switch = () => null;
let Route = () => null;
let Router = () => null;
let Link = () => null;

let useParams = () => {};
let useRouteMatch = () => {};

let history = null;
let isV5 = false;

try {
	reactRouterV5 = require('react-router-dom');
	isV5 = true;
	const { createBrowserHistory } = require('history');

	Switch = reactRouterV5.Switch;
	Route = reactRouterV5.Route;
	Link = reactRouterV5.Link;
	useParams = reactRouterV5.useParams;
	useRouteMatch = reactRouterV5.useRouteMatch;

	history = createBrowserHistory();
	Router = (...props) => <reactRouterV5.Router {...props} history={history} />;
} catch (e) {
	if (process.env.NODE_ENV !== 'production') {
		console.warn(
			'@talend/router-bridge: "react-router-dom" is not loaded, this means you are using react-router v3',
		);
	}
}

//TODO: export all V5 content before the overrides
export { history, Switch, Route, Router, Link, useParams, useRouteMatch, isV5 };
