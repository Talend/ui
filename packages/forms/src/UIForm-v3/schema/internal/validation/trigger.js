import { serializeKey } from '../key';

export default function triggerRules(eventsProps, schema, rhf) {
	const key = serializeKey(schema);

	return () => {
		const { errors } = rhf;
		const { onBlur } = eventsProps;

		// there is a blur trigger (in progress or finished)
		// if it returns a new error state, it must be taken into account in the trigger errors
		if (onBlur && onBlur.validationPromise) {
			return onBlur.validationPromise;
		}

		// trigger validation is only managed by triggers
		// if we have a trigger error, we keep it, until a new trigger removes it
		if (errors[key] && errors[key].type === 'trigger') {
			return errors[key].message;
		}
		return null;
	};
}
