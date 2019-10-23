import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Overlay from 'react-bootstrap/lib/Overlay';
import Popover from 'react-bootstrap/lib/Popover';
import Button from 'react-bootstrap/lib/Button';
import Action from '@talend/react-components/lib/Actions/Action';
import Icon from '@talend/react-components/lib/Icon';

const getChildren = (children, setOverlayOpened) => {
	if (typeof children === 'function') {
		return children(setOverlayOpened);
	}
	return children;
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
	const myLabel = () => {
		if (Array.isArray(label)) {
			return label.map(l => <span>{l}</span>);
		}
		return <span>{label}</span>;
	};
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
				{iconName ? <Icon name={`talend-${iconName}`} key="icon" /> : myLabel()}
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
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onHide: PropTypes.func,
	opened: PropTypes.bool,
	placement: PropTypes.string,
	rootClose: PropTypes.bool,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeOverlay };
