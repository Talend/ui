import React, { useState } from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import FocusTrap from 'focus-trap-react';

import TooltipTrigger from '../TooltipTrigger';
import Icon from '../Icon';

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
			const overflow = offsets.right - (windowWidth - POPOVER_DELTA);
			offsets.left -= overflow;
			offsets.right = POPOVER_DELTA;
		} else if (offsets.left < POPOVER_DELTA) {
			const overflow = POPOVER_DELTA - offsets.left;
			offsets.left = POPOVER_DELTA;
			offsets.right += overflow;
		}

		if (data.placement === 'top' && offsets.top < POPOVER_DELTA) {
			data.placement = 'bottom';
		} else if (data.placement === 'bottom' && offsets.bottom > windowHeight - POPOVER_DELTA) {
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

function RunType({ runtype }) {
	if (runtype === 'manual' || runtype === 'plan') {
		return (
			<button type="button" className={`${theme.timelineRuntype}`}>
				{runtype[0].toUpperCase()}
			</button>
		);
	}
	return '';
}

function Retries({ retries, measures, start }) {
	if (retries && retries.length > 0) {
		return (
			<ol
				className={`${theme.timelineRetries}`}
				style={{ left: measures.data.getLeftUnit(retries[0].time - start) }}
			>
				{retries.map((retry, index, current) => (
					<li key={index} className={`${theme.timelineRetry}`}>
						<button
							className={`${theme.timelineRetryAction}`}
							style={{
								marginLeft: `calc(${measures.data.getLeftUnit(
									retry.time - current[index && index - 1].time,
								)} - ${index === 0 ? '0.25rem' : '0.5rem'}`,
							}}
							type="button"
						>
							<span className="sr-only">
								{index} retry at {retry.time}{' '}
							</span>
						</button>
					</li>
				))}
			</ol>
		);
	}
	return '';
}
const GridDataBloc = React.forwardRef(
	({ content, item, start, measures, endsOverFlow, ...restProps }, ref) => {
		return (
			<>
				{/* <RunType runtype={item.context.runType} />*/}
				<Retries retries={item.retries} start={start} measures={measures} />
				{/* <Icon name={item.status.management === 'deploy_failure' ? 'talend-warning' : 'talend-check'} />*/}
				<button {...restProps} ref={ref} className={theme.timelineItem} type="button">
					<span className={'sr-only'}>{content}</span>
					{endsOverFlow && (
						<Icon
							className={theme.timelineOverflow}
							name="talend-chevron-left"
							transform="rotate-180"
						/>
					)}
				</button>
			</>
		);
	},
);

export default function GridData({
	id,
	item,
	start,
	measures,
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
				<GridDataBloc
					{...props}
					item={item}
					start={start}
					measures={measures}
					onClick={onBlocClick}
				/>
			</TooltipTrigger>
		);
	}

	if (dataItemPopover) {
		return (
			<Manager>
				<Reference>
					{({ ref }) => (
						<GridDataBloc
							{...props}
							item={item}
							start={start}
							measures={measures}
							ref={ref}
							onClick={onBlocClick}
						/>
					)}
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

	return (
		<GridDataBloc {...props} item={item} start={start} measures={measures} onClick={onBlocClick} />
	);
}
