import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';
import styles from './Combobox.module.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
	unstable_useComboboxState as useReakitComboboxState,
	unstable_Combobox as ReakitCombobox,
	unstable_ComboboxPopover as ReakitComboboxPopover,
	unstable_ComboboxOption as ReakitComboboxOption,
} from 'reakit';

export type ComboboxProps = {
	values?: string[];
	initialValue?: string;
};

const Combobox = ({ values, ...rest }: ComboboxProps) => {
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);

	const combobox = useReakitComboboxState({
		autoSelect: true,
		inline: true,
		list: true,
		gutter: 8,
		values,
	});

	return (
		<div className={styles.combobox}>
			<ReakitCombobox {...combobox} {...rest} className={styles.combobox__input} />
			<ReakitComboboxPopover {...combobox}>
				{combobox.matches.length
					? combobox.matches.map(match => (
							<ReakitComboboxOption {...combobox} key={match} value={match} />
					  ))
					: t('COMBOBOX_NOT_RESULT', 'No results found')}
			</ReakitComboboxPopover>
		</div>
	);
};

export default Combobox;
