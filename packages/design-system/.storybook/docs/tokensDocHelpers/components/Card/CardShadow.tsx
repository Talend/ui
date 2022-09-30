import React from 'react';
import classnames from 'classnames';

import styles from './Card.module.scss';

function CardShadow({ shadow }: { shadow: string }) {
	return (
		<div
			className={classnames(styles.previewBox, styles.previewBox__shadow)}
			style={{ boxShadow: shadow }}
		/>
	);
}

export default CardShadow;
