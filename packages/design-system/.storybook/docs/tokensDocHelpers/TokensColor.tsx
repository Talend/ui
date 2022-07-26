import React from 'react';

import { ColorToken, Token, TokenType } from '../../../src/tokens/types';
import { TokensProps } from './TokensTypes';
import { getDisplayName } from './TokenFormatter';
import DefinitionListColors from './components/DefinitionList/DefinitionListColors';

const colorOrder = [
	'neutral',
	'accent',
	'success',
	'warning',
	'danger',
	'beta',
	'assistive',
	'branding',
	'charts',
];

const TokensColor = ({ tokens }: TokensProps) => (
	<DefinitionListColors
		tokens={tokens
			.filter((t: Token) => t.type === TokenType.COLOR)
			.sort((tokenA: ColorToken, tokenB: ColorToken) => {
				const tokenAColor = getDisplayName(tokenA.name).split('/')[0];
				const tokenBColor = getDisplayName(tokenB.name).split('/')[0];
				return colorOrder.indexOf(tokenAColor) - colorOrder.indexOf(tokenBColor);
			})}
	/>
);

export default TokensColor;
