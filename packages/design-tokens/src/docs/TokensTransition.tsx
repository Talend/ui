import React from 'react';
import { PropsWithToken, TokensProps } from './TokensTypes';
import TokensDefinitionList from './TokensDefinitionList';
import S from './Tokens.scss';

const TokensTransition = ({ tokens, filter }: TokensProps) => (
	<TokensDefinitionList filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.transition}
				style={{
					transition: token.value,
				}}
			/>
		)}
	</TokensDefinitionList>
);

export default TokensTransition;
