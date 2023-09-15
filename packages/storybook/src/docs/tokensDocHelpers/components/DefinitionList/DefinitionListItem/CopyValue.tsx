import { SizedIcon } from '@talend/design-system';
import classnames from 'classnames';

import styles from './CopyValue.module.scss';
import useCopyValue from './useCopyValue';

function CopyValue({ children }: { children: string }) {
	const { copy, isCopied } = useCopyValue();

	return (
		<button onClick={() => copy(children)} className={styles.copyButton}>
			<span className={styles.icons}>
				<span className={classnames(styles.copyIcon, { [styles.copyIcon_hidden]: isCopied })}>
					<SizedIcon size="S" name="copy" />
				</span>

				<span className={classnames(styles.validIcon, { [styles.validIcon_visible]: isCopied })}>
					<SizedIcon size="S" name="check-filled" />
				</span>
			</span>
			<span className={styles.copy}>{children}</span>
		</button>
	);
}

export default CopyValue;
