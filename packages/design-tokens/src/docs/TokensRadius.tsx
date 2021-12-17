import React from 'react';
import { PropsWithToken, TokensProps } from './TokensTypes';
import TokensDefinitionList from './TokensDefinitionList';
import S from './Tokens.scss';

const RadiusTokens = ({ tokens, filter }: TokensProps) => (
	<TokensDefinitionList filter={filter} tokens={tokens}>
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
