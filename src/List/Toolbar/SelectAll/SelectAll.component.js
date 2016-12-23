import React from 'react';
import classNames from 'classnames';

import theme from './SelectAll.scss';

function SelectAll({ id, items, isSelected, onToggleAll }) {
	const isAllSelected = () => items.findIndex(item => !isSelected(item)) < 0;
	const checkboxId = id && `${id}-check-all`;
	return (
		<form className="navbar-form navbar-left">
			<div className={classNames('navbar-text', theme['tc-list-toolbar-select-all'])}>
				<input
					id={checkboxId}
					type="checkbox"
					onChange={(event) => { onToggleAll(event, items); }}
					checked={isAllSelected()}
					disabled={!items.length}
				/>
				<label className="tc-list-toolbar-select-all" htmlFor={checkboxId}>Select All</label>
			</div>
		</form>
	);
}

SelectAll.propTypes = {
	id: React.PropTypes.string,
	items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
	isSelected: React.PropTypes.func.isRequired,
	onToggleAll: React.PropTypes.func.isRequired,
};

export default SelectAll;
