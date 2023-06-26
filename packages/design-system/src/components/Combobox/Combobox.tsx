import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../constants';
import styles from './Combobox.module.scss';
import { useId } from '../../useId';

export type ComboboxProps = {
	id?: string;
	values?: string[];
	initialValue?: string;
};

const Combobox = ({ values, ...rest }: ComboboxProps) => {
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);
	const [show, setShow] = useState<boolean>(false);
	const [options, setOptions] = useState<string[]>(values || []);
	const [value, setValue] = useState<string>(rest.initialValue || '');
	const id = useId(rest.id);
	const boxId = useId();
	const noValue = t('COMBOBOX_NOT_RESULT', 'No results found');
	const onKeydown = useCallback(e => {
		if (e.key === 'Escape') {
			setShow(false);
		}
	}, []);
	// const combobox = useReakitComboboxState({
	// 	autoSelect: true,
	// 	inline: true,
	// 	list: true,
	// 	gutter: 8,
	// 	values,
	// });

	// sync options with values and value
	useEffect(() => {
		if (value) {
			setOptions(
				(values || []).filter(option => option.toLowerCase().includes(value.toLowerCase())),
			);
		} else {
			setOptions(values || []);
		}
	}, [value, values]);

	return (
		<div className={styles.combobox}>
			<input
				className={styles.combobox__input}
				id={id}
				role="combobox"
				autoComplete="off"
				aria-expanded={show}
				onKeyDown={onKeydown}
				onFocus={() => setShow(true)}
				aria-controls={boxId}
				value={value}
				placeholder={t('COMBOBOX_PLACEHOLDER', 'Search')}
				onChange={e => setValue(e.target.value)}
			/>
			<div id={boxId} role="listbox" aria-labelledby={id} data-dialog="true" hidden={!show}>
				{show && options.length ? (
					options.map(v => (
						<div
							role="option"
							tabIndex={-1}
							aria-selected="false"
							key={v}
							onClick={() => {
								setValue(v);
								setShow(false);
							}}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									setValue(v);
									setShow(false);
								}
							}}
						>
							{v}
						</div>
					))
				) : (
					<div role="option" aria-selected="false">
						{noValue}
					</div>
				)}
			</div>
		</div>
	);
};

export default Combobox;
