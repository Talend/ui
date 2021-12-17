import React from 'react';
import { PropsWithToken, TokensProps } from './TokensTypes';
import TokensDefinitionList from './TokensDefinitionList';
import S from './Tokens.scss';

const TokensOpacity = ({ tokens, filter }: TokensProps) => (
	<TokensDefinitionList filter={filter} tokens={tokens}>
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
