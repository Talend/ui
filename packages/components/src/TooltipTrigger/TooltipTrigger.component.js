import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
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
	static displayName = 'TooltipTrigger';

	constructor(props) {
		super(props);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);

		this.state = {
			hovered: false,
			clicked: false,
			id: uuid.v4(),
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			this.state.hovered !== nextState.hovered ||
			this.state.clicked !== nextState.clicked ||
			this.props.children !== nextProps.children ||
			this.props.label !== nextProps.label
		);
	}

	onMouseOver(...args) {
		if (!this.state.hovered) {
			this.setState({ hovered: true });
		}

		if (this.props.children.props.onMouseOver) {
			this.props.children.props.onMouseOver(...args);
		}
	}

	onFocus(...args) {
		if (!this.state.hovered) {
			this.setState({ hovered: true });
		}

		if (this.props.children.props.onFocus) {
			this.props.children.props.onFocus(...args);
		}
	}

	onMouseDown(...args) {
		this.setState({ clicked: true });
		if (this.props.children.props.onMouseDown) {
			this.props.children.props.onMouseDown(...args);
		}
		if (this.props.children.props.onClick) {
			this.props.children.props.onClick(...args);
		}
	}

	onMouseUp(...args) {
		this.setState({ clicked: false });
		if (this.props.children.props.onMouseUp) {
			this.props.children.props.onMouseUp(...args);
		}
	}

	render() {
		const child = React.Children.only(this.props.children);

		if (this.state.clicked) {
			return cloneElement(child, {
				onMouseUp: this.onMouseUp,
			});
		}

		if (!this.state.hovered) {
			return cloneElement(child, {
				onMouseOver: this.onMouseOver,
				onFocus: this.onFocus,
			});
		}

		const tooltip = (
			<Tooltip className={getTooltipClass()} id={this.state.id}>
				{this.props.label}
			</Tooltip>
		);
		// TODO jmfrancois : render the Tooltip in a provider so use context for that.
		return (
			<OverlayTrigger placement={this.props.tooltipPlacement} overlay={tooltip} delayShow={400}>
				{cloneElement(child, {
					onMouseDown: this.onMouseDown,
				})}
			</OverlayTrigger>
		);
	}
}

TooltipTrigger.propTypes = {
	children: PropTypes.element,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	tooltipPlacement: OverlayTrigger.propTypes.placement,
};

export default TooltipTrigger;
