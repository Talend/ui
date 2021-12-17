import React from 'react';
import { PropsWithToken, TokensProps } from './TokensTypes';
import TokensDefinitionList from './TokensDefinitionList';
import S from './Tokens.scss';

const TokensBreakpoint = ({ tokens, filter }: TokensProps) => (
	<TokensDefinitionList filter={filter} tokens={tokens}>
		{({ token }: PropsWithToken) => (
			<hr
				className={S.breakpoint}
				style={{
					width: token.value,
				}}
			/>
		)}
	</TokensDefinitionList>
);

export default TokensBreakpoint;
