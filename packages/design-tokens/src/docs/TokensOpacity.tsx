import React from 'react';

import { Token, TokenType } from '../types';
import { PropsWithToken, TokensProps } from './TokensTypes';

import TokensDefinitionList from './TokensDefinitionList';

import S from './Tokens.scss';

const TokensOpacity = ({ tokens }: TokensProps) => (
	<TokensDefinitionList tokens={tokens.filter((t: Token) => t.type === TokenType.OPACITY)}>
		{({ token }: PropsWithToken) => (
			<div className={S.opacity}>
				<div
					className={S.opacityLayer}
					style={{
						opacity: token.value,
					}}
				/>
			</div>
		)}
	</TokensDefinitionList>
);

export default TokensOpacity;
