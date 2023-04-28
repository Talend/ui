import ColorContrastChecker from 'color-contrast-checker';
import { Tag } from '@talend/design-system';

import { ColorToken, GradientToken } from '../../../../src/tokens/types';

const ccc = new ColorContrastChecker();

const ColorChecker = ({
	text,
	background,
}: {
	text: ColorToken;
	background: ColorToken | GradientToken;
}) => {
	if (background.type === 'gradient') {
		return <Tag variant="default">N/A</Tag>;
	}
	const isLevelAA = ccc.isLevelAA(text?.hex, background?.hex, 14);
	return <Tag variant={isLevelAA ? 'success' : 'destructive'}>AA</Tag>;
};

export default ColorChecker;
