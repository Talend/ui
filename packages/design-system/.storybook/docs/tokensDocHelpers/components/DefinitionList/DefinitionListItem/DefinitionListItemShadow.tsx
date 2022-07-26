import React from 'react';
import { Token } from '../../../../../../src/tokens/types';
import styles from './DefinitionListItem.module.scss';
import TokenName from '../../../TokenName';
import { getCssName, getScssName } from '../../../TokenFormatter';
import CardShadow from '../../Card/CardShadow';
import CopyValue from './CopyValue';

function DefinitionListItemShadow({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return (
		<div className={styles.listItem}>
			<dd className={styles.listItem__demo}>
				<CardShadow shadow={token.value} />
			</dd>

			<div className={styles.listItem__description}>
				<dt className={styles.tokenName}>
					<TokenName token={token} />
				</dt>
				<dd className={styles.tokenDescription}>
					<p>{token?.description}</p>
				</dd>
			</div>

			<dd className={styles.listItem__values}>
				<CopyValue>{getScssName(token?.name)}</CopyValue>
				<code>{getCssName(token)}</code>
				<code>{token?.value}</code>
			</dd>
		</div>
	);
}

export default DefinitionListItemShadow;
