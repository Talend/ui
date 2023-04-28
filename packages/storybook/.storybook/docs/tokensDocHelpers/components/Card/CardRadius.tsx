import classnames from 'classnames';

import styles from './Card.module.scss';

function CardRadius({ value }: { value: string }) {
	return (
		<div
			className={classnames(styles.previewBox, styles.previewBox__radius)}
			style={{ borderRadius: value }}
		/>
	);
}

export default CardRadius;
