import React from 'react';
import PropTypes from 'prop-types';
import { ButtonIconToggle, StackHorizontal } from '@talend/design-system';
import getDefaultT from '../../../translate';

const options = ['table', 'large'];
function getLabel(selected, t) {
	switch (selected) {
		case 'table':
			return t('LIST_SELECT_DISPLAY_MODE_TABLE', { defaultValue: 'Table' });
		case 'large':
			return t('LIST_SELECT_DISPLAY_MODE_LARGE', { defaultValue: 'Expanded' });
		default:
			return selected;
	}
}

function DisplayModeToggle({ id, displayModes, onChange, mode, t }) {
	const modes = displayModes || options;

	function getActionIcon(option) {
		return (
			<ButtonIconToggle
				key={option}
				id={`${id}-${option}`}
				icon={option === 'table' ? 'talend-table' : 'talend-expanded'}
				isActive={mode === option}
				size="S"
				onClick={e => {
					onChange(e, option);
				}}
			>
				{t('LIST_SELECT_DISPLAY_MODE', {
					defaultValue: 'Set {{displayMode}} as current display mode.',
					displayMode: getLabel(option, t),
				})}
			</ButtonIconToggle>
		);
	}

	return (
		<StackHorizontal gap="XS" padding={{ x: 'S', y: 0 }}>
			{modes.map(getActionIcon)}
		</StackHorizontal>
	);
}

DisplayModeToggle.propTypes = {
	id: PropTypes.string,
	mode: PropTypes.string,
	displayModes: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func.isRequired,
	t: PropTypes.func,
};

DisplayModeToggle.defaultProps = {
	t: getDefaultT(),
};

export default DisplayModeToggle;
