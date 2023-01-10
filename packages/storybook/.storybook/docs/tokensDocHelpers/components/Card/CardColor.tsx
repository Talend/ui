import React from 'react';
import classnames from 'classnames';

import styles from './Card.module.scss';

function CardColor({ color }: { color: string }) {
	const isGradient = color.includes('gradient');
	return (
		<div
			className={classnames(styles.previewBox, styles.previewBox__color)}
			style={{ [isGradient ? 'background' : 'backgroundColor']: color }}
		/>
	);
}

export default CardColor;
