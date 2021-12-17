import React from 'react';
import { PropsWithToken, TokensProps } from './TokensTypes';
import TokensDefinitionList from './TokensDefinitionList';
import S from './Tokens.scss';

const TokensMeasure = ({ tokens, filter }: TokensProps) => (
	<TokensDefinitionList filter={filter} tokens={tokens}>
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
