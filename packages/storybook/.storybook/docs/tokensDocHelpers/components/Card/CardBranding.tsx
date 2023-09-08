import classnames from 'classnames';

import styles from './Card.module.scss';

function CardBranding({ value }: { value: string }) {
	return (
		<div
			className={classnames(styles.previewBox, styles.previewBox__branding)}
			style={{ backgroundImage: value }}
		/>
	);
}

export default CardBranding;
