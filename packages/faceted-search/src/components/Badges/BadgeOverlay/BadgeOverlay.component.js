import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Popover, Button, Overlay } from '@talend/react-bootstrap';
import { Icon, TooltipTrigger, FormatValue, getTheme } from '@talend/react-components/lib/Icon';
import cssModule from './BadgeOverlay.module.scss';

const theme = getTheme(cssModule);

const getChildren = (children, setOverlayOpened) => {
	if (typeof children === 'function') {
		return children(setOverlayOpened);
	}
	return children;
};

const labelFormatter = (value, showSpecialChars) =>
	showSpecialChars ? (
		<FormatValue key={value} className={theme('tc-badge-format-value')} value={value} />
	) : (
		<span key={value}>{value}</span>
	);

const getLabel = (labels, showSpecialChars) => {
	if (Array.isArray(labels)) {
		return labels.map(label => labelFormatter(label, showSpecialChars));
	}
	return labelFormatter(labels, showSpecialChars);
};

/**
 * The badge overlay can be use in two different ways.
 * An automatic one where you can only set an initial state.
 * Or a manual one where you have to provide an opened and a onChange function.
 * On hide can be used in both, returning the overlay setter,
 * which can be helpful if you are using the automatic way.
 */
const BadgeOverlay = ({
	children,
	className,
	dataFeature,
	iconName,
	id,
	initialOpened = false,
	label,
	onChange,
	onHide,
	opened = false,
	readOnly,
	showSpecialChars = false,
	t,
}) => {
	const [overlayOpened, setOverlayOpened] = useState(initialOpened);
	const [buttonRef, setButtonRef] = useState(null);

	const changeOpened = event => {
		if (onChange) {
			onChange(event, !opened);
		} else {
			setOverlayOpened(!overlayOpened);
		}
	};

	const onHideOverlay = event => {
		if (onHide) {
			onHide(event, setOverlayOpened);
		} else {
			setOverlayOpened(false);
		}
	};
	const currentOpened = opened || overlayOpened;

	const button = (
		<Button
			id={`${id}-action-overlay`}
			bsStyle="link"
			aria-label={label}
			type="button"
			ref={target => setButtonRef(target)}
			onClick={changeOpened}
			disabled={readOnly}
			data-feature={dataFeature}
		>
			{iconName ? (
				<Icon name={`talend-${iconName}`} key="icon" className={theme('tc-badge-link-plus-icon')} />
			) : (
				getLabel(label, showSpecialChars)
			)}
		</Button>
	);

	const buttonToRender = iconName ? (
		<TooltipTrigger label={label} tooltipPlacement="top">
			{button}
		</TooltipTrigger>
	) : (
		button
	);

	return (
		<div className={className}>
			{buttonToRender}

			<Overlay
				id={`${id}-overlay`}
				onHide={onHideOverlay}
				placement="bottom"
				rootClose={true}
				show={currentOpened}
				target={buttonRef}
			>
				<Popover id={`${id}-popover`}>{getChildren(children, setOverlayOpened)}</Popover>
			</Overlay>
		</div>
	);
};

BadgeOverlay.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.func,
	]).isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
	readOnly: PropTypes.bool,
	initialOpened: PropTypes.bool,
	opened: PropTypes.bool,
	className: PropTypes.string,
	iconName: PropTypes.string,
	showSpecialChars: PropTypes.bool,
	dataFeature: PropTypes.string,
	t: PropTypes.func.isRequired,
	onChange: PropTypes.func,
	onHide: PropTypes.func,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeOverlay };
