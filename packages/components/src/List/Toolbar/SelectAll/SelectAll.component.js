import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import getDefaultT from '../../../translate';
import theme from './SelectAll.scss';

function SelectAll(props) {
	const checkboxId = props.id && `${props.id}-check-all`;
	if (!props.onToggleAll || !props.checked) {
		return null;
	}
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
							props.onToggleAll(event, props.items);
						}}
						checked={props.checked()}
						disabled={!props.items.length}
					/>
					<span>{props.t('LIST_SELECT_ALL', { defaultValue: 'Select All' })}</span>
				</label>
			</div>
		</form>
	);
}

SelectAll.propTypes = {
	id: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	checked: PropTypes.func,
	onToggleAll: PropTypes.func,
	t: PropTypes.func.isRequired,
};

SelectAll.defaultProps = {
	t: getDefaultT(),
};

export default SelectAll;
