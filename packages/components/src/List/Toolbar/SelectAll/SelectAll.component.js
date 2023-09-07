import PropTypes from 'prop-types';

import { Form } from '@talend/design-system';
import { useTranslation } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import theme from './SelectAll.module.scss';

function SelectAll({ id, items, isSelected, onToggleAll }) {
	const isAllSelected = () => items.length > 0 && items.findIndex(item => !isSelected(item)) < 0;
	const checkboxId = id && `${id}-check-all`;
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	return (
		<form className={theme.container}>
			<label htmlFor={checkboxId}>
				<Form.Checkbox
					name={checkboxId}
					id={checkboxId}
					onChange={event => {
						onToggleAll(event, items);
					}}
					checked={isAllSelected()}
					disabled={!items.length}
					label={t('LIST_SELECT_ALL', { defaultValue: 'Select all' })}
				/>
			</label>
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
