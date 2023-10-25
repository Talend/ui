import { createContext, useContext, useEffect } from 'react';
import { FormProvider, useController, useForm } from 'react-hook-form';

import { Form, InlineMessageDestructive } from '@talend/design-system';

import StepperForm from '../components/StepperForm';

interface BusinessContextApi {
	setStepsData: (stepData: any) => void;
	stepsData: any[];
}

export const BusinessContext = createContext({} as BusinessContextApi);

export const FormComponentStep1 = () => {
	const { disableStep, enableStep, onNext } = useContext(StepperForm.Context);
	const { stepsData, setStepsData } = useContext(BusinessContext);

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
			<Form>
				<Form.Fieldset>
					<Form.Checkbox
						id="disable1"
						name="disable-steps"
						label="Disable step 2"
						onChange={e => {
							if (e.target.checked) {
								disableStep('STEP2', 'Disabled cause');
							} else {
								enableStep('STEP2');
							}
						}}
					/>
					<Form.Checkbox
						id="disable2"
						name="disable-steps"
						label="Disable step 3"
						onChange={e => {
							if (e.target.checked) {
								disableStep('STEP3', 'Just because');
							} else {
								enableStep('STEP3');
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
					onNext={() => rhf.handleSubmit(onNext)()}
				/>
			</Form>
		</FormProvider>
	);
};

export const FormComponentStep2 = () => {
	const { disableStep, enableStep, onNext, onPrevious } = useContext(StepperForm.Context);
	const { stepsData, setStepsData } = useContext(BusinessContext);

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
			<Form>
				<Form.Fieldset>
					<Form.Checkbox
						id="disable1"
						name="disable-steps"
						label="Disable step 3"
						onChange={e => {
							if (e.target.checked) {
								disableStep('STEP3', 'Disabled cause');
							} else {
								enableStep('STEP3');
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
					onNext={() => rhf.handleSubmit(onNext)()}
					onPrevious={onPrevious}
				/>
			</Form>
		</FormProvider>
	);
};

export const FormComponentStep3 = () => {
	const { onNext, onPrevious } = useContext(StepperForm.Context);
	const { stepsData, setStepsData } = useContext(BusinessContext);

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
			<Form>
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
					onNext={() => rhf.handleSubmit(onNext)()}
					onPrevious={onPrevious}
				/>
			</Form>
		</FormProvider>
	);
};
