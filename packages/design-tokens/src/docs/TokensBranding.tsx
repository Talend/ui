import React from 'react';
import { PropsWithToken, TokensProps } from './TokensTypes';
import TokensDefinitionList from './TokensDefinitionList';
import S from './Tokens.scss';

const BrandingTokens = ({ tokens, filter }: TokensProps) => (
	<TokensDefinitionList filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.branding}
				style={{
					backgroundImage: token.value,
				}}
			/>
		)}
	</TokensDefinitionList>
);
export default BrandingTokens;
