import React from 'react';

import { Token, TokenType } from '../types';
import { PropsWithToken, TokensProps } from './TokensTypes';

import TokensDefinitionList from './TokensDefinitionList';

import S from './Tokens.scss';

const BrandingTokens = ({ tokens }: TokensProps) => (
	<TokensDefinitionList tokens={tokens.filter((t: Token) => t.type === TokenType.BRANDING)}>
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
