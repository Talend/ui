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
export class Dispatcher extends React.Component {
	static displayName = 'Dispatcher';

	static propTypes = {
		children: PropTypes.node.isRequired,
		stopPropagation: PropTypes.bool,
		preventDefault: PropTypes.bool,
		dispatchActionCreator: PropTypes.func,
	};

	static contextTypes = {
		registry: PropTypes.object.isRequired,
	};

	/**
	 * @param  {object} props only one child under children
	 */
	constructor(props) {
		super(props);
		this.onEvent = this.onEvent.bind(this);
	}

	/**
	 * on any even just try to find a onTHEEVENT props.
	 * If found execute it with the common stuff
	 * (event, props, context)
	 * @param  {object} event     the react event dispatched event
	 * @param  {string} eventName the name of the event
	 */
	onEvent(event, eventName) {
		if (this.props.stopPropagation) {
			event.stopPropagation();
		}
		if (this.props.preventDefault) {
			event.preventDefault();
		}
		if (this.props[eventName]) {
			this.props.dispatchActionCreator(this.props[eventName], event, this.props);
		}
	}

	checkIfActionInfoExist() {
		action.getOnProps(this.props).forEach(name => {
			if (typeof this.props[name] === 'string') {
				actionCreator.get(this.context, this.props[name]);
			}
		});
	}

	/**
	 * @return {object} ReactElement
	 */
	render() {
		this.checkIfActionInfoExist();
		const onProps = action.getOnProps(this.props);
		const childrenWithProps = React.Children.map(this.props.children, child => {
			const props = {};
			onProps.forEach(name => {
				props[name] = event => this.onEvent(event, name);
			});
			return React.cloneElement(child, props);
		});
		return React.Children.only(childrenWithProps[0]);
	}
}

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
