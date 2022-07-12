import React from 'react';
import classnames from 'classnames';

import styles from './Card.module.scss';

function CardColor({ color }: { color: string }) {
	return (
		<div
			className={classnames(styles.previewBox, styles.previewBox__color)}
			style={{ backgroundColor: color }}
		/>
	);
}

export default CardColor;
