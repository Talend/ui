import React from 'react';
import PropTypes from 'prop-types';
import getDefaultT from '../../../translate';
import IconsToggle from '../IconsToggle/IconsToggle.component';

function getLabel(selected, t) {
	switch (selected) {
		case 'table':
			return t('LIST_SELECT_DISPLAY_MODE_TABLE', { defaultValue: 'Table' });
		case 'large':
			return t('LIST_SELECT_DISPLAY_MODE_LARGE', { defaultValue: 'Expanded' });
		default:
			return t('LIST_SELECT_DISPLAY_MODE_TABLE', { defaultValue: 'Table' });
	}
}
function getAriaLabel(selected, t) {
	return t('LIST_SELECT_DISPLAY_MODE', {
		defaultValue: 'Set {{displayMode}} as current display mode.',
		displayMode: selected,
	});
}

function DisplayModeToggle({ id, onChange, mode, t }) {
	const options = [
		{
			name: 'table',
			icon: 'talend-table',
			label: getLabel('table', t),
			ariaLabel: getAriaLabel('table', t),
		},
		{
			name: 'large',
			icon: 'talend-expanded',
			label: getLabel('large', t),
			ariaLabel: getAriaLabel('large', t),
		},
	];
	return (<IconsToggle
		id={`${id}-display-mode-toggle`}
		className="display-mode-toggle"
		selected={mode || 'table'}
		options={options}
		onChange={onChange}
	/>);
}

DisplayModeToggle.propTypes = {
	id: PropTypes.string,
	onChange: PropTypes.func,
	mode: PropTypes.oneOf(['table', 'large']),
	t: PropTypes.func.isRequired,
};

DisplayModeToggle.defaultProps = {
	t: getDefaultT(),
};

export default DisplayModeToggle;
