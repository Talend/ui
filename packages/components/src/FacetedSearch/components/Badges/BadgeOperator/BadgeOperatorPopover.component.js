import React from 'react';
import PropTypes from 'prop-types';
import Action from '../../../..//Actions/Action';
import { getTheme } from '../../../..//theme';

import { operatorsPropTypes } from '../../facetedSearch.propTypes';
import RichLayout from '../../../../RichTooltip/RichLayout';

import cssModule from './BadgeOperator.scss';

const theme = getTheme(cssModule);

const BadgeOperatorRow = ({ onClick, id, name, label, iconName }) => {
	const onClickOperatorRow = event => {
		onClick(event, name);
	};
	return (
		<Action
			className={theme('tc-badge-operator-row-button')}
			id={`${id}-operator-row-button-${name}`}
			label={label}
			link
			icon={`talend-${iconName}`}
			onClick={onClickOperatorRow}
			role="button"
		/>
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
		<div className={theme('tc-badge-operator-popover')}>
			<RichLayout.Body id={id}>
				{operators.map(operator => (
					<BadgeOperatorRow
						id={id}
						key={`${id}-${operator.name}`}
						onClick={onClick}
						{...operator}
					/>
				))}
			</RichLayout.Body>
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
