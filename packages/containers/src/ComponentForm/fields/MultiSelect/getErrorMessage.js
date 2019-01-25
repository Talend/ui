/**
 * getErrors return a summary of unique errors inside array of string
 * @param {Object} props MultiSelect component props
 * @return {Map} of unique errors
 */
export default function getErrorMessage(props) {
	const errors = props.errors;
	if (!errors) {
		return undefined;
	}
	if (errors.length === 0) {
		return undefined;
	}
	const key = props.schema.key.join(',');
	const uniqErrors = Object.keys(errors).reduce((acc, errorKey) => {
		if (errorKey.startsWith(key)) {
			acc.set(errors[errorKey], true);
		}
		return acc;
	}, new Map());
	return Array.from(uniqErrors.keys()).join(', ');
}
