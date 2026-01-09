import { useState } from 'react';

import PropTypes from 'prop-types';

import { ButtonTertiary, Popover } from '@talend/design-system';
import { FormatValue, Icon } from '@talend/react-components';

import styles from './BadgeOverlay.module.css';

const getChildren = (children, setOverlayOpened) => {
	if (typeof children === 'function') {
		return children(setOverlayOpened);
	}
	return children;
};

const labelFormatter = (value, showSpecialChars) =>
	showSpecialChars ? (
		<FormatValue key={value} className={styles['tc-badge-format-value']} value={value} />
	) : (
		<span key={value}>{value}</span>
	);

const getLabel = (labels, showSpecialChars) => {
	const formatedLabels = Array.isArray(labels)
		? labels.map(label => labelFormatter(label, showSpecialChars))
		: labelFormatter(labels, showSpecialChars);

	return formatedLabels;
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
}) => {
	const [overlayOpened, setOverlayOpened] = useState(initialOpened);

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
	const buttonLabel = iconName ? (
		<Icon name={`talend-${iconName}`} key="icon" />
	) : (
		getLabel(label, showSpecialChars)
	);

	const button = (
		<ButtonTertiary
			id={`${id}-action-overlay`}
			aria-label={label}
			onClick={changeOpened}
			disabled={readOnly}
			data-feature={dataFeature}
			size="S"
			title={label}
		>
			{buttonLabel}
		</ButtonTertiary>
	);

	return (
		<div className={className}>
			<Popover
				id={`${id}-popover`}
				disclosure={button}
				isFixed={true}
				placement="bottom"
				open={currentOpened}
				onOpenChange={open => {
					if (!open) {
						onHideOverlay(open);
					}
				}}
			>
				{currentOpened && getChildren(children, setOverlayOpened)}
			</Popover>
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
	onChange: PropTypes.func,
	onHide: PropTypes.func,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeOverlay };
