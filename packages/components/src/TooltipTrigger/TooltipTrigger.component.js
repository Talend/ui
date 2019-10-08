import PropTypes from 'prop-types';
import React, { cloneElement, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import classNames from 'classnames';
import omit from 'lodash/omit';
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
function TooltipTrigger(props) {
	const refContainer = useRef(null);

	const [visible, show, hide] = useTooltipVisibility(props.tooltipDelay);

	const [id] = useState(uuid.v4());

	function getTooltipPosition() {
		const {
			tooltipPlacement = 'right',
			tooltipHeight = DEFAULT_OFFSET_Y,
			tooltipWidth = DEFAULT_OFFSET_X,
		} = props;

		if (!refContainer.current) {
			return {
				tooltipPlacement,
			};
		}

		const dimensions = refContainer.current.getBoundingClientRect();

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

	const { placement, style } = getTooltipPosition();

	return (
		// we use div here to wrap tooltip trigger
		// it should not be reachable
		// It is just a way to handle click and keyboard events
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			{...omit(props, Object.keys(TooltipTrigger.propTypes))}
			className={classNames(props.className, theme['tc-tooltip'])}
			onFocus={show}
			onBlur={hide}
			onKeyPress={hide}
			onMouseOver={show}
			onMouseOut={hide}
			onClick={hide}
			aria-describedby={id}
			ref={refContainer}
		>
			{React.Children.map(props.children, child =>
				cloneElement(child, {
					'aria-describedby': id,
				}),
			)}

			{visible &&
				ReactDOM.createPortal(
					<div className={theme['tc-tooltip-container']} style={style}>
						<div
							id={id}
							className={classNames(theme['tc-tooltip-body'], theme[`tc-tooltip-${placement}`])}
						>
							{props.label}
						</div>
					</div>,
					document.body,
				)}
		</div>
	);
}

TooltipTrigger.displayName = 'TooltipTrigger';

TooltipTrigger.propTypes = {
	className: PropTypes.string,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	tooltipPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	tooltipHeight: PropTypes.number,
	tooltipWidth: PropTypes.number,
	tooltipDelay: PropTypes.number,
	children: PropTypes.element,
};

export default TooltipTrigger;
