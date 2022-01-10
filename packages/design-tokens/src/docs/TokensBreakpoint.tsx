import React from 'react';

import { Token, TokenType } from '../types';
import { PropsWithToken, TokensProps } from './TokensTypes';

import TokensDefinitionList from './TokensDefinitionList';

import S from './Tokens.scss';

const TokensBreakpoint = ({ tokens }: TokensProps) => (
	<TokensDefinitionList tokens={tokens.filter((t: Token) => t.type === TokenType.BREAKPOINT)}>
		{({ token }: PropsWithToken) => (
			<div
				className={S.breakpoint}
				style={{
					width: token.value,
				}}
			/>
		)}
	</TokensDefinitionList>
);

export default TokensBreakpoint;
