import React from 'react';
import classnames from 'classnames';

import styles from './Card.module.scss';

function CardSpacing({ padding }: { padding: string }) {
	return (
		<div className={classnames(styles.previewBox, styles.previewBox__spacing)} style={{ padding }}>
			<div className={styles.previewBox__spacing_element}></div>
		</div>
	);
}

export default CardSpacing;
