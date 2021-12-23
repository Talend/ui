import React from 'react';

import { Token, TokenType } from '../types';
import { PropsWithToken, TokensProps } from './TokensTypes';

import TokensDefinitionList from './TokensDefinitionList';

import S from './Tokens.scss';

const BorderTokens = ({ tokens }: TokensProps) => (
	<TokensDefinitionList tokens={tokens.filter((t: Token) => t.type === TokenType.BORDER)}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.border}
				style={{
					border: token.value,
				}}
			/>
		)}
	</TokensDefinitionList>
);

export default BorderTokens;
