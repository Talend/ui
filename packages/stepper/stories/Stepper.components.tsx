import { Form, InlineMessageDestructive } from '@talend/design-system';
import { createContext, useContext, useEffect } from 'react';
import StepperForm from '../src/components/StepperForm';
import { StepperFormContext } from '../src/components/StepperForm/StepperForm.context';
import { FormProvider, useController, useForm } from 'react-hook-form';

interface BusinessContextApi {
	setStepsData: (stepData: any) => void;
	stepsData: any[];
}

export const BusinessContext = createContext({} as BusinessContextApi);

export const FormComponentStep1 = () => {
	const { onDisableStep, onEnableStep, onNext, steps, currentStep } =
		useContext(StepperFormContext);
	const { stepsData, setStepsData } = useContext(BusinessContext);
	const currentStepNavigation = steps[currentStep].navigation;

	const rhf = useForm<any>({
		defaultValues: { ...stepsData[0] },
	});

	const { field, meta } = useController({
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

	return (
		<FormProvider {...rhf}>
			<Form.Fieldset>
				<Form.Checkbox
					id="disable1"
					name="disable-steps"
					label="Disable step 2"
					onChange={e => {
						if (e.target.checked) {
							onDisableStep('STEP2', 'Just because');
						} else {
							onEnableStep('STEP2');
						}
					}}
				/>
				<Form.Checkbox
					id="disable2"
					name="disable-steps"
					label="Disable step 3"
					onChange={e => {
						if (e.target.checked) {
							onDisableStep('STEP3', 'Just because');
						} else {
							onEnableStep('STEP3');
						}
					}}
				/>

				{meta.invalid && (
					<InlineMessageDestructive description={'This field is required'} withBackground />
				)}
				<Form.Input
					id="randomInput"
					label="Random input"
					name={field.name}
					onChange={e => {
						field.onChange(e);
					}}
					value={field.value}
				/>
			</Form.Fieldset>
			<StepperForm.Footer
				onCancel={() => alert('Cancel action')}
				onNext={() => {
					rhf.handleSubmit(onNext)();
				}}
				onSubmit={() => (!currentStepNavigation?.next ? alert('You did it!') : undefined)}
			/>
		</FormProvider>
	);
};

export const FormComponentStep2 = () => {
	const { onDisableStep, onEnableStep, onNext, onPrevious, steps, currentStep } =
		useContext(StepperFormContext);
	const { stepsData, setStepsData } = useContext(BusinessContext);

	const currentStepNavigation = steps[currentStep].navigation;

	const rhf = useForm<{ randomInput: string }>({
		defaultValues: { ...stepsData[1] },
	});

	const { field, meta } = useController({
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

	return (
		<FormProvider {...rhf}>
			<Form.Fieldset>
				<Form.Checkbox
					id="disable1"
					name="disable-steps"
					label="Disable step 3"
					onChange={e => {
						if (e.target.checked) {
							onDisableStep('STEP3', 'Just because');
						} else {
							onEnableStep('STEP3');
						}
					}}
				/>

				{meta.invalid && (
					<InlineMessageDestructive description={'This field is required'} withBackground />
				)}
				<Form.Input
					id="randomInput"
					label="Random input"
					name={field.name}
					onChange={field.onChange}
					value={field.value}
				/>
			</Form.Fieldset>
			<StepperForm.Footer
				onCancel={() => alert('Cancel action')}
				onNext={() => (currentStepNavigation?.next ? rhf.handleSubmit(onNext)() : undefined)}
				onPrevious={onPrevious}
				onSubmit={() => (!currentStepNavigation?.next ? alert('You did it!') : undefined)}
			/>
		</FormProvider>
	);
};

export const FormComponentStep3 = () => {
	const { onNext, onPrevious, steps, currentStep } = useContext(StepperFormContext);
	const { stepsData, setStepsData } = useContext(BusinessContext);

	const currentStepNavigation = steps[currentStep].navigation;

	const rhf = useForm<{ randomInput: string }>({
		defaultValues: { ...stepsData[2] },
	});

	const { field, meta } = useController({
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

	return (
		<FormProvider {...rhf}>
			<Form.Fieldset>
				{meta.invalid && (
					<InlineMessageDestructive description={'This field is required'} withBackground />
				)}
				<Form.Input
					id="randomInput"
					label="Random input"
					name={field.name}
					onChange={field.onChange}
					value={field.value}
				/>
			</Form.Fieldset>
			<StepperForm.Footer
				onCancel={() => alert('Cancel action')}
				onNext={() => (currentStepNavigation?.next ? rhf.handleSubmit(onNext)() : undefined)}
				onPrevious={onPrevious}
				onSubmit={() => rhf.handleSubmit(() => alert('You did it!'))()}
			/>
		</FormProvider>
	);
};
