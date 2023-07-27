import { Stepper as StepperDS } from '@talend/design-system';
import { useContext } from 'react';
import { StepperFormContext } from './StepperForm.context';
import style from './StepperForm.module.scss';
import { StepperProps } from './StepperForm.types';
import { getStepComponent } from './StepperForm.utils';
import { StepperFormHeader } from './StepperFormHeader/StepperFormHeader.component';

const StepperForm = ({ header, isLoading }: StepperProps) => {
	const { steps, currentStep } = useContext(StepperFormContext);
	const Component = steps[currentStep].component;

	return (
		<div className={style['stepper-form']}>
			<div className={style['stepper-form__steps']}>
				<StepperDS currentStepIndex={currentStep} loading={isLoading}>
					{steps.map((step, index) => {
						const { key, navigation, tooltip, ...rest } = step;
						const Step = getStepComponent(currentStep, index, !!navigation?.disableCause);

						return (
							<Step key={`step-${key}`} tooltip={navigation?.disableCause ?? tooltip} {...rest} />
						);
					})}
				</StepperDS>
			</div>
			<div className={style['stepper-form__container']}>
				<StepperFormHeader {...header} />

				<div className={style['stepper-form__content']}>
					<Component />
				</div>
			</div>
		</div>
	);
};

export default StepperForm;
