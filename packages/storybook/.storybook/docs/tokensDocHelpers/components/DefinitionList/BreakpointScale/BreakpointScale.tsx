import React, { useRef } from 'react';
import classnames from 'classnames';
import { useOverflow } from 'use-overflow';

import { ColorToken, Token } from '../../../../../../src/tokens/types';
import { getScssName } from '../../../TokenFormatter';
import { SizedIcon, Tooltip } from '@talend/design-system';

import styles from './BreakpointScale.module.scss';
import useCopyValue from '../DefinitionListItem/useCopyValue';

function BreakpointBlock({ token }: { token: Token }) {
	const { copy, isCopied } = useCopyValue();
	const horizontalRef = useRef(null);
	const { refXOverflowing, refXScrollBegin, refXScrollEnd } = useOverflow(horizontalRef);

	return (
		<>
			<Tooltip
				placement="bottom-start"
				title={
					<span className={styles.breakpointScale_tooltip}>Copy {getScssName(token?.name)}</span>
				}
			>
				<button
					onClick={() => copy(getScssName(token?.name))}
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
