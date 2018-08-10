export default function twoDigits(number) {
	return number.toLocaleString(undefined, {
		minimumIntegerDigits: 2,
	});
}
