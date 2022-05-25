import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	ButtonPrimary,
	ButtonSecondary,
	Form,
	StackHorizontal,
	StackVertical,
} from '@talend/design-system';

import theme from './ApplyToIdenticalValues.scss';

interface ApplyToIdenticalValuesPropTypes {
	onSubmit: (checked: boolean) => void;
	onCancel: (checked: boolean) => void;
	editorType?: string;
}

function ApplyToIdenticalValues({
	onSubmit,
	onCancel,
	editorType = 'textarea',
}: ApplyToIdenticalValuesPropTypes) {
	const { t } = useTranslation();
	const [checked, setChecked] = useState(false);

	const nextStatus = checked ? 'uncheck' : 'check';
	const dataFeature = `cell.edition.${editorType}.checkbox.${nextStatus}`;

	return (
		<div className={theme['apply-to-identical-values']}>
			<Form.Checkbox
				label={t('APPLY_TO_ALL_CELLS', 'Apply to identical values')}
				onClick={() => setChecked(!checked)}
				data-feature={dataFeature}
			/>

			<StackHorizontal gap={0} justify="spaceBetween">
				<ButtonSecondary onClick={() => onCancel(checked)}>{t('CANCEL', 'Cancel')}</ButtonSecondary>
				<ButtonPrimary onClick={() => onSubmit(checked)}>{t('SUBMIT', 'SUBMIT')}</ButtonPrimary>
			</StackHorizontal>
		</div>
	);
}

export default ApplyToIdenticalValues;
