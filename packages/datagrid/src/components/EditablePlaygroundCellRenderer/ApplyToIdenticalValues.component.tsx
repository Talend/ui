import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	ButtonPrimary,
	ButtonSecondary,
	StackHorizontal,
	StackVertical,
} from '@talend/design-system';

import theme from './ApplyToIdenticalValues.scss';

interface ApplyToIdenticalValuesPropTypes {
	onSubmit: (checked: boolean) => void;
	onCancel: (checked: boolean) => void;
	editorType?: string;
}

const checkboxId = 'apply-to-identical-values';

function ApplyToIdenticalValues({
	onSubmit,
	onCancel,
	editorType = 'textarea',
}: ApplyToIdenticalValuesPropTypes) {
	const [checked, setChecked] = useState(false);
	const { t } = useTranslation();

	const nextStatus = checked ? 'uncheck' : 'check';
	const dataFeature = `cell.edition.${editorType}.checkbox.${nextStatus}`;

	return (
		<div className={theme['apply-to-identical-values']}>
			<label htmlFor={checkboxId}>
				<StackHorizontal gap="S" align="center">
					<input
						id={checkboxId}
						type="checkbox"
						className={theme['apply-to-identical-values__checkbox']}
						data-feature={dataFeature}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setChecked(event.target?.checked);
						}}
					/>
					<span className={theme['apply-to-identical-values__text']}>
						{t('APPLY_TO_ALL_CELLS', 'Apply to identical values')}
					</span>
				</StackHorizontal>
			</label>

			<StackHorizontal gap={0} justify="spaceBetween">
				<ButtonSecondary onClick={() => onCancel(checked)}>{t('CANCEL', 'Cancel')}</ButtonSecondary>
				<ButtonPrimary onClick={() => onSubmit(checked)}>{t('SUBMIT', 'SUBMIT')}</ButtonPrimary>
			</StackHorizontal>
		</div>
	);
}

export default ApplyToIdenticalValues;
