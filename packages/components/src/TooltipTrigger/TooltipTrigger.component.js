import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import uuid from 'uuid';
import classNames from 'classnames';
import keycode from 'keycode';
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

	state = {
		hovered: false,
		id: uuid.v4(),
	};

	shouldComponentUpdate(nextProps, nextState) {
		return (
			this.state !== nextState ||
			this.props.children !== nextProps.children ||
			this.props.label !== nextProps.label
		);
	}

	/**
	 * Activate the tooltip when the children is hovered
	 */
	onMouseOver = (...args) => {
		this.setState({ hovered: true });
		if (this.props.children.props.onMouseOver) {
			this.props.children.props.onMouseOver(...args);
		}
	};

	/**
	 * Activate the tooltip when the children is focused
	 */
	onFocus = (...args) => {
		this.setState({ hovered: true });
		if (this.props.children.props.onFocus) {
			this.props.children.props.onFocus(...args);
		}
	};

	/**
	 * Hide the tooltip between mouseDown & mouseUp
	 */
	onMouseDown = (...args) => {
		this.overlay.handleDelayedHide();
		if (this.props.children.props.onMouseDown) {
			this.props.children.props.onMouseDown(...args);
		}
	};

	/**
	 * Show the tooltip after mouse up
	 */
	onMouseUp = (...args) => {
		this.overlay.handleDelayedShow();
		if (this.props.children.props.onMouseUp) {
			this.props.children.props.onMouseUp(...args);
		}
	};

	/**
	 * when activate an element, hide the tooltip between keydown & keyup
	 * @param {object} event the keyDown event
	 */
	onKeyDown = event => {
		if (event.which === keycode.codes.enter || event.which === keycode.codes.space) {
			this.overlay.handleDelayedHide();
		}
	};

	/**
	 * when activate an element, hide the tooltip between keydown & keyup
	 * @param {object} event the keyup event
	 */
	onKeyUp = event => {
		if (event.which === keycode.codes.enter || event.which === keycode.codes.space) {
			this.overlay.handleDelayedShow();
		}
	};

	render() {
		const child = React.Children.only(this.props.children);

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
			<OverlayTrigger
				ref={ref => {
					this.overlay = ref;
				}}
				placement={this.props.tooltipPlacement}
				overlay={tooltip}
				delayShow={400}
				animation={false}
			>
				{cloneElement(child, {
					onMouseDown: this.onMouseDown,
					onMouseUp: this.onMouseUp,
					onKeyDown: this.onKeyDown,
					onKeyUp: this.onKeyUp,
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
