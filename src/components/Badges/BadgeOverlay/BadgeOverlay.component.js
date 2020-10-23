import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-bootstrap/lib/Overlay';
import Popover from 'react-bootstrap/lib/Popover';
import Button from 'react-bootstrap/lib/Button';
import Icon from '@talend/react-components/lib/Icon';
import TooltipTrigger from '@talend/react-components/lib/TooltipTrigger';
import { getTheme } from '@talend/react-components/lib/theme';
import cssModule from './BadgeOverlay.scss';

const theme = getTheme(cssModule);

const getChildren = (children, setOverlayOpened) => {
	if (typeof children === 'function') {
		return children(setOverlayOpened);
	}
	return children;
};

const getLabel = labels => {
	if (Array.isArray(labels)) {
		return labels.map(label => <span key={label}>{label}</span>);
	}
	return <span>{labels}</span>;
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
	hasAddButton = false,
	iconName,
	id,
	initialOpened = false,
	label,
	onChange,
	onHide,
	opened = false,
	placement = 'bottom',
	readOnly,
	rootClose = true,
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
			className={theme({ 'tc-badge-link-plus': hasAddButton })}
		>
			{iconName && (
				<Icon name={`talend-${iconName}`} key="icon" className={theme('tc-badge-link-plus-icon')} />
			)}
			{hasAddButton && <span>{t('BASIC_SEARCH_ADD_FILTER', { defaultValue: 'Add filter' })}</span>}
			{!iconName && getLabel(label)}
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
				placement={placement}
				rootClose={rootClose}
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
	t: PropTypes.func.isRequired,
	className: PropTypes.string,
	iconName: PropTypes.string,
	initialOpened: PropTypes.bool,
	id: PropTypes.string.isRequired,
	label: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
	onChange: PropTypes.func,
	onHide: PropTypes.func,
	opened: PropTypes.bool,
	placement: PropTypes.string,
	rootClose: PropTypes.bool,
	hasAddButton: PropTypes.bool,
	readOnly: PropTypes.bool,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeOverlay };
