import React from 'react';
import { Token } from '../../../../../../src/tokens/types';

import styles from './SizingScale.module.scss';
import { getScssName } from '../../../TokenFormatter';
import classnames from 'classnames';
import { SizedIcon, Tooltip } from '@talend/design-system';
import useCopyValue from '../DefinitionListItem/useCopyValue';

function SizeBlock({ token }: { token: Token }) {
	const { copy, isCopied } = useCopyValue();

	return (
		<>
			<Tooltip
				placement="bottom"
				title={<span className={styles.sizingScale_tooltip}>Copy {getScssName(token?.name)}</span>}
			>
				<button
					onClick={() => copy(getScssName(token?.name))}
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
