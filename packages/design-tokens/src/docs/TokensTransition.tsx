import React from 'react';

import { Token, TokenType } from '../types';
import { PropsWithToken, TokensProps } from './TokensTypes';

import TokensDefinitionList from './TokensDefinitionList';

import S from './Tokens.scss';

const TokensTransition = ({ tokens }: TokensProps) => (
	<TokensDefinitionList tokens={tokens.filter((t: Token) => t.type === TokenType.TRANSITION)}>
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
