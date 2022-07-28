import React, { useCallback, useEffect, useState } from 'react';
import { Token } from '../../../../../../src/tokens/types';

import styles from './SizingScale.module.scss';
import { getScssName } from '../../../TokenFormatter';
import classnames from 'classnames';
import { SizedIcon, Tooltip } from '../../../../../../src';

function SizeBlock({ token }: { token: Token }) {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = useCallback(() => {
		if (navigator.clipboard) {
			navigator.clipboard
				.writeText(getScssName(token?.name))
				.then(() => {
					setIsCopied(true);
				})
				.catch(err => {
					// eslint-disable-next-line no-console
					console.log('Something went wrong', err);
				});
		}
	}, [getScssName(token?.name)]);

	useEffect(() => {
		if (isCopied) {
			setTimeout(() => {
				setIsCopied(false);
			}, 5000);
		}
	}, [isCopied]);

	return (
		<>
			<Tooltip
				placement="bottom"
				title={<span className={styles.sizingScale_tooltip}>Copy {getScssName(token?.name)}</span>}
			>
				<button
					onClick={handleCopy}
					className={styles.sizingScale_element}
					style={{ width: token.value, height: token.value }}
				>
					<span className={styles.icons}>
						<span className={classnames(styles.copyIcon, { [styles.copyIcon_hidden]: isCopied })}>
							<SizedIcon size={token.name === 'coralSizingMinimal' ? 'XS' : 'S'} name="copy" />
						</span>

						<span
							className={classnames(styles.validIcon, { [styles.validIcon_visible]: isCopied })}
						>
							<SizedIcon size={token.name === 'coralSizingMinimal' ? 'XS' : 'S'} name="check" />
						</span>
					</span>
				</button>
			</Tooltip>
		</>
	);
}

function SizingScale({ tokens }: { tokens: Token[] }) {
	return (
		<ul className={styles.sizingScale}>
			{tokens.map((token, index) => (
				<li key={`${token.name}-${index}`}>
					<SizeBlock token={token} />
				</li>
			))}
		</ul>
	);
}

export default SizingScale;
