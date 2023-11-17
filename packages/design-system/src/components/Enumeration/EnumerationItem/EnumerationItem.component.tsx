import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import { useId } from '../../../useId';
import { ButtonIcon } from '../../ButtonIcon';
import { Dropdown } from '../../Dropdown';
import { Form } from '../../Form';
import { InlineEditing } from '../../InlineEditing';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';
import { EnumerationMode } from '../Enumeration.types';
import { EnumerationItemProps } from './EnumerationItem.types';

import styles from './EnumerationItem.module.scss';

export const EnumerationItem = ({
	mode,
	onChange,
	onRemove,
	selectedItems,
	setSelectedItems,
	value,
}: EnumerationItemProps) => {
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);
	const id = useId();

	const [isEdit, setIsEdit] = useState(false);

	const isChecked = (id: string) => selectedItems.includes(id);

	const onToggleItem = (value: string, isChecked: boolean) => {
		if (isChecked) {
			setSelectedItems([...selectedItems, value]);
		} else {
			setSelectedItems(selectedItems.filter(item => item !== value));
		}
	};

	return (
		<div
			className={classNames(styles['enumeration__item'], {
				[styles['enumeration__item--edit']]: isEdit,
			})}
		>
			{isEdit ? (
				<InlineEditing.Text
					defaultValue={value}
					isEditionMode={true}
					label={`${value}`}
					onCancel={() => setIsEdit(false)}
					onEdit={(_, value) => {
						onChange(value);
						setIsEdit(false);
					}}
					placeholder={value}
				/>
			) : (
				<>
					{mode === EnumerationMode.EDIT ? (
						<Form.Checkbox
							checked={isChecked(value)}
							label={value}
							name={`${id}`}
							onChange={e => onToggleItem(value, e.target.checked)}
						/>
					) : (
						<p>{value}</p>
					)}
					<Dropdown
						aria-label="Open user menu"
						items={[
							{
								label: t('ENUMERATION_DROPDOWN_EDIT', 'Edit'),
								icon: 'pencil',
								onClick: () => setIsEdit(true),
								type: 'button',
							},
							{
								label: t('ENUMERATION_DROPDOWN_REMOVE', 'Remove'),
								icon: 'trash',
								onClick: async () => await onRemove?.([value]),
								type: 'button',
							},
						]}
					>
						<ButtonIcon
							icon="dots-vertical"
							onClick={() => {}}
							size="S"
							disabled={[EnumerationMode.CREATE, EnumerationMode.EDIT].includes(mode)}
						>
							{t('ENUMERATION_DROPDOWN_OPTIONS', 'Dropdown options')}
						</ButtonIcon>
					</Dropdown>
				</>
			)}
		</div>
	);
};
