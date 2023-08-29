import { ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonPrimary, ButtonSecondary, Divider, StackHorizontal } from '@talend/design-system';

import I18N from '../../../constants/i18n';
import { StepperFormContext } from '../StepperForm.context';

import style from '../StepperForm.module.scss';

interface StepFooterProps {
	children?: ReactNode;
	dataFeature?: {
		cancel?: string;
		next?: string;
		previous?: string;
		submit?: string;
	};
	isLoading?: boolean;
	onCancel(): void;
	onNext?(): void;
	onPrevious?(): void;
}

export const StepFooter = ({
	children,
	dataFeature,
	isLoading,
	onCancel,
	onPrevious,
	onNext,
}: StepFooterProps) => {
	const { t } = useTranslation(I18N.STEPPER_NAMESPACE);
	const { currentStep, steps } = useContext(StepperFormContext);

	const currentStepNavigation = steps[currentStep].navigation;

	return (
		<div className={style['stepper-form__footer']}>
			<StackHorizontal gap="M" align="center">
				<ButtonSecondary onClick={onCancel} data-feature={dataFeature?.cancel}>
					{t('CANCEL', 'Cancel')}
				</ButtonSecondary>

				<Divider orientation="vertical" />

				{onPrevious && (
					<ButtonSecondary onClick={onPrevious} data-feature={dataFeature?.previous}>
						{t('PREVIOUS', 'Previous')}
					</ButtonSecondary>
				)}

				{children}

				{onNext && (
					<ButtonPrimary onClick={onNext} data-feature={dataFeature?.next} disabled={isLoading}>
						{currentStepNavigation?.next ? t('NEXT', 'Next') : t('VALIDATE', 'Validate')}
					</ButtonPrimary>
				)}
			</StackHorizontal>
		</div>
	);
};
