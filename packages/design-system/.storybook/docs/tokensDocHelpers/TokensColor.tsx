import React from 'react';

import { ColorToken, Token, TokenType } from '../../../src/tokens/types';
import { PropsWithToken, TokensProps } from './TokensTypes';

import TokensDefinitionList from './TokensDefinitionList';
import { getDisplayName } from './TokenFormatter';
import CardColor from './components/Card/CardColor';
import DefinitionListItemColor from './components/DefinitionList/DefinitionListItem/DefinitionListItemColor';

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
	<>
		<DefinitionListItemColor token={tokens[0]} />
		<TokensDefinitionList
			tokens={tokens
				.filter((t: Token) => t.type === TokenType.COLOR)
				.sort((tokenA: ColorToken, tokenB: ColorToken) => {
					const tokenAColor = getDisplayName(tokenA.name).split('/')[0];
					const tokenBColor = getDisplayName(tokenB.name).split('/')[0];
					return colorOrder.indexOf(tokenAColor) - colorOrder.indexOf(tokenBColor);
				})}
		>
			{({ token }: PropsWithToken) => <CardColor color={token.value} />}
		</TokensDefinitionList>
	</>
);

export default TokensColor;
