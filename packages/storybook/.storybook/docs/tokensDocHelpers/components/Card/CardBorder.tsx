import classnames from 'classnames';
import tokens from '@talend/design-tokens';

import styles from './Card.module.scss';

function CardBorder({ borderStyle }: { borderStyle: string }) {
	return (
		<div
			className={classnames(styles.previewBox, styles.previewBox__border)}
			style={{ border: `${borderStyle} ${tokens.coralColorAccentBorder}` }}
		/>
	);
}

export default CardBorder;
