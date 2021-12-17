import React from 'react';
import { PropsWithToken, TokensProps } from './TokensTypes';
import TokensDefinitionList from './TokensDefinitionList';
import S from './Tokens.scss';

const ElevationTokens = ({ tokens, filter }: TokensProps) => (
	<TokensDefinitionList filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.elevation}
				style={{
					boxShadow: `${token.value}px ${token.value}px 0 0`,
					zIndex: token.value,
				}}
			/>
		)}
	</TokensDefinitionList>
);

export default ElevationTokens;
