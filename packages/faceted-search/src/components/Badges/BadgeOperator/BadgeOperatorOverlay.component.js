import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@talend/react-components/lib/Badge';
import { getTheme } from '@talend/react-components/lib/theme';

import { BadgeOverlay } from '../BadgeOverlay';
import { BadgeOperatorPopover } from './BadgeOperatorPopover.component';

import { operatorsPropTypes } from '../../facetedSearch.propTypes';

import cssModule from './BadgeOperator.scss';

const theme = getTheme(cssModule);

const BadgeOperatorOverlay = ({
	id,
	onClick,
	onChangeOverlay,
	onHideOverlay,
	opened,
	operatorIconName,
	operatorLabel,
	operators,
	readOnly,
	size,
	t,
}) => {
	/**
	 * Trigger the callback passed in props
	 * @param {function} setOverlayOpened callback used to open / close the overlay
	 */
	const onClickRow = setOverlayOpened => (event, name) => {
		if (onClick) {
			onClick(event, name, setOverlayOpened);
		}
	};

	const onHide = event => {
		if (onHideOverlay) {
			onHideOverlay(event);
		}
	};

	return (
		<div
			className={theme('tc-badge-operator', {
				'tc-badge-operator-small': Badge.SIZES.small === size,
				'tc-badge-operator-large': Badge.SIZES.large === size,
			})}
		>
			<BadgeOverlay
				className={theme('tc-badge-operator-button')}
				hideLabel
				iconName={operatorIconName}
				id={`${id}-operator`}
				label={operatorLabel}
				onChange={onChangeOverlay}
				onHide={onHide}
				opened={opened}
				t={t}
				readOnly={readOnly}
			>
				{setOverlayOpened => (
					<BadgeOperatorPopover
						id={`${id}-operator`}
						operators={operators}
						onClick={onClickRow(setOverlayOpened)}
					/>
				)}
			</BadgeOverlay>
		</div>
	);
};

BadgeOperatorOverlay.propTypes = {
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	onChangeOverlay: PropTypes.func,
	onHideOverlay: PropTypes.func,
	opened: PropTypes.bool,
	operatorIconName: PropTypes.string,
	operatorLabel: PropTypes.string,
	operators: operatorsPropTypes.isRequired,
	readOnly: PropTypes.bool,
	size: PropTypes.oneOf(Object.values(Badge.SIZES)),
	t: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeOperatorOverlay };
