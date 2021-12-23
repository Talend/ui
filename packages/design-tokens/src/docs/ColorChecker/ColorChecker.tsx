import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import ColorContrastChecker from 'color-contrast-checker';

import { ColorToken } from '../../types';

import S from './ColorChecker.scss';

const ccc = new ColorContrastChecker();

const ColorChecker = ({ text, background }: { text: ColorToken; background: ColorToken }) => {
	const isLevelAA = ccc.isLevelAA(text?.hex, background?.hex, 14);
	return (
		<span className={`${S.colorChecker} ${isLevelAA ? S.colorCheckerOK : S.colorCheckerKO}`}>
			AA
		</span>
	);
};

export default ColorChecker;
