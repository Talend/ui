import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './SelectAll.module.scss';
import { useTranslation } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../../../constants';

function SelectAll({ id, items, isSelected, onToggleAll }) {
	const isAllSelected = () => items.length > 0 && items.findIndex(item => !isSelected(item)) < 0;
	const checkboxId = id && `${id}-check-all`;
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	return (
		<form className={classNames(theme.container, 'navbar-form navbar-left')}>
			<div
				className={classNames('checkbox-inline navbar-text', theme['tc-list-toolbar-select-all'])}
			>
				<label className="tc-list-toolbar-select-all" htmlFor={checkboxId}>
					<input
						id={checkboxId}
						type="checkbox"
						onChange={event => {
							onToggleAll(event, items);
						}}
						checked={isAllSelected()}
						disabled={!items.length}
					/>
					<span>{t('LIST_SELECT_ALL', { defaultValue: 'Select all' })}</span>
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
};

export default SelectAll;
