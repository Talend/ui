import React from 'react';

import { Token, TokenType } from '../types';
import { PropsWithToken, TokensProps } from './TokensTypes';

import TokensDefinitionList from './TokensDefinitionList';

const TokensTypography = ({ tokens }: TokensProps) => (
	<TokensDefinitionList tokens={tokens.filter((t: Token) => t.type === TokenType.TYPOGRAPHY)}>
		{({ token }: PropsWithToken) => (
			<div
				style={{
					font: token.value,
				}}
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			</div>
		)}
	</TokensDefinitionList>
);

export default TokensTypography;
