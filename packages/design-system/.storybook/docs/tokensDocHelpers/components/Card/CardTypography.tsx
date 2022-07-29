import React from 'react';
import classnames from 'classnames';

import styles from './Card.module.scss';

function CardTypography({ font }: { font: string }) {
	return (
		<div className={classnames(styles.previewBox, styles.previewBox__typography)}>
			<p style={{ font: font }}>The quick brown dog jumps over the lazy fox</p>
		</div>
	);
}

export default CardTypography;
