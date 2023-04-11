import { memo } from 'react';
import PropTypes from 'prop-types';
import { ButtonIconToggle, StackHorizontal } from '@talend/design-system';
import getDefaultT from '../../../translate';
import { DISPLAY_MODE } from '../../ListComposition/constants';

export const displayModesOptions = [DISPLAY_MODE.TABLE, DISPLAY_MODE.LARGE];

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

export const DisplayModeActionIcon = memo(
	({ displayMode, displayModeOption, icon, id, label, onSelect }) => {
		return (
			<ButtonIconToggle
				key={displayMode}
				id={`${id}-${displayMode}`}
				icon={icon}
				isActive={displayMode === displayModeOption}
				size="S"
				onClick={e => {
					onSelect(e, displayMode);
				}}
			>
				{label}
			</ButtonIconToggle>
		);
	},
);
function DisplayModeToggle({ id, displayModes, onChange, mode, t }) {
	const modes = displayModes || displayModesOptions;

	return (
		<StackHorizontal gap="XS" padding={{ x: 'S', y: 0 }}>
			{modes.map(option => (
				<DisplayModeActionIcon
					key={option}
					id={id}
					icon={option === 'table' ? 'talend-table' : 'talend-expanded'}
					label={t('LIST_SELECT_DISPLAY_MODE', {
						defaultValue: 'Set {{displayMode}} as current display mode.',
						displayMode: getLabel(option, t),
					})}
					onSelect={onChange}
					displayMode={option}
					displayModeOption={mode}
				/>
			))}
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

DisplayModeActionIcon.propTypes = {
	...DisplayModeToggle.propTypes,
};

DisplayModeToggle.defaultProps = {
	t: getDefaultT(),
};

export default DisplayModeToggle;
