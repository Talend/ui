import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import api from '../api';

/**
 * CMF Route component that implements onEnter/onLeave hooks
 */
class CMFRouteHooks extends React.Component {
	static displayName = 'CMFRouteHooks';
	static propTypes = {
		onEnter: PropTypes.string,
		onLeave: PropTypes.string,
		children: PropTypes.element,
		dispatch: PropTypes.func,
	};
	static contextTypes = {
		registry: PropTypes.object,
		router: PropTypes.object,
	};
	static ownProps = Object.keys(CMFRouteHooks.propTypes);

	constructor(props, context) {
		super(props, context);
		this.onEnter = props.onEnter && api.route.getFunction(props.onEnter, this.context);
		this.onLeave = props.onLeave && api.route.getFunction(props.onLeave, this.context);
	}

	componentWillMount() {
		if (!this.onEnter) {
			return;
		}
		this.onEnter({
			router: omit(this.props, CMFRouteHooks.ownProps),
			dispatch: this.props.dispatch,
		});
	}

	componentWillUnmount() {
		if (!this.onLeave) {
			return;
		}
		this.onLeave({
			router: omit(this.props, CMFRouteHooks.ownProps),
			dispatch: this.props.dispatch,
		});
	}

	render() {
		return React.Children.only(this.props.children);
	}
}
export default connect()(CMFRouteHooks);
