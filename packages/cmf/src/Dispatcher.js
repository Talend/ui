/**
 *
 * @module react-cmf/lib/Dispatcher
 *
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import api from './api';

/**
 * check if on[event] string relate to a declared action handler
 * @param {object} props component props
 * @param {object} context app context, containing redux store ref
 *
 * @throws
 */
export function checkIfActionInfoExist(props, context) {
	api.action.getOnProps(props).forEach((name) => {
		if (typeof props[name] === 'string') {
			api.action.getActionInfo(context, props[name]);
		}
	});
}

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

	/**
	 * @param  {object} props only one child under children
	 */
	constructor(props) {
		super(props);
		this.onEvent = this.onEvent.bind(this);
	}

	/**
	 * Check if the actions are described in settings when mount
	 */
	componentDidMount() {
		checkIfActionInfoExist(this.props, this.context);
	}

	/**
	 * Check if the actions are described in settings when receiving new props
	 */
	componentWillReceiveProps(nextProps) {
		checkIfActionInfoExist(nextProps, this.context);
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
		if (this.props[eventName]) {
			this.props[eventName](event, this.props, this.context);
		}
	}

	/**
	 * @return {object} ReactElement
	 */
	render() {
		const onProps = api.action.getOnProps(this.props);
		const childrenWithProps = React.Children.map(
			this.props.children,
			(child) => {
				const props = {};
				onProps.forEach((name) => {
					props[name] = event => this.onEvent(event, name);
				});
				return React.cloneElement(child, props);
			}
		);
		const child = React.Children.only(childrenWithProps[0]);
		return (child);
	}
}

Dispatcher.defaultProps = {
	stopPropagation: false,
};

Dispatcher.propTypes = {
	children: PropTypes.node.isRequired,
	stopPropagation: PropTypes.bool,
};

Dispatcher.contextTypes = {
	store: PropTypes.object.isRequired,
	registry: PropTypes.object.isRequired,
	router: PropTypes.object.isRequired,
};


const ConnectedDispatcher = connect(
	undefined,
	api.action.mapDispatchToProps
)(Dispatcher);

/**
 * This component purpose is to decorate any component and map an user event
 * to an action to be dispatched
 * @example
<Dispatcher onClick='actionCreator:identifier' onDrag='actionCreator:anotherid'>
	<ChildrenElement />
</Dispatcher>
 */
export default ConnectedDispatcher;
