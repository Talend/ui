/**
 * This module expose Dispatcher component.
 * @module react-cmf/lib/Dispatcher
 * @see module:react-cmf/lib/action
 */
import PropTypes from 'prop-types';

import React from 'react';
import cmfConnect from './cmfConnect';
import action from './action';
import actionCreator from './actionCreator';
import { RegistryContext } from './RegistryProvider';

/**
 * This component purpose is to decorate any component and map an user event
 * to an action to be dispatched
 * @example
function myfunc(event, props, context) {
}
<Dispatcher onClick={myfunc}>
	<ChildrenElement />
</Dispatcher>
 */
export function Dispatcher(props) {
	const registry = React.useContext(RegistryContext);
	// console.log('@@@ registry', registry);

	/**
	 * on any even just try to find a onTHEEVENT props.
	 * If found execute it with the common stuff
	 * (event, props, context)
	 * @param  {object} event     the react event dispatched event
	 * @param  {string} eventName the name of the event
	 */
	function onEvent(event, eventName) {
		if (props.stopPropagation) {
			event.stopPropagation();
		}
		if (props.preventDefault) {
			event.preventDefault();
		}
		if (props[eventName]) {
			props.dispatchActionCreator(props[eventName], event, props);
		}
	}

	function checkIfActionInfoExist() {
		action.getOnProps(props).forEach(name => {
			if (typeof props[name] === 'string') {
				actionCreator.get({ registry }, props[name]);
			}
		});
	}

	checkIfActionInfoExist();
	const onProps = action.getOnProps(props);
	const childrenWithProps = React.Children.map(props.children, child => {
		const newProps = {};
		onProps.forEach(name => {
			newProps[name] = event => onEvent(event, name);
		});
		return React.cloneElement(child, newProps);
	});
	return React.Children.only(childrenWithProps[0]);
}

Dispatcher.propTypes = {
	children: PropTypes.node.isRequired,
	stopPropagation: PropTypes.bool,
	preventDefault: PropTypes.bool,
	dispatchActionCreator: PropTypes.func,
};
Dispatcher.displayName = 'Dispatcher';
Dispatcher.defaultProps = {
	stopPropagation: false,
	preventDefault: false,
};
const ConnectedDispatcher = cmfConnect({
	withDispatchActionCreator: true,
})(Dispatcher);

/**
 * This component purpose is to decorate any component and map an user event
 * to an action to be dispatched
 * @example
<Dispatcher onClick="actionCreator:identifier" onDrag="actionCreator:anotherid">
	<ChildrenElement />
</Dispatcher>
 */
export default ConnectedDispatcher;
