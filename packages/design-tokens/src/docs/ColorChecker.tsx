import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import ColorContrastChecker from 'color-contrast-checker';

import { ColorToken } from '../types';
import S from './Tokens.scss';

const ccc = new ColorContrastChecker();

const ColorChecker = ({ text, background }: { text: ColorToken; background: ColorToken }) => {
	const isLevelAA = React.useMemo(
		() => ccc.isLevelAA(text?.hex, background?.hex, 14),
		[text, background],
	);
	return (
		<span className={`${S.colorRatio} ${isLevelAA ? S.colorRatioOK : S.colorRatioKO}`}>AA</span>
	);
};

export default ColorChecker;
