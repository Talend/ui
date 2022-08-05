/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Internal. It contains the wrapper to make react-router run with the CMF
 * settings
 * @module react-cmf/lib/UIRouter
 * @see react-cmf/lib/route
 * @see react-cmf/lib/settings
 */
import PropTypes from 'prop-types';
import React from 'react';
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
	// Outlet is the children renderer of react-router v6
	let element = <Outlet key="outlet" />;
	if (props.component) {
		element = <Inject {...props}>{childRoutes ? [<Outlet key="outlet" />] : null}</Inject>;
	}
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

	const routeProps = {
		path,
		key: absPath || `${currentpath}index`,
		element,
		children: [indexRoute && <Route {...getRouteProps(indexRoute, currentpath, true)} />]
			.filter(Boolean)
			.concat(
				(childRoutes || []).map((child, index) => (
					<Route key={index} {...getRouteProps(child, path)} />
				)),
			),
	};
	if (isIndex) {
		routeProps.index = true;
	}
	return routeProps;
}

function isDifferent(historyA, historyB) {
	const isDiff =
		historyA.location.pathname !== historyB.location.pathname ||
		historyA.location.search !== historyB.location.search ||
		historyA.location.key !== historyB.location.key ||
		historyA.location.hash !== historyB.location.hash;
	return isDiff;
}

export function getRouter(history, basename) {
	/**
	 * pure arrow function that render the router component.
	 * You should never need to use this, it's an internal component
	 * @param  {object} props   The waited props (history and routes)
	 * @return {object} ReactElement
	 */
	function CMFRouter({ action, location, ...props }) {
		// sync from history to redux
		React.useEffect(() => {
			return history.listen(({ location, action, isFirstRendering = false }) => {
				props.dispatch(onLocationChanged(location, action, isFirstRendering));
			});
		}, []);

		if (props.routes.path && props.routes.component) {
			const routeProps = getRouteProps(props.routes, props.routes.path);
			window.Talend.printRouterCfg = () => printRouterConfig(routeProps);
			if (process.env.NODE_ENV === 'development') {
				window.Talend.printRouterCfg(routeProps);
			}

			return (
				<Router basename={basename} location={location} navigationType={action} navigator={history}>
					<Routes>
						<Route {...routeProps} />
					</Routes>
				</Router>
			);
		}
		if (props.loading) {
			return <Inject component={props.loading} />;
		}

		if (Object.keys(props.routes).length === 0) {
			return (
				<Router basename={basename} location={location} navigationType={action} navigator={history}>
					{props.children}
				</Router>
			);
		}

		return <div className="is-loading">loading</div>;
	}

	CMFRouter.propTypes = {
		dispatch: PropTypes.func,
		routes: PropTypes.object,
		loading: PropTypes.node,
		action: PropTypes.string,
		children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
		location: PropTypes.shape({
			key: PropTypes.string,
		}),
	};
	CMFRouter.contextTypes = {
		registry: PropTypes.object,
	};
	CMFRouter.displayName = 'CMFReactRouterIntegration';

	const mapStateToProps = state => ({
		routes: state.cmf.settings.routes,
		action: state.router.action,
		location: state.router.location,
	});
	const mapDispatchToProps = dispatch => ({ dispatch });
	return connect(mapStateToProps, mapDispatchToProps)(CMFRouter);
}
