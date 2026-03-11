import { jsx, jsxs } from 'react/jsx-runtime';
import { useContext } from 'react';
import { Stepper as StepperDS } from '@talend/design-system';
import { StepHeader } from './StepHeader';
import { StepperFormContext } from './StepperForm.context';
import { getStepComponent } from './StepperForm.utils';
import style from './StepperForm.module.css';
const StepperForm = ({ isLoading }) => {
	const { steps, currentStep } = useContext(StepperFormContext);
	const currentStepData = steps[currentStep];
	const Component = currentStepData.component;
	return /* @__PURE__ */ jsxs('div', {
		className: style['stepper-form'],
		children: [
			/* @__PURE__ */ jsx('div', {
				className: style['stepper-form__steps'],
				children: /* @__PURE__ */ jsx(StepperDS, {
					currentStepIndex: currentStep,
					loading: isLoading,
					children: steps.map((step, index) => {
						const { key, navigation, tooltip, name } = step;
						const Step = getStepComponent(currentStep, index, !!navigation?.disableCause);
						return /* @__PURE__ */ jsx(
							Step,
							{
								tooltip: navigation?.disableCause ?? tooltip,
								title: name,
							},
							`step-${key}`,
						);
					}),
				}),
			}),
			/* @__PURE__ */ jsxs('div', {
				className: style['stepper-form__container'],
				children: [
					/* @__PURE__ */ jsx(StepHeader, { ...currentStepData.header }),
					/* @__PURE__ */ jsx('section', {
						className: style['stepper-form__content'],
						'data-testid': currentStepData.key,
						children: /* @__PURE__ */ jsx(Component, {}),
					}),
				],
			}),
		],
	});
};
StepperForm.displayName = 'StepperForm';
var StepperForm_component_default = StepperForm;
export { StepperForm_component_default as default };
//# sourceMappingURL=StepperForm.component.js.map
