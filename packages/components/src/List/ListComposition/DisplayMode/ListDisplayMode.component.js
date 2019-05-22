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

const DisplayModeIcon = React.memo(({
	displayMode,
	displayModeOption,
	id,
	onSelect,
}) => {
	const { t } = useListContext();
	return (
		<ActionIconToggle
			key={displayModeOption}
			id={`${id}-${displayModeOption}`}
			icon={displayModeOption === 'table' ? 'talend-table' : 'talend-expanded'}
			label={t('LIST_SELECT_DISPLAY_MODE', {
				defaultValue: 'Set {{displayMode}} as current display mode.',
				displayMode: getLabel(displayModeOption, t),
			})}
			active={displayMode === displayModeOption}
			disabled={displayMode === displayModeOption}
			onClick={e => {
				onSelect(e, displayModeOption);
			}}
		/>
	);
});

function ListDisplayMode({ id, displayModes, initialDisplayMode, onChange, selectedDisplayMode }) {
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

	return (
		<div className={classNames(theme['tc-display-mode-toggle'], 'tc-display-mode-toggle')}>
			{displayModes.map(displayModeOption => (
				<DisplayModeIcon
					displayMode={selectedDisplayMode || displayMode}
					displayModeOption={displayModeOption}
					id={id}
					onSelect={onSelect}
				/>
			))}
		</div>
	);
}

ListDisplayMode.defaultProps = {
	id: uuid.v4(),
	displayModes: ['table', 'large'],
	initialDisplayMode: 'table',
};
ListDisplayMode.propTypes = {
	displayModes: PropTypes.arrayOf(PropTypes.string),
	id: PropTypes.string,
	initialDisplayMode: PropTypes.string,
	onChange: PropTypes.func,
	selectedDisplayMode: PropTypes.string,
};

export default ListDisplayMode;
