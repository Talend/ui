import React from 'react';

import { Token, TokenType } from '../types';
import { PropsWithToken, TokensProps } from './TokensTypes';

import TokensDefinitionList from './TokensDefinitionList';

import S from './Tokens.scss';

const RadiusTokens = ({ tokens }: TokensProps) => (
	<TokensDefinitionList tokens={tokens.filter((t: Token) => t.type === TokenType.RADIUS)}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.radius}
				style={{
					borderRadius: token.value,
				}}
			/>
		)}
	</TokensDefinitionList>
);

export default RadiusTokens;
