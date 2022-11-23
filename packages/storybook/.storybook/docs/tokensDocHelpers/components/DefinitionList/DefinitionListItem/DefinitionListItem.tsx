import React, { ReactElement } from 'react';
import { Token } from '../../../../../../src/tokens/types';
import styles from './DefinitionListItem.module.scss';
import TokenName from '../../../TokenName';
import { getCssName, getScssName } from '../../../TokenFormatter';
import CopyValue from './CopyValue';
import classnames from 'classnames';

function DefinitionListItem({ token, children }: { token: Token; children?: ReactElement }) {
	if (!token) {
		return null;
	}

	return (
		<div className={classnames(styles.listItem, { [styles.listItem__noCard]: !children })}>
			{children && <div className={styles.listItem__demo}>{children}</div>}

			<dl className={styles.listItem__description}>
				<dt className={styles.tokenName}>
					<TokenName token={token} />
				</dt>
				<dd className={styles.tokenDescription}>
					<p>{token?.description}</p>
				</dd>
			</dl>

			<div className={styles.listItem__values}>
				<CopyValue>{getScssName(token?.name)}</CopyValue>
				<code>{getCssName(token)}</code>
				<code>{token?.value}</code>
			</div>
		</div>
	);
}

export default DefinitionListItem;
