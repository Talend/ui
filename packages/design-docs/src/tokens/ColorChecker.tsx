/* eslint-disable @talend/import-depth */
import ColorContrastChecker from 'color-contrast-checker';
import { Tag } from '@talend/design-system';

import { ColorToken } from '@talend/design-tokens/lib/types';

const ccc = new ColorContrastChecker();

const ColorChecker = ({ text, background }: { text: ColorToken; background: ColorToken }) => {
	const isLevelAA = ccc.isLevelAA(text?.hex, background?.hex, 14);
	return <Tag variant={isLevelAA ? 'success' : 'destructive'}>AA</Tag>;
};

export default ColorChecker;
