import React, { useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { ActionIconToggle } from '../../../Actions';
import theme from './DisplayModeToggle.scss';
import { useListContext } from '../context';

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
	({ displayMode, displayModeOption, icon, id, label, onSelect }) => {
		const { t } = useListContext();
		return (
			<ActionIconToggle
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
		<div className={classNames(theme['tc-display-mode-toggle'], 'tc-display-mode-toggle')}>
			{displayModesOptions.map(displayModeOption => (
				<DisplayModeIcon
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
