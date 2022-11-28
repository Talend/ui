import React from 'react';

import { Token, TokenType } from '../../../src/tokens/types';
import { TokensProps } from './TokensTypes';
import DefinitionListRadius from './components/DefinitionList/DefinitionListRadius';
import { getDisplayName } from './TokenFormatter';

const order = ['s', 'm', 'l', 'round'];

const RadiusTokens = ({ tokens }: TokensProps) => {
	return (
		<DefinitionListRadius
			tokens={tokens
				.filter((t: Token) => t.type === TokenType.RADIUS)
				.sort((tokenA: Token, tokenB: Token) => {
					const tokenAName = getDisplayName(tokenA.name).split('/')[1].toLowerCase();
					const tokenBName = getDisplayName(tokenB.name).split('/')[1].toLowerCase();
					return order.indexOf(tokenAName) - order.indexOf(tokenBName);
				})}
		/>
	);
};

export default RadiusTokens;
