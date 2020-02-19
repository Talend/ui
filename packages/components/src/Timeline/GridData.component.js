import React, { useRef, useState, useEffect } from 'react';
// import { Popper } from 'react-popper';
import { Manager, Reference, Popper } from 'react-popper';
import FocusTrap from 'focus-trap-react';

import TooltipTrigger from '../TooltipTrigger';

import theme from './GridData.scss';

const POPOVER_DELTA = 10;

const talendModifier = {
	enabled: true,
	order: 0,
	fn: function fn(data) {
		const windowWidth = window.innerWidth || document.documentElement.clientWidth;
		const windowHeight = window.innerHeight || document.documentElement.clientHeight;

		const offsets = data.offsets.popper;
		if (offsets.right > windowWidth - POPOVER_DELTA) {
			console.log('overflow right');
			const overflow = offsets.right - (windowWidth - POPOVER_DELTA);
			offsets.left -= overflow;
			offsets.right = POPOVER_DELTA;
		} else if (offsets.left < POPOVER_DELTA) {
			console.log('overflow left');
			const overflow = POPOVER_DELTA - offsets.left;
			offsets.left = POPOVER_DELTA;
			offsets.right += overflow;
		}

		if (data.placement === 'top' && offsets.top < POPOVER_DELTA) {
			console.log('overflow top');
			data.placement = 'bottom';
		} else if (data.placement === 'bottom' && offsets.bottom > windowHeight - POPOVER_DELTA) {
			console.log('overflow bottom');
			data.placement = 'top';
		}
		return data;
	},
};

const GridDataDetails = React.forwardRef(
	({ id, children, onClose, style, arrowProps, placement }, ref) => {
		return (
			<div ref={ref} style={style} data-placement={placement} id={id} className={theme.popper}>
				<FocusTrap
					focusTrapOptions={{
						onDeactivate: onClose,
						clickOutsideDeactivates: true,
						initialFocus: '.popover-wrapper',
					}}
				>
					<div
						tabIndex="-1"
						className={`${theme['popover-wrapper']} popover-wrapper`}
						aria-describedby={`#${id}-instructions`}
					>
						<div id={`#${id}-instructions`} className="sr-only">
							Timeline element. To close it, press ESC
						</div>
						{children}
					</div>
				</FocusTrap>
				<div ref={arrowProps.ref} style={arrowProps.style} className={theme['popper-arrow']} />
			</div>
		);
	},
);

const GridDataBloc = React.forwardRef(({ className, ...restProps }, ref) => {
	return <button {...restProps} ref={ref} className={`${theme.data} ${className}`} />;
});

export default function GridData({
	id,
	item,
	dataItemTooltip,
	dataItemPopover,
	onClick,
	...props
}) {
	const [visible, setVisibility] = useState(false);

	const onBlocClick = () => {
		setVisibility(!visible);
		onClick && onClick(item);
	};

	if (dataItemTooltip) {
		return (
			<TooltipTrigger label={dataItemTooltip(item)} tooltipPlacement="bottom">
				<GridDataBloc {...props} onClick={onBlocClick} />
			</TooltipTrigger>
		);
	}

	if (dataItemPopover) {
		return (
			<Manager>
				<Reference>
					{({ ref }) => <GridDataBloc {...props} ref={ref} onClick={onBlocClick} />}
				</Reference>
				{visible && (
					<Popper
						placement="bottom"
						positionFixed
						modifiers={{
							hide: {
								enabled: false,
							},
							preventOverflow: {
								enabled: false,
							},
							talend: talendModifier,
						}}
					>
						{({ ref, style, placement, arrowProps }) => (
							<GridDataDetails
								id={id}
								ref={ref}
								onClose={() => setVisibility(false)}
								arrowProps={arrowProps}
								style={style}
								placement={placement}
							>
								{dataItemPopover(item)}
							</GridDataDetails>
						)}
					</Popper>
				)}
			</Manager>
		);
	}

	return <GridDataBloc {...props} onClick={onBlocClick} />;
}
