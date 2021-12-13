/**
 * Internal. It contains the wrapper to make react-router run with the CMF
 * settings
 * @module react-cmf/lib/UIRouter
 * @see react-cmf/lib/route
 * @see react-cmf/lib/settings
 */
import PropTypes from 'prop-types';
import React from 'react';
// BrowserRouter from react-router-dom do not support custom history
import { Router } from 'react-router';
import { Route, Routes, Outlet } from 'react-router-dom';
import { onLocationChanged } from 'connected-react-router';
import { connect } from 'react-redux';
import { Inject } from '@talend/react-cmf';

let printRouterConfig;
if (process.env.NODE_ENV === 'development') {
	const toJSX = item => {
		if (!item) {
			return '';
		}
		const { children, element, ...props } = item.props;
		return `<${item.type.name} ${Object.keys(props)
			.filter(key => props[key])
			.map(key => `${key}='${props[key]}'`)
			.join(' ')} ${element ? `element={${toJSX(element)}}` : ''}>${(children || [])
			.map(toJSX)
			.join('')}</${item.type.name}>`;
	};
	printRouterConfig = props => {
		return `<Route ${props.path ? `path='${props.path}'` : ''} key='${props.key}' element={${toJSX(
			props.element,
		)}}>
	${(props.children || []).map(toJSX).join(`
`)}
</Route>`;
	};
}

function getRouteProps({ path, indexRoute, childRoutes, ...props }, currentpath, isIndex) {
	const injectProps = { ...props };
	let absPath;
	// some route has no path (indexRoute for example)
	if (path) {
		if (path.startsWith('/')) {
			absPath = path;
		} else if (path === '*') {
			absPath = path;
		} else {
			absPath = `${currentpath === '/' ? '' : currentpath}/${path}`;
		}
	}
	if (childRoutes) {
		// Outlet is the children renderer of react-router v6
		injectProps.children = [<Outlet />];
	}

	const routeProps = {
		path,
		key: absPath || `${currentpath}index`,
		element: <Inject {...injectProps} />,
		children: [indexRoute && <Route {...getRouteProps(indexRoute, currentpath, true)} />]
			.filter(Boolean)
			.concat((childRoutes || []).map(child => <Route {...getRouteProps(child, path)} />)),
	};
	if (isIndex) {
		routeProps.index = true;
	}
	return routeProps;
}

export function getRouter(history, basename) {
	/**
	 * pure arrow function that render the router component.
	 * You should never need to use this, it's an internal component
	 * @param  {object} props   The waited props (history and routes)
	 * @return {object} ReactElement
	 */
	function CMFRouter(props) {
		const [state, setState] = React.useState({
			action: history.action,
			location: history.location,
		});

		const [unlisten] = React.useState(
			history.listen((...args) => {
				setState(...args);
				props.dispatch(onLocationChanged(...args));
			}),
		);
		React.useLayoutEffect(() => unlisten, [unlisten]);

		if (props.routes.path && props.routes.component) {
			const routeProps = getRouteProps(props.routes, props.routes.path);
			if (process.env.NODE_ENV === 'development') {
				window.talendPrintRouterCfg = () => printRouterConfig(routeProps);
				window.talendPrintRouterCfg(routeProps);
			}
			// eslint-disable-next-line no-console
			return (
				<Router
					basename={basename}
					location={state.location}
					navigationType={state.action}
					navigator={history}
				>
					<Routes>
						<Route {...routeProps} />
					</Routes>
				</Router>
			);
		}
		if (props.loading) {
			return <Inject component={props.loading} />;
		}
		return <div className="is-loading">loading</div>;
	}

	CMFRouter.propTypes = {
		dispatch: PropTypes.func,
		routes: PropTypes.object,
		loading: PropTypes.node,
	};
	CMFRouter.contextTypes = {
		registry: PropTypes.object,
	};
	CMFRouter.displayName = 'CMFReactRouterIntegration';

	const mapStateToProps = state => ({ routes: state.cmf.settings.routes });
	const mapDispatchToProps = dispatch => ({ dispatch });
	return connect(mapStateToProps, mapDispatchToProps)(CMFRouter);
}
