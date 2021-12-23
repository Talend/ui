import React from 'react';

import { Token, TokenType } from '../types';
import { PropsWithToken, TokensProps } from './TokensTypes';

import TokensDefinitionList from './TokensDefinitionList';

import S from './Tokens.scss';

const ElevationTokens = ({ tokens }: TokensProps) => (
	<TokensDefinitionList tokens={tokens.filter((t: Token) => t.type === TokenType.ELEVATION)}>
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
