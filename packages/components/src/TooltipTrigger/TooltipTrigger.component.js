import PropTypes from 'prop-types';
import React, { cloneElement, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import classNames from 'classnames';
import theme from './TooltipTrigger.scss';
import useTooltipVisibility from './TooltipTrigger.hook';

const DEFAULT_OFFSET_X = 300;
const DEFAULT_OFFSET_Y = 50;

/**
 * Adjust tooltip placement depending on its position in the viewport
 * @param tooltipPlacement initial tooltip placement to adjust
 * @param dimensions ref dimensions
 * @param offsets tooltip offsets
 * @returns {string} adjusted tooltip placement regarding ref position
 */
function getAdjustedTooltipPlacement(tooltipPlacement, dimensions, offsets) {
	const { top, right, bottom, left } = dimensions;
	const { tooltipHeight, tooltipWidth } = offsets;
	const { innerWidth, innerHeight } = window;

	let placement = tooltipPlacement;
	if (bottom + tooltipHeight > innerHeight) {
		if (['left', 'right'].includes(tooltipPlacement)) {
			placement = `${tooltipPlacement}-bottom`;
		} else if (tooltipPlacement === 'bottom') {
			placement = 'top';
		}
	} else if (top - tooltipHeight < 0) {
		if (tooltipPlacement === 'top') {
			placement = 'bottom';
		}
	}
	if (left - tooltipWidth / 2 < 0) {
		if (['top', 'bottom'].includes(tooltipPlacement)) {
			placement = `${placement}-right`;
		} else if (tooltipPlacement === 'left') {
			placement = placement.replace('left', 'right');
		}
	} else if (right + tooltipWidth / 2 > innerWidth) {
		if (['top', 'bottom'].includes(tooltipPlacement)) {
			placement = `${placement}-left`;
		} else if (tooltipPlacement === 'right') {
			placement = placement.replace('right', 'left');
		}
	}
	return placement;
}

function getTop(placement, dimensions) {
	if (placement.startsWith('bottom')) {
		return dimensions.bottom;
	}
	if (['left', 'right'].includes(placement)) {
		return (dimensions.top + dimensions.bottom) / 2;
	}
	return undefined;
}

function getLeft(placement, dimensions, tooltipWidth) {
	if (placement === 'top-right' || placement === 'bottom-right') {
		return (dimensions.left + dimensions.right) / 2;
	}
	if (placement === 'top-left' || placement === 'bottom-left') {
		return (dimensions.left + dimensions.right) / 2 - tooltipWidth;
	}
	if (placement.includes('left')) {
		return `calc(${Math.trunc(dimensions.left)}px - ${Math.trunc(tooltipWidth)}px)`;
	}
	if (placement.includes('right')) {
		return Math.trunc(dimensions.right);
	}
	if (['top', 'bottom'].includes(placement)) {
		return (dimensions.left + dimensions.right) / 2;
	}
	return undefined;
}

function getBottom(placement, dimensions) {
	if (placement === 'top' || placement === 'top-right' || placement === 'top-left') {
		return `calc(100vh - ${Math.trunc(dimensions.top)}px)`;
	}
	if (placement === 'right-bottom' || placement === 'left-bottom') {
		return `calc(100vh - ${Math.trunc((dimensions.top + dimensions.bottom) / 2)}px)`;
	}
	return undefined;
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
function TooltipTrigger({
	children,
	label,
	className,
	tooltipDelay,
	tooltipPlacement = 'right',
	tooltipHeight = DEFAULT_OFFSET_Y,
	tooltipWidth = DEFAULT_OFFSET_X,
}) {
	const refContainer = useRef();

	const [visible, show, hide] = useTooltipVisibility(tooltipDelay);

	const [id] = useState(uuid.v4());

	const { props: childrenProps } = children;

	function getTooltipPosition() {
		if (!refContainer || !refContainer.current) {
			return {
				tooltipPlacement,
			};
		}

		let dimensions;
		try {
			// eslint-disable-next-line react/no-find-dom-node
			dimensions = ReactDOM.findDOMNode(refContainer.current).getBoundingClientRect();
		} catch (e) {
			dimensions = {};
		}

		const placement = getAdjustedTooltipPlacement(tooltipPlacement, dimensions, {
			tooltipHeight,
			tooltipWidth,
		});

		return {
			placement,
			style: {
				top: getTop(placement, dimensions),
				left: getLeft(placement, dimensions, tooltipWidth),
				bottom: getBottom(placement, dimensions),
			},
		};
	}

	/**
	 * Activate the tooltip when children are focused
	 */
	const onFocus = (...args) => {
		show();
		if (childrenProps.onFocus) {
			childrenProps.onFocus(...args);
		}
	};

	/**
	 * Desactive the tooltip when children are not focused anymore
	 */
	const onBlur = (...args) => {
		hide();
		if (childrenProps.onBlur) {
			childrenProps.onBlur(...args);
		}
	};

	const onKeyPress = (...args) => {
		hide();
		if (childrenProps.onKeyPress) {
			childrenProps.onKeyPress(...args);
		}
	};

	const onMouseOver = (...args) => {
		show();
		if (childrenProps.onMouseOver) {
			childrenProps.onMouseOver(...args);
		}
	};

	const onMouseOut = (...args) => {
		hide();
		if (childrenProps.onMouseOut) {
			childrenProps.onMouseOut(...args);
		}
	};

	const onClick = (...args) => {
		hide();
		if (childrenProps.onClick) {
			childrenProps.onClick(...args);
		}
	};

	const { placement, style } = getTooltipPosition();

	return (
		<React.Fragment>
			{React.Children.map(children, child =>
				cloneElement(child, {
					'aria-describedby': id,
					onFocus,
					onBlur,
					onKeyPress,
					onMouseOver,
					onMouseOut,
					onClick,
					// Because of React Fragment, we need to maintaining ref through cloneElement
					// @see https://github.com/facebook/react/issues/8873#issuecomment-275423780
					// We need to follow the status of this RFC to change it as soon as possible
					// @see https://github.com/reactjs/rfcs/pull/97
					ref: node => {
						refContainer.current = node;
						const { ref } = child;
						if (typeof ref === 'function') ref(node);
						else if (ref) ref.current = node;
					},
				}),
			)}

			{visible &&
				ReactDOM.createPortal(
					<div
						className={classNames(theme['tc-tooltip-container'], 'tc-tooltip-container', className)}
						style={style}
					>
						<div
							id={id}
							className={classNames(
								theme['tc-tooltip-body'],
								theme[`tc-tooltip-${placement}`],
								'tc-tooltip-body',
								`tc-tooltip-${placement}`,
							)}
						>
							{label}
						</div>
					</div>,
					document.body,
				)}
		</React.Fragment>
	);
}

TooltipTrigger.displayName = 'TooltipTrigger';

TooltipTrigger.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	tooltipPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	tooltipHeight: PropTypes.number,
	tooltipWidth: PropTypes.number,
	tooltipDelay: PropTypes.number,
	children: PropTypes.element,
	className: PropTypes.string,
};

export default TooltipTrigger;
