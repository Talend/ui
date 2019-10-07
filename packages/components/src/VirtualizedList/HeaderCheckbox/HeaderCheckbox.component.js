import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import classnames from 'classnames';
import theme from './HeaderCheckbox.scss';
import getDefaultT from '../../translate';

/**
 * Header renderer that displays a "Select All" checkbox on header
 */
function HeaderCheckbox({ columnData, t }) {
	if (!columnData.onToggleAll) {
		return null;
	}

	const { id, onToggleAll, collection, isSelected } = columnData;
	const checked = useMemo(() => collection.length > 0 && collection.every(isSelected), [
		collection,
		isSelected,
	]);
	const title = t('LIST_SELECT_ALL', { defaultValue: 'Select All' });

	return (
		<form className={classnames('tc-list-checkbox', theme['tc-list-checkbox'])}>
			<div className="checkbox" title={title}>
				<label htmlFor={id && `${id}-header-check`}>
					<input
						id={id && `${id}-header-check`}
						type="checkbox"
						onChange={onToggleAll}
						checked={checked}
						disabled={!collection.length}
					/>
					<span className="sr-only">{title}</span>
				</label>
			</div>
		</form>
	);
}

HeaderCheckbox.displayName = 'VirtualizedList(HeaderCheckbox)';
HeaderCheckbox.propTypes = {
	// The custom props passed to <VirtualizedList.Content columnData={}>.
	columnData: PropTypes.shape({
		// The List id. This is used as the checkbox id prefix.
		id: PropTypes.string,
		// all items in list, used by onToggleAll callback.
		collection: PropTypes.array.isRequired,
		// The function is to check if item is selected.
		isSelected: PropTypes.func.isRequired,
		// The onToggleAll callback triggered on header checkbox toggle.
		onToggleAll: PropTypes.func.isRequired,
	}),
	t: PropTypes.func,
};
HeaderCheckbox.defaultProps = {
	t: getDefaultT(),
};

export default HeaderCheckbox;
