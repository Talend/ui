import { jsx } from 'react/jsx-runtime';
import StepperForm from '../StepperForm.component';
import { StepperFormProvider } from '../StepperForm.context';
const StepperFormContainer = ({ initialStepIndex, steps, onSubmit }) => {
	return /* @__PURE__ */ jsx(StepperFormProvider, {
		initialStepIndex,
		steps,
		onSubmit,
		children: /* @__PURE__ */ jsx(StepperForm, {}),
	});
};
StepperFormContainer.displayName = 'StepperFormContainer';
export { StepperFormContainer };
//# sourceMappingURL=StepperFormContainer.component.js.map
