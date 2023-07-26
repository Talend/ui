import { Stepper as StepperDS } from '@talend/design-system';
import { useStepperForm } from '../../hooks/useStepperForm/useStepperForm.hook';
import StepperFormContext from './StepperForm.context';
import style from './StepperForm.module.scss';
import { StepperProps } from './StepperForm.types';
import { getStepComponent } from './StepperForm.utils';
import { StepperFormFooter } from './StepperFormFooter/StepperFormFooter.component';
import { StepperFormHeader } from './StepperFormHeader/StepperFormHeader.component';

const StepperForm = ({ initalStepIndex = 0, footer, header, isLoading, steps }: StepperProps) => {
	const {
		onNextStep,
		onPreviousStep,
		currentStep,
		steps: stepperSteps,
	} = useStepperForm(steps, initalStepIndex);

	const Component = steps[currentStep].component;
	return (
		<StepperFormContext.Provider value={{ currentStep, isLoading, stepperSteps }}>
			<div className={style['stepper-form']}>
				<div className={style['stepper-form__steps']}>
					<StepperDS currentStepIndex={currentStep}>
						{stepperSteps.map((step, index) => {
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

					<StepperFormFooter
						{...footer}
						isLoading={isLoading}
						onPrevious={() => {
							onPreviousStep();
							footer.onPrevious?.();
						}}
						onNext={() => {
							onNextStep();
							footer.onNext?.();
						}}
					/>
				</div>
			</div>
		</StepperFormContext.Provider>
	);
};

export default StepperForm;
