import { useEffect, useState } from 'react';

export default function useCopyValue() {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (isCopied) {
			setTimeout(() => {
				setIsCopied(false);
			}, 5000);
		}
	}, [isCopied]);

	const copy = (value: string) => {
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(value)
				.then(() => {
					setIsCopied(true);
				})
				.catch(err => {
					// eslint-disable-next-line no-console
					console.error('Something went wrong', err);
				});
		}
	};

	return { copy, isCopied };
}
