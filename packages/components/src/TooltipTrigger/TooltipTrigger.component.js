import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import {
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import uuid from 'uuid';
import classNames from 'classnames';
import theme from './TooltipTrigger.scss';

function getTooltipClass() {
	return classNames({ [theme['tooltip-container']]: true, 'tooltip-container': true });
}

/**
 * @param {object} props react props
 * @example
const props = {
	label: 'Help content here',
	tooltipPlacement: 'top',
};
<TooltipTrigger {...props} >
	<Icon name="my-icon" />
</TooltipTrigger>
 */
class TooltipTrigger extends React.Component {

	constructor(props) {
		super(props);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.state = {
			hovered: false,
			id: uuid.v4(),
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			this.state.hovered !== nextState.hovered ||
			this.props.children !== nextProps.children ||
			this.props.label !== nextProps.label
		);
	}

	onMouseOver() {
		if (!this.state.hovered) {
			this.setState({ hovered: true });
		}
	}

	render() {
		if (!this.state.hovered) {
			const child = React.Children.only(this.props.children);
			const childProps = child.props;
			const triggerProps = Object.assign({
				onMouseOver: this.onMouseOver,
				onFocus: this.onMouseOver,
			}, childProps);
			return cloneElement(child, triggerProps);
		}
		const tooltip = (
			<Tooltip
				className={getTooltipClass()}
				id={this.state.id}
			>
				{this.props.label}
			</Tooltip>
		);
		// TODO jmfrancois : render the Tooltip in a provider so use context for that.
		return (
			<OverlayTrigger
				placement={this.props.tooltipPlacement}
				overlay={tooltip}
				delayShow={400}
			>
				{this.props.children}
			</OverlayTrigger>
		);
	}
}

TooltipTrigger.propTypes = {
	children: PropTypes.element,
	label: PropTypes.string,
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

export default TooltipTrigger;
