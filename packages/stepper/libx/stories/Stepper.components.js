import { jsx, jsxs } from 'react/jsx-runtime';
import { createContext, useContext, useEffect } from 'react';
import { FormProvider, useController, useForm } from 'react-hook-form';
import { Form, InlineMessageDestructive } from '@talend/design-system';
import StepperForm from '../components/StepperForm';
const BusinessContext = createContext({});
const FormComponentStep1 = () => {
	const { disableStep, enableStep, onNext } = useContext(StepperForm.Context);
	const { stepsData, setStepsData } = useContext(BusinessContext);
	const rhf = useForm({
		defaultValues: { ...stepsData[0] },
	});
	const { field, fieldState } = useController({
		control: rhf.control,
		name: 'randomInput',
		rules: {
			required: true,
		},
	});
	useEffect(() => {
		const data = stepsData;
		data[0] = { [field.name]: field.value };
		setStepsData(data);
	}, [field]);
	return /* @__PURE__ */ jsx(FormProvider, {
		...rhf,
		children: /* @__PURE__ */ jsxs(Form, {
			children: [
				/* @__PURE__ */ jsxs(Form.Fieldset, {
					children: [
						/* @__PURE__ */ jsx(Form.Checkbox, {
							id: 'disable1',
							name: 'disable-steps',
							label: 'Disable step 2',
							onChange: e => {
								if (e.target.checked) {
									disableStep('STEP2', 'Disabled cause');
								} else {
									enableStep('STEP2');
								}
							},
						}),
						/* @__PURE__ */ jsx(Form.Checkbox, {
							id: 'disable2',
							name: 'disable-steps',
							label: 'Disable step 3',
							onChange: e => {
								if (e.target.checked) {
									disableStep('STEP3', 'Just because');
								} else {
									enableStep('STEP3');
								}
							},
						}),
						fieldState.invalid &&
							/* @__PURE__ */ jsx(InlineMessageDestructive, {
								description: 'This field is required',
								withBackground: true,
							}),
						/* @__PURE__ */ jsx(Form.Input, {
							id: 'randomInput',
							label: 'Random input',
							name: field.name,
							onChange: e => {
								field.onChange(e);
							},
							value: field.value,
						}),
					],
				}),
				/* @__PURE__ */ jsx(StepperForm.Footer, {
					onCancel: () => alert('Cancel action'),
					onNext: () => rhf.handleSubmit(onNext)(),
				}),
			],
		}),
	});
};
const FormComponentStep2 = () => {
	const { disableStep, enableStep, onNext, onPrevious } = useContext(StepperForm.Context);
	const { stepsData, setStepsData } = useContext(BusinessContext);
	const rhf = useForm({
		defaultValues: { ...stepsData[1] },
	});
	const { field, fieldState } = useController({
		control: rhf.control,
		name: 'randomInput',
		rules: {
			required: true,
		},
	});
	useEffect(() => {
		const data = stepsData;
		data[1] = { [field.name]: field.value };
		setStepsData(data);
	}, [field]);
	return /* @__PURE__ */ jsx(FormProvider, {
		...rhf,
		children: /* @__PURE__ */ jsxs(Form, {
			children: [
				/* @__PURE__ */ jsxs(Form.Fieldset, {
					children: [
						/* @__PURE__ */ jsx(Form.Checkbox, {
							id: 'disable1',
							name: 'disable-steps',
							label: 'Disable step 3',
							onChange: e => {
								if (e.target.checked) {
									disableStep('STEP3', 'Disabled cause');
								} else {
									enableStep('STEP3');
								}
							},
						}),
						fieldState.invalid &&
							/* @__PURE__ */ jsx(InlineMessageDestructive, {
								description: 'This field is required',
								withBackground: true,
							}),
						/* @__PURE__ */ jsx(Form.Input, {
							id: 'randomInput',
							label: 'Random input',
							name: field.name,
							onChange: field.onChange,
							value: field.value,
						}),
					],
				}),
				/* @__PURE__ */ jsx(StepperForm.Footer, {
					onCancel: () => alert('Cancel action'),
					onNext: () => rhf.handleSubmit(onNext)(),
					onPrevious,
				}),
			],
		}),
	});
};
const FormComponentStep3 = () => {
	const { onNext, onPrevious } = useContext(StepperForm.Context);
	const { stepsData, setStepsData } = useContext(BusinessContext);
	const rhf = useForm({
		defaultValues: { ...stepsData[2] },
	});
	const { field, fieldState } = useController({
		control: rhf.control,
		name: 'randomInput',
		rules: {
			required: true,
		},
	});
	useEffect(() => {
		const data = stepsData;
		data[2] = { [field.name]: field.value };
		setStepsData(data);
	}, [field]);
	return /* @__PURE__ */ jsx(FormProvider, {
		...rhf,
		children: /* @__PURE__ */ jsxs(Form, {
			children: [
				/* @__PURE__ */ jsxs(Form.Fieldset, {
					children: [
						fieldState.invalid &&
							/* @__PURE__ */ jsx(InlineMessageDestructive, {
								description: 'This field is required',
								withBackground: true,
							}),
						/* @__PURE__ */ jsx(Form.Input, {
							id: 'randomInput',
							label: 'Random input',
							name: field.name,
							onChange: field.onChange,
							value: field.value,
						}),
					],
				}),
				/* @__PURE__ */ jsx(StepperForm.Footer, {
					onCancel: () => alert('Cancel action'),
					onNext: () => rhf.handleSubmit(onNext)(),
					onPrevious,
				}),
			],
		}),
	});
};
export { BusinessContext, FormComponentStep1, FormComponentStep2, FormComponentStep3 };
//# sourceMappingURL=Stepper.components.js.map
