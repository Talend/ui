import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { ActionIconToggle } from '../../../Actions';
import { useListContext } from '../context';
import cssModule from './DisplayModeToggle.scss';
import { getTheme } from '../../../theme';

const theme = getTheme(cssModule);

function getLabel(option, t) {
	switch (option) {
		case 'table':
			return t('LIST_SELECT_DISPLAY_MODE_TABLE', { defaultValue: 'Table' });
		case 'large':
			return t('LIST_SELECT_DISPLAY_MODE_LARGE', { defaultValue: 'Expanded' });
		default:
			return option;
	}
}

export const DisplayModeIcon = React.memo(
	({ displayMode, displayModeOption, icon, id, label, onSelect, isLast }) => {
		const { t } = useListContext();
		return (
			<ActionIconToggle
				className={theme({
					'tc-display-mode-toggle-last-button': isLast,
					'tc-display-mode-toggle-button': !isLast,
				})}
				key={displayModeOption}
				id={`${id}-${displayModeOption}`}
				icon={icon}
				label={
					label ||
					t('LIST_SELECT_DISPLAY_MODE', {
						defaultValue: 'Set {{displayMode}} as current display mode.',
						displayMode: getLabel(displayModeOption, t),
					})
				}
				active={displayMode === displayModeOption}
				disabled={displayMode === displayModeOption}
				onClick={e => {
					onSelect(e, displayModeOption);
				}}
			/>
		);
	},
);

DisplayModeIcon.propTypes = {
	displayMode: PropTypes.string,
	displayModeOption: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
};

function ListDisplayMode({
	children,
	displayModesOptions,
	id,
	initialDisplayMode,
	onChange,
	selectedDisplayMode,
}) {
	const { displayMode, setDisplayMode } = useListContext();
	useEffect(() => {
		if (!onChange) {
			setDisplayMode(initialDisplayMode);
		}
	}, []);

	function onSelect(event, value) {
		if (onChange) {
			onChange(event, value);
		} else {
			setDisplayMode(value);
		}
	}

	if (children) {
		return children;
	}
	return (
		<div className={theme('tc-display-mode-toggle')}>
			{displayModesOptions.map((displayModeOption, index) => (
				<DisplayModeIcon
					isLast={displayModesOptions.length - 1 === index}
					displayMode={selectedDisplayMode || displayMode}
					displayModeOption={displayModeOption}
					icon={displayModeOption === 'table' ? 'talend-table' : 'talend-expanded'}
					id={id}
					key={displayModeOption}
					onSelect={onSelect}
				/>
			))}
		</div>
	);
}

ListDisplayMode.defaultProps = {
	id: uuid.v4(),
	displayModesOptions: ['table', 'large'],
	initialDisplayMode: 'table',
};
ListDisplayMode.propTypes = {
	children: PropTypes.node,
	displayModesOptions: PropTypes.arrayOf(PropTypes.string),
	id: PropTypes.string,
	initialDisplayMode: PropTypes.string,
	onChange: PropTypes.func,
	selectedDisplayMode: PropTypes.string,
};

export default ListDisplayMode;
