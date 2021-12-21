import React from 'react';

import { Token, TokenType } from '../types';
import { PropsWithToken, TokensProps } from './TokensTypes';

import TokensDefinitionList from './TokensDefinitionList';

import S from './Tokens.scss';

const TokensGradient = ({ tokens }: TokensProps) => (
	<TokensDefinitionList tokens={tokens.filter((t: Token) => t.type === TokenType.GRADIENT)}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.gradient}
				style={{
					background: token.value,
				}}
			/>
		)}
	</TokensDefinitionList>
);

export default TokensGradient;
