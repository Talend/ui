import PropTypes from 'prop-types';

import { ButtonTertiary } from '@talend/design-system';

import { operatorsPropTypes } from '../../facetedSearch.propTypes';

import styles from './BadgeOperator.module.css';

const BadgeOperatorRow = ({ onClick, id, name, label, iconName }) => {
	const onClickOperatorRow = event => {
		onClick(event, name);
	};
	if (iconName) {
		return (
			<ButtonTertiary
				id={`${id}-operator-row-button-${name}`}
				icon={`talend-${iconName}`}
				onClick={onClickOperatorRow}
			>
				{label}
			</ButtonTertiary>
		);
	}
	return (
		<ButtonTertiary id={`${id}-operator-row-button-${name}`} onClick={onClickOperatorRow}>
			{label}
		</ButtonTertiary>
	);
};

BadgeOperatorRow.propTypes = {
	onClick: PropTypes.func.isRequired,
	id: PropTypes.string,
	name: PropTypes.string,
	label: PropTypes.string,
	iconName: PropTypes.string,
};

const BadgeOperatorPopover = ({ id, operators, onClick }) => {
	return (
		<div className={styles['tc-badge-operator-popover']}>
			{operators.map(operator => (
				<BadgeOperatorRow id={id} key={`${id}-${operator.name}`} onClick={onClick} {...operator} />
			))}
		</div>
	);
};

BadgeOperatorPopover.propTypes = {
	id: PropTypes.string.isRequired,
	operators: operatorsPropTypes.isRequired,
	onClick: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/prefer-default-export
export { BadgeOperatorPopover };
