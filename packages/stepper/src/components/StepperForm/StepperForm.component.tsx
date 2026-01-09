import { useContext } from 'react';

import { Stepper as StepperDS } from '@talend/design-system';

import { StepHeader } from './StepHeader';
import { StepperFormContext } from './StepperForm.context';
import { StepperProps } from './StepperForm.types';
import { getStepComponent } from './StepperForm.utils';

import style from './StepperForm.module.css';

const StepperForm = ({ isLoading }: StepperProps) => {
	const { steps, currentStep } = useContext(StepperFormContext);
	const currentStepData = steps[currentStep];
	const Component = currentStepData.component;

	return (
		<div className={style['stepper-form']}>
			<div className={style['stepper-form__steps']}>
				<StepperDS currentStepIndex={currentStep} loading={isLoading}>
					{steps.map((step, index) => {
						const { key, navigation, tooltip, name } = step;
						const Step = getStepComponent(currentStep, index, !!navigation?.disableCause);

						return (
							<Step
								key={`step-${key}`}
								tooltip={navigation?.disableCause ?? tooltip}
								title={name}
							/>
						);
					})}
				</StepperDS>
			</div>
			<div className={style['stepper-form__container']}>
				<StepHeader {...currentStepData.header} />

				<section className={style['stepper-form__content']} data-testid={currentStepData.key}>
					<Component />
				</section>
			</div>
		</div>
	);
};

StepperForm.displayName = 'StepperForm';

export default StepperForm;
