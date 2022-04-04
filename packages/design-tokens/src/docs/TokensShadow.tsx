import React from 'react';

import { Token, TokenType } from '../types';
import { PropsWithToken, TokensProps } from './TokensTypes';

import TokensDefinitionList from './TokensDefinitionList';

import S from './Tokens.scss';

const TokensShadow = ({ tokens }: TokensProps) => (
	<TokensDefinitionList tokens={tokens.filter((t: Token) => t.type === TokenType.SHADOW)}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.shadow}
				style={{
					boxShadow: token.value,
				}}
			/>
		)}
	</TokensDefinitionList>
);

export default TokensShadow;
