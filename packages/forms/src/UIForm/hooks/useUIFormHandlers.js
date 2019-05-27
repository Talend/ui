import useErrorsHandler from './useErrorHandler';
import useChangeHandler from './useChangeHandler';
import useTriggerHandler from './useTriggerHandler';
import useFinishHandler from './useFinishHandler';
import useResetHandler from './useResetHandler';
import useSubmitHandler from './useSubmitHandler';

export default function useUIFormHandlers({
	customValidation,
	formRef,
	id,
	onErrors,
	moz,
	onChange,
	onReset,
	onSubmit,
	onTrigger,
	uiForm,
}) {
	const handleErrors = useErrorsHandler({ formRef, onErrors, uiForm });
	const { handleNewProperties, handleChange } = useChangeHandler({ onChange, uiForm });
	const handleTrigger = useTriggerHandler({
		handleErrors,
		handleNewProperties,
		moz,
		onTrigger,
		uiForm,
	});
	const handleReset = useResetHandler({ uiForm, onReset });
	const handleSubmit = useSubmitHandler({
		customValidation,
		handleErrors,
		moz,
		onSubmit,
		uiForm,
	});

	const handleFinish = useFinishHandler({
		customValidation,
		handleErrors,
		handleTrigger,
		id,
		moz,
		uiForm,
	});

	return {
		handleErrors,
		handleChange,
		handleTrigger,
		handleFinish,
		handleReset,
		handleSubmit,
	};
}
