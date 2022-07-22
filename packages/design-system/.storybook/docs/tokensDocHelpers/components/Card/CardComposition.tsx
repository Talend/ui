import React from 'react';
import classnames from 'classnames';

import { SizedIcon } from '../../../../../src';
import { ColorToken } from '../../../../../src/tokens/types';
import ColorChecker from '../../ColorChecker';

import styles from './Card.module.scss';

function CardComposition({
	backgroundColor,
	textColor,
	borderColor,
	iconColor,
}: {
	textColor: ColorToken;
	backgroundColor: ColorToken;
	borderColor: ColorToken;
	iconColor?: ColorToken;
}) {
	return (
		<div
			className={classnames(styles.previewBox, styles.previewBox__composition)}
			style={{
				backgroundColor: backgroundColor.hsla,
				borderColor: borderColor.hsla,
				color: textColor.hsla,
			}}
		>
			<p className={styles.previewBox__composition_copy}>
				<span style={{ color: iconColor?.hsla || textColor.hsla }}>
					<SizedIcon size="S" name="overview" />
				</span>
				<span>Lorem ipsum</span>
			</p>
			{textColor && backgroundColor && (
				<span className={styles.previewBox__composition_checker}>
					<ColorChecker text={textColor} background={backgroundColor} />
				</span>
			)}
		</div>
	);
}

export default CardComposition;
