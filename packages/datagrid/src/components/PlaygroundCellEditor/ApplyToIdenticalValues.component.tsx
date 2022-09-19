import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonPrimary, ButtonSecondary, Form, StackHorizontal } from '@talend/design-system';

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

	return (
		<div className={theme['apply-to-identical-values']}>
			<Form.Checkbox
				label={t('APPLY_TO_ALL_CELLS', 'Apply to identical values')}
				onClick={() => setChecked(!checked)}
				data-feature={`cell.edition.${editorType}.checkbox.${nextStatus}`}
				name="identical-values"
			/>

			<StackHorizontal gap={0} justify="spaceBetween">
				<ButtonSecondary
					data-feature={`cell.edition.${editorType}.cancel`}
					onClick={() => onCancel(checked)}
				>
					{t('CANCEL', 'Cancel')}
				</ButtonSecondary>
				<ButtonPrimary
					data-feature={`cell.edition.${editorType}.submit`}
					onClick={() => onSubmit(checked)}
				>
					{t('SUBMIT', 'SUBMIT')}
				</ButtonPrimary>
			</StackHorizontal>
		</div>
	);
}

export default ApplyToIdenticalValues;
