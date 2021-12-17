import React from 'react';
import { PropsWithToken, TokensProps } from './TokensTypes';
import TokensDefinitionList from './TokensDefinitionList';
import S from './Tokens.scss';

const TokensGradient = ({ tokens, filter }: TokensProps) => (
	<TokensDefinitionList filter={filter} tokens={tokens}>
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
