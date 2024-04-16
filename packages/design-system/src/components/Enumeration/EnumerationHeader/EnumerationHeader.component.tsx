import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonDestructive } from '../../Button';
import { ButtonIcon, ButtonIconToggle } from '../../ButtonIcon';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';
import { Form } from '../../Form';
import { InlineEditing } from '../../InlineEditing';
import { InlineMessageDestructive } from '../../InlineMessage';
import { StackHorizontal, StackVertical } from '../../Stack';
import { EnumerationMode } from '../Enumeration.types';
import styles from './EnumerationHeader.module.css';
import { EnumerationHeaderProps } from './EnumerationIHeader.types';

export const EnumerationHeader = ({
	filteredItems,
	id,
	items,
	mode,
	onCreate,
	onImport,
	onRemove,
	setFilteredItems,
	setMode,
	selectedItems,
	setSelectedItems,
	title,
}: EnumerationHeaderProps) => {
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);
	const importRef = useRef<HTMLInputElement>(null);
	const [searchValue, setSearchValue] = useState<string>();
	const [hasError, setHasError] = useState(false);

	const isAllChecked = () => selectedItems.length > 0 || selectedItems.length === items.length;

	const onToggleAll = (isChecked: boolean) => setSelectedItems(isChecked ? items : []);

	useEffect(() => {
		if (searchValue) {
			setFilteredItems(items.filter(item => item.includes(searchValue)));
		} else {
			setFilteredItems(items);
		}
	}, [searchValue, items]);

	return (
		<div className={styles.enumeration__header}>
			<div className={styles.enumeration__title}>
				<h4>{title}</h4>

				{selectedItems.length ? (
					<ButtonDestructive
						onClick={async () => {
							onRemove(selectedItems);
							setSelectedItems([]);
							setMode(EnumerationMode.VIEW);
						}}
					>
						{t('ENUMERATION_REMOVE_BUTTON', {
							count: selectedItems.length,
							defaultValue: 'Remove ({{count}})',
						})}
					</ButtonDestructive>
				) : (
					<StackHorizontal as="ul" gap="XS" justify="end">
						<li>
							<ButtonIconToggle
								disabled={![EnumerationMode.VIEW, EnumerationMode.CREATE].includes(mode)}
								icon="plus"
								isActive={mode === EnumerationMode.CREATE}
								onClick={() => {
									setSearchValue(undefined);
									setFilteredItems(items);
									setMode(
										mode === EnumerationMode.CREATE ? EnumerationMode.VIEW : EnumerationMode.CREATE,
									);
								}}
								size="S"
							>
								{t('ENUMERATION_ADD_ACTION', 'Add item')}
							</ButtonIconToggle>
						</li>
						<li>
							<ButtonIconToggle
								disabled={
									![EnumerationMode.VIEW, EnumerationMode.EDIT].includes(mode) ||
									filteredItems.length === 0
								}
								icon="pencil"
								isActive={mode === EnumerationMode.EDIT}
								onClick={() => {
									setMode(
										mode === EnumerationMode.EDIT ? EnumerationMode.VIEW : EnumerationMode.EDIT,
									);
								}}
								size="S"
							>
								{t('ENUMERATION_EDIT_ACTION', 'Edit item')}
							</ButtonIconToggle>
						</li>
						{onImport && (
							<li>
								<input
									type="file"
									accept=".txt, .csv"
									ref={importRef}
									onChange={e => {
										const fr = new FileReader();
										const file = e.target.files?.[0];

										if (file) {
											try {
												fr.readAsText(file);
												fr.onload = () => onImport(fr.result as string);
											} catch (error) {
												//The parent component must do the error handling
											}
										}
									}}
								/>
								<ButtonIcon
									icon="import"
									onClick={() => importRef.current?.click()}
									size="S"
									disabled={![EnumerationMode.VIEW].includes(mode)}
								>
									{t('ENUMERATION_IMPORT_ACTION', 'Import items')}
								</ButtonIcon>
							</li>
						)}
					</StackHorizontal>
				)}
			</div>

			{mode === EnumerationMode.CREATE ? (
				<StackVertical gap={'XXS'} align={'stretch'}>
					<InlineEditing.Text
						isEditMode={true}
						label={t('ENUMERATION_ADD_INPUT_PLACEHOLDER', 'Enter a value')}
						placeholder={t('ENUMERATION_ADD_INPUT_PLACEHOLDER', 'Enter a value')}
						onEdit={(_, value) => {
							if (value) {
								onCreate(value);
								setMode(EnumerationMode.VIEW);
							}

							setHasError(!value);
						}}
						onCancel={() => {
							setMode(EnumerationMode.VIEW);
						}}
						hasError={hasError}
					/>

					{hasError && (
						<InlineMessageDestructive
							description={t('ENUMERATION_ADD_INPUT_EMPTY', 'You need to enter a value')}
						/>
					)}
				</StackVertical>
			) : (
				<Form.Search
					hideLabel
					label="Search"
					name={`${id}-search`}
					onChange={e => setSearchValue(e.target.value)}
					placeholder="Search"
				/>
			)}

			{mode === EnumerationMode.EDIT && (
				<Form.Checkbox
					name={`${id}-selectall`}
					label={t('ENUMERATION_SELECT_ALL', 'Select all')}
					onChange={e => onToggleAll(e.target.checked)}
					checked={isAllChecked()}
					indeterminate={selectedItems.length > 0}
				/>
			)}
		</div>
	);
};
