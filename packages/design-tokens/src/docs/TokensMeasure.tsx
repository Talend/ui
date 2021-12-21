import React from 'react';

import { Token, TokenType } from '../types';
import { PropsWithToken, TokensProps } from './TokensTypes';

import TokensDefinitionList from './TokensDefinitionList';

import S from './Tokens.scss';

const TokensMeasure = ({ tokens }: TokensProps) => (
	<TokensDefinitionList tokens={tokens.filter((t: Token) => t.type === TokenType.MEASURE)}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.measure}
				style={{
					width: token.value,
				}}
			/>
		)}
	</TokensDefinitionList>
);

export default TokensMeasure;
