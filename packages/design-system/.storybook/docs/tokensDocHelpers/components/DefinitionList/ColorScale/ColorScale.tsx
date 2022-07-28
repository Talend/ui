import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { ColorToken, Token } from '../../../../../../src/tokens/types';
import { getScssName } from '../../../TokenFormatter';
import { SizedIcon, Tooltip } from '../../../../../../src';

import styles from './ColorScale.module.scss';

function ColorBlock({ token }: { token: Token }) {
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
				title={<span className={styles.colorScale_tooltip}>Copy {getScssName(token?.name)}</span>}
			>
				<button
					onClick={handleCopy}
					className={styles.colorScale_element}
					style={{ backgroundColor: token.value }}
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

function ColorScale({ tokens }: { tokens: ColorToken[] }) {
	return (
		<ul className={styles.colorScale}>
			{tokens.map((token, index) => (
				<li key={`${token.name}-${index}`}>
					<ColorBlock token={token} />
				</li>
			))}
		</ul>
	);
}

export default ColorScale;
