import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import uuid from 'uuid';
import { translate } from 'react-i18next';

import { ListContext } from '../context';
import getDefaultT from '../../translate';
import I18N_DOMAIN_COMPONENTS from '../../constants';

import theme from './SelectAll.scss';

function SelectAll({ disabled, id, checked, onToggle, t }) {
	return (
		<form className={classNames(theme.container, 'navbar-form navbar-left')}>
			<div
				className={classNames('checkbox-inline navbar-text', theme['tc-list-toolbar-select-all'])}
			>
				<label className="tc-list-toolbar-select-all" htmlFor={id}>
					<input
						id={id}
						type="checkbox"
						onChange={onToggle}
						checked={checked}
						disabled={disabled}
					/>
					<span>{t('LIST_SELECT_ALL', { defaultValue: 'Select All' })}</span>
				</label>
			</div>
		</form>
	);
}

SelectAll.propTypes = {
	disabled: PropTypes.bool,
	id: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	onToggle: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
};

SelectAll.defaultProps = {
	id: uuid.v4(),
	isSelected: false,
	t: getDefaultT(),
};

function ContextualSelectAll(props) {
	return (
		<ListContext.Consumer>
			{({ selectAllChecked, onSelectAllChange }) => (
				<SelectAll checked={selectAllChecked} onToggle={onSelectAllChange} {...props} />
			)}
		</ListContext.Consumer>
	);
}
ContextualSelectAll.displayName = 'ListContext(List.SelectAll)';

export default translate(I18N_DOMAIN_COMPONENTS)(ContextualSelectAll);
