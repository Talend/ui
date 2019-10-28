import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-bootstrap/lib/Overlay';
import Popover from 'react-bootstrap/lib/Popover';
import Button from 'react-bootstrap/lib/Button';
import Icon from '@talend/react-components/lib/Icon';

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
	iconName,
	initialOpened = false,
	id,
	label,
	onChange,
	onHide,
	opened = false,
	placement = 'bottom',
	rootClose = true,
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

	return (
		<div className={className}>
			<Button
				id={`${id}-action-overlay`}
				bsStyle="link"
				aria-label={label}
				type="button"
				ref={target => setButtonRef(target)}
				onClick={changeOpened}
			>
				{iconName ? <Icon name={`talend-${iconName}`} key="icon" /> : getLabel(label)}
			</Button>
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
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeOverlay };
