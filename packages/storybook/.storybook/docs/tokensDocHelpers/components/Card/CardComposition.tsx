import classnames from 'classnames';

import { SizedIcon } from '@talend/design-system';
import { ColorToken, GradientToken } from '../../../../../src/tokens/types';
import ColorChecker from '../../ColorChecker';

import styles from './Card.module.scss';

function CardComposition({
	backgroundColor,
	textColor,
	borderColor,
	iconColor,
	isActive = false,
	isHover = false,
}: {
	textColor: ColorToken;
	backgroundColor: ColorToken | GradientToken;
	borderColor: ColorToken;
	iconColor?: ColorToken;
	isActive?: boolean;
	isHover?: boolean;
}) {
	return (
		<div
			className={classnames(styles.previewBox, styles.previewBox__composition, {
				[styles.previewBox__composition__isActive]: isActive,
				[styles.previewBox__composition__isHover]: isHover,
			})}
			style={{
				background:
					backgroundColor?.type === 'gradient' ? backgroundColor.value : backgroundColor.hsla,
				borderColor: borderColor.hsla,
				color: textColor.hsla,
			}}
		>
			<p className={styles.previewBox__composition_copy}>
				<span style={{ color: iconColor?.hsla || textColor.hsla }}>
					<SizedIcon size="S" name="overview" />
				</span>
				{isHover && <span>On hover</span>}
				{isActive && <span>While clicked</span>}
				{!isHover && !isActive && <span>Lorem ipsum</span>}
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
