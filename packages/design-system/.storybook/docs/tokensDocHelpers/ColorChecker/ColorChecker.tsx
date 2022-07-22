import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import ColorContrastChecker from 'color-contrast-checker';
import { Tag } from '../../../../src';

import { ColorToken } from '../../../../src/tokens/types';

const ccc = new ColorContrastChecker();

const ColorChecker = ({ text, background }: { text: ColorToken; background: ColorToken }) => {
	const isLevelAA = ccc.isLevelAA(text?.hex, background?.hex, 14);
	return <Tag variant={isLevelAA ? 'success' : 'destructive'}>AA</Tag>;
};

export default ColorChecker;
