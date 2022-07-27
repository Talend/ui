import React from 'react';

import { Token, TokenType } from '../../../src/tokens/types';
import { TokensProps } from './TokensTypes';
import DefinitionListOpacity from './components/DefinitionList/DefinitionListOpacity';
import { getDisplayName } from './TokenFormatter';

const order = ['s', 'm', 'l'];

const TokensOpacity = ({ tokens }: TokensProps) => (
	<DefinitionListOpacity
		tokens={tokens
			.filter((t: Token) => t.type === TokenType.OPACITY)
			.sort((tokenA: Token, tokenB: Token) => {
				const tokenAName = getDisplayName(tokenA.name).split('/')[1].toLowerCase();
				const tokenBName = getDisplayName(tokenB.name).split('/')[1].toLowerCase();
				return order.indexOf(tokenAName) - order.indexOf(tokenBName);
			})}
	/>
);

export default TokensOpacity;
