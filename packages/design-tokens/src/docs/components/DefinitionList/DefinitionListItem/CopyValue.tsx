import React, { useCallback, useEffect, useState } from 'react';
import { SizedIcon } from '@talend/design-system';

import styles from './CopyValue.module.scss';

function CopyValue({ children }: { children: string }) {
	const [isCopied, setIsCopied] = useState(false);
	const handleCopy = useCallback(() => {
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(children)
				.then(() => {
					setIsCopied(true);
				})
				.catch(err => {
					// eslint-disable-next-line no-console
					console.log('Something went wrong', err);
				});
		}
	}, [children]);

	useEffect(() => {
		if (isCopied) {
			setTimeout(() => {
				setIsCopied(false);
			}, 7000);
		}
	}, [isCopied]);

	return (
		<button onClick={handleCopy} className={styles.copyButton}>
			<SizedIcon size="S" name="copy" /> {children}{' '}
			{isCopied && (
				<span className={styles.validIcon}>
					<SizedIcon size="S" name="check-filled" />
				</span>
			)}
		</button>
	);
}

export default CopyValue;
