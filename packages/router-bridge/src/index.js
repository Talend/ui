import { history, Switch, Route, Router, Link, Redirect, useParams, useRouteMatch } from './router';
import { push, replace } from './redux';
import { getSagaRouterModule } from './sagaRouter';

console.log('js');
console.log(getSagaRouterModule);

export {
	// react router v5 only, otherwise those are empty functions or components
	history,
	Link,
	Redirect,
	Route,
	Router,
	Switch,
	useParams,
	useRouteMatch,
	// bridge to connected-react-router or cmf-router
	push,
	replace,
	// Saga router
	getSagaRouterModule,
};
