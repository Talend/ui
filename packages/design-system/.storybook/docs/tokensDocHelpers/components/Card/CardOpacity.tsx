import React from 'react';
import classnames from 'classnames';

import styles from './Card.module.scss';

function CardOpacity({ opacity }: { opacity: string }) {
	return (
		<div className={classnames(styles.previewBox, styles.previewBox__opacity)}>
			<div className={styles.previewBox__opacity_overlay} style={{ opacity }} />
			<p>🐠</p>
		</div>
	);
}

export default CardOpacity;
