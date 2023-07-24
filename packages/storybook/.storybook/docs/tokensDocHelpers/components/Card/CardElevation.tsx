import classnames from 'classnames';
import tokens from '@talend/design-tokens';

import styles from './Card.module.scss';

function CardElevation({ elevation }: { elevation: string }) {
	return (
		<div
			className={classnames(styles.previewBox, styles.previewBox__elevation)}
			style={{
				boxShadow: `${elevation !== '0' ? tokens.coralSpacingXs : 0} ${elevation}px 0 ${
					tokens.coralColorAccentBackgroundStrong
				}`,
			}}
		/>
	);
}

export default CardElevation;
