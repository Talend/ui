import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import theme from './HeaderCheckbox.scss';

/**
 * Header renderer that displays a "Select All" checkbox on header
 */
function HeaderCheckbox(props) {
	const { columnData } = props;
	const { id, onToggleAll, collection, isSelected } = columnData;
	const isAllSelected = () =>
		collection.length > 0 && collection.findIndex(item => !isSelected(item)) < 0;
	return onToggleAll ? (
		<form className={classnames('tc-list-checkbox', theme['tc-list-checkbox'])}>
			<div className="checkbox">
				<label htmlFor={id && `${id}-header-check`}>
					<input
						id={id && `${id}-header-check`}
						type="checkbox"
						onChange={e => {
							onToggleAll(e, collection);
						}}
						checked={isAllSelected()}
						disabled={!collection.length}
					/>
					<span className={'tc-header-checkbox'}>
						<span className="sr-only">{'Select All'}</span>
					</span>
				</label>
			</div>
		</form>
	) : null;
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
};

export default HeaderCheckbox;
