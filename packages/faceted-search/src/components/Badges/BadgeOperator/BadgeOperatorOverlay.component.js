import classnames from 'classnames';
import PropTypes from 'prop-types';

import Badge from '@talend/react-components/lib/Badge';

import { operatorsPropTypes } from '../../facetedSearch.propTypes';
import { BadgeOverlay } from '../BadgeOverlay';
import { BadgeOperatorPopover } from './BadgeOperatorPopover.component';

import styles from './BadgeOperator.module.scss';

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
			className={classnames(styles['tc-badge-operator'], {
				[styles['tc-badge-operator-small']]: Badge.SIZES.small === size,
				[styles['tc-badge-operator-large']]: Badge.SIZES.large === size,
			})}
		>
			<BadgeOverlay
				className={styles['tc-badge-operator-button']}
				iconName={operatorIconName}
				id={`${id}-operator`}
				label={operatorLabel}
				onChange={onChangeOverlay}
				onHide={onHide}
				opened={opened}
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
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeOperatorOverlay };
