import { ButtonPrimary, ButtonSecondary, Divider, StackHorizontal } from '@talend/design-system';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import I18N from '../../../constants/i18n';
import { StepperFormContext } from '../StepperForm.context';
import style from '../StepperForm.module.scss';
import { StepperFormFooterProps } from './StepperFormFooter.types';

const StepperFormFooter = ({
	children,
	dataFeature,
	isLoading,
	onCancel,
	onPrevious,
	onNext,
	onSubmit,
}: StepperFormFooterProps) => {
	const { t } = useTranslation(I18N.STEPPER_NAMESPACE);
	const { currentStep, steps } = useContext(StepperFormContext);

	const currentStepNavigation = steps[currentStep].navigation;

	const showNextButton = currentStepNavigation?.next && currentStep < steps.length - 1;
	const showPreviousButton = currentStepNavigation?.previous;
	const showRunButton = !currentStepNavigation?.next;
	const hasRightButtons = showPreviousButton || showNextButton || children || showRunButton;

	return (
		<div className={style['stepper-form__footer']}>
			<StackHorizontal gap="M" align="center">
				<ButtonSecondary onClick={onCancel} data-feature={dataFeature?.cancel}>
					{t('CANCEL', 'Cancel')}
				</ButtonSecondary>
				{hasRightButtons && <Divider orientation="vertical" />}

				{showPreviousButton && onPrevious && (
					<ButtonSecondary onClick={onPrevious} data-feature={dataFeature?.previous}>
						{t('PREVIOUS', 'Previous')}
					</ButtonSecondary>
				)}

				{children}

				{showNextButton && onNext && (
					<ButtonPrimary onClick={onNext} data-feature={dataFeature?.next} disabled={isLoading}>
						{t('NEXT', 'Next')}
					</ButtonPrimary>
				)}

				{showRunButton && onSubmit && (
					<ButtonPrimary onClick={onSubmit} data-feature={dataFeature?.submit} disabled={isLoading}>
						{t('VALIDATE', 'Validate')}
					</ButtonPrimary>
				)}
			</StackHorizontal>
		</div>
	);
};

export default StepperFormFooter;
