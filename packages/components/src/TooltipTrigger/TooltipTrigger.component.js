import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import classNames from 'classnames';
import omit from 'lodash/omit';
import theme from './TooltipTrigger.scss';

const DEFAULT_TIMEOUT = 600;
const DEFAULT_OFFSET_X = 300;
const DEFAULT_OFFSET_Y = 50;

function TooltipPortal(props) {
	const [el] = useState(document.createElement('div'));
	useEffect(() => {
		document.body.appendChild(el);
		return () => {
			document.body.removeChild(el);
		};
	}, []);
	return ReactDOM.createPortal(props.children, el);
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

		this.timeout = null;

		this.state = {
			visible: false,
			id: uuid.v4(),
		};

		this.showTooltip = this.showTooltip.bind(this);
		this.hideTooltip = this.hideTooltip.bind(this);
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	getAdjustedTooltipPlacement(tooltipPlacement, dimensions) {
		const { tooltipHeight = DEFAULT_OFFSET_Y, tooltipWidth = DEFAULT_OFFSET_X } = this.props;
		let placement = tooltipPlacement;
		if (dimensions.bottom + tooltipHeight > window.innerHeight) {
			if (['left', 'right'].includes(tooltipPlacement)) {
				placement = `${tooltipPlacement}-bottom`;
			} else if (tooltipPlacement === 'bottom') {
				placement = 'top';
			}
		} else if (dimensions.top - tooltipHeight < 0) {
			if (tooltipPlacement === 'top') {
				placement = 'bottom';
			}
		}
		if (dimensions.left - tooltipWidth / 2 < 0) {
			if (['top', 'bottom'].includes(tooltipPlacement)) {
				placement = `${placement}-right`;
			} else if (tooltipPlacement === 'left') {
				placement = placement.replace('left', 'right');
			}
		} else if (dimensions.right + tooltipWidth / 2 > window.innerWidth) {
			if (['top', 'bottom'].includes(tooltipPlacement)) {
				placement = `${placement}-left`;
			} else if (tooltipPlacement === 'right') {
				placement = placement.replace('right', 'left');
			}
		}
		return placement;
	}

	getTooltipPosition() {
		const { tooltipPlacement = 'right', tooltipWidth = DEFAULT_OFFSET_X } = this.props;

		if (!this.el) {
			return {
				tooltipPlacement,
			};
		}

		const dimensions = this.el.getBoundingClientRect();

		const placement = this.getAdjustedTooltipPlacement(tooltipPlacement, dimensions);

		return {
			placement,
			style: {
				top: (() => {
					if (placement.startsWith('bottom')) {
						return dimensions.bottom;
					}
					if (['left', 'right'].includes(placement)) {
						return (dimensions.top + dimensions.bottom) / 2;
					}
					return undefined;
				})(),
				left: (() => {
					if (placement === 'top-right' || placement === 'bottom-right') {
						return (dimensions.left + dimensions.right) / 2;
					}
					if (placement === 'top-left' || placement === 'bottom-left') {
						return (dimensions.left + dimensions.right) / 2 - tooltipWidth;
					}
					if (placement.includes('left')) {
						return `calc(${Math.trunc(dimensions.left)}px - ${tooltipWidth}px)`;
					}
					if (placement.includes('right')) {
						return Math.trunc(dimensions.right);
					}
					if (['top', 'bottom'].includes(placement)) {
						return (dimensions.left + dimensions.right) / 2;
					}
					return undefined;
				})(),
				bottom: (() => {
					if (placement === 'top' || placement === 'top-right' || placement === 'top-left') {
						return `calc(100vh - ${Math.trunc(dimensions.top)}px)`;
					}
					if (
						placement === 'bottom' ||
						placement === 'right-bottom' ||
						placement === 'left-bottom'
					) {
						return `calc(100vh - ${Math.trunc(dimensions.bottom)}px)`;
					}
					return undefined;
				})(),
			},
		};
	}

	showTooltip() {
		const { tooltipDelay = DEFAULT_TIMEOUT } = this.props;
		this.timeout = setTimeout(() => {
			this.setState({ visible: true });
		}, tooltipDelay);
	}

	hideTooltip() {
		clearTimeout(this.timeout);
		this.setState({ visible: false });
	}

	render() {
		const { placement, style } = this.getTooltipPosition();

		return (
			<span
				{...omit(this.props, Object.keys(TooltipTrigger.propTypes))}
				className={theme['tc-tooltip']}
				onFocus={this.showTooltip}
				onBlur={this.hideTooltip}
				onKeyPress={this.hideTooltip}
				onMouseOver={this.showTooltip}
				onMouseOut={this.hideTooltip}
				onClick={this.hideTooltip}
				aria-describedby={this.state.id}
				ref={el => (this.el = el)}
			>
				{this.props.children}

				{this.state.visible && (
					<TooltipPortal>
						<div className={theme['tc-tooltip-container']} style={style}>
							<div
								id={this.state.id}
								className={classNames(theme['tc-tooltip-body'], theme[`tc-tooltip-${placement}`])}
							>
								{this.props.label}
							</div>
						</div>
					</TooltipPortal>
				)}
			</span>
		);
	}
}

TooltipTrigger.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	tooltipPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	tooltipHeight: PropTypes.number,
	tooltipWidth: PropTypes.number,
	tooltipDelay: PropTypes.number,
	children: PropTypes.element,
};

export default TooltipTrigger;
