import React from 'react';

import { Token, TokenType } from '../types';
import { PropsWithToken, TokensProps } from './TokensTypes';

import TokensDefinitionList from './TokensDefinitionList';

import S from './Tokens.scss';

const TokensColor = ({ tokens }: TokensProps) => (
	<TokensDefinitionList tokens={tokens.filter((t: Token) => t.type === TokenType.COLOR)}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.color}
				style={{
					background: token.value,
				}}
			/>
		)}
	</TokensDefinitionList>
);

export default TokensColor;
