import React from 'react';
import { ColorToken, Token } from '../../../../types';
import styles from './DefinitionListItem.module.scss';
import TokenName from '../../../TokenName';
import { getCssName, getScssName } from '../../../TokenFormatter';
import CardColor from '../../Card/CardColor';
import CopyValue from './CopyValue';

function DefinitionListItemColor({ token }: { token: Token }) {
	if (!token) {
		return null;
	}

	return (
		<div className={styles.listItem}>
			<dd className={styles.listItem__demo}>
				<CardColor color={token.value} />
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
				<code>{'hex' in token ? (token as ColorToken)?.hex : token?.value}</code>
			</dd>
		</div>
	);
}

export default DefinitionListItemColor;
