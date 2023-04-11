import classnames from 'classnames';

import styles from './Card.module.scss';

function CardTransition({ transition }: { transition: string }) {
	return (
		<div
			className={classnames(styles.previewBox, styles.previewBox__transition)}
			style={{ transition: `all ${transition}` }}
		>
			<p style={{ transition: `transform ${transition}` }}>🐠</p>
		</div>
	);
}

export default CardTransition;
