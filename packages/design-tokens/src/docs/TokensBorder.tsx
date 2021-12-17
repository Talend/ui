import React from 'react';
import { PropsWithToken, TokensProps } from './TokensTypes';
import TokensDefinitionList from './TokensDefinitionList';
import S from './Tokens.scss';

const BorderTokens = ({ tokens, filter }: TokensProps) => (
	<TokensDefinitionList filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<hr
				className={S.border}
				style={{
					borderBottom: token.value,
				}}
			/>
		)}
	</TokensDefinitionList>
);

export default BorderTokens;
