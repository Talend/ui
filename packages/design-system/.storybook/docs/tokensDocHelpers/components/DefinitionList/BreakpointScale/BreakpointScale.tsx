import React, { useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useOverflow } from 'use-overflow';

import { ColorToken, Token } from '../../../../../../src/tokens/types';
import { getScssName } from '../../../TokenFormatter';
import { SizedIcon, Tooltip } from '../../../../../../src';

import styles from './BreakpointScale.module.scss';

function BreakpointBlock({ token }: { token: Token }) {
	const [isCopied, setIsCopied] = useState(false);
	const horizontalRef = useRef(null);
	const { refXOverflowing, refXScrollBegin, refXScrollEnd } = useOverflow(horizontalRef);
	console.log({ refXOverflowing, refXScrollBegin, refXScrollEnd });

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
				placement="bottom-start"
				title={
					<span className={styles.breakpointScale_tooltip}>Copy {getScssName(token?.name)}</span>
				}
			>
				<button
					onClick={handleCopy}
					className={classnames(styles.breakpointScale_element, {
						[styles.breakpointScale_element__overflowRight]: refXOverflowing && !refXScrollEnd,
						[styles.breakpointScale_element__overflowLeft]: refXOverflowing && !refXScrollBegin,
					})}
					ref={horizontalRef}
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
					<hr className={styles.line} style={{ width: token.value }} />
				</button>
			</Tooltip>
		</>
	);
}

function BreakPointScale({ tokens }: { tokens: ColorToken[] }) {
	return (
		<ul className={styles.breakpointScale}>
			{tokens.map((token, index) => (
				<li key={`${token.name}-${index}`}>
					<BreakpointBlock token={token} />
				</li>
			))}
		</ul>
	);
}

export default BreakPointScale;
