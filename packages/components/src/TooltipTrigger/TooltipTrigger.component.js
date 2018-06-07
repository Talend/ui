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

	onMouseOver(...args) {
		if (!this.state.hovered) {
			this.setState({ hovered: true });
		}

		if (this.childProps.onMouseOver) {
			this.childProps.onMouseOver(...args);
		}
	}

	onFocus(...args) {
		if (!this.state.hovered) {
			this.setState({ hovered: true });
		}

		if (this.childProps.onFocus) {
			this.childProps.onFocus(...args);
		}
	}

	render() {
		if (!this.state.hovered) {
			const child = React.Children.only(this.props.children);
			this.childProps = child.props;

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
				{this.props.children}
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
