import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import getDefaultT from '../../../translate';
import theme from './SelectAll.scss';

function checked(items, isSelected) {
	return items.length > 0 && items.findIndex(item => !isSelected(item)) < 0;
}

function SelectAll({ id, items, isSelected, onToggleAll, t }) {
	const checkboxId = id && `${id}-check-all`;
	return (
		<form className="navbar-form navbar-left">
			<div className="checkbox-inline navbar-text">
				<label
					className={classNames('tc-list-toolbar-select-all', theme.label)}
					htmlFor={checkboxId}
				>
					<input
						id={checkboxId}
						type="checkbox"
						onChange={event => {
							onToggleAll(event, items);
						}}
						checked={checked(items, isSelected)}
						disabled={!items.length}
					/>
					<span>{t('LIST_SELECT_ALL', { defaultValue: 'Select All' })}</span>
				</label>
			</div>
		</form>
	);
}

SelectAll.propTypes = {
	id: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	isSelected: PropTypes.func.isRequired,
	onToggleAll: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

SelectAll.defaultProps = {
	t: getDefaultT(),
};

export default SelectAll;
