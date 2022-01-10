import React from 'react';
import { ColorToken, Token } from '../types';
import { getCssName, getScssName } from './TokenFormatter';
import TokenName from './TokenName';

import S from './Tokens.scss';

type ColorDescriptionProps = React.HTMLAttributes<HTMLDivElement> & {
	token: Token;
};

const TokensDefinitionListItem = ({ token, children, ...rest }: ColorDescriptionProps) =>
	token ? (
		<div className={S.token} {...rest}>
			<dt className={S.tokenName}>
				<TokenName token={token} />
			</dt>
			<dd className={S.tokenDescription}>
				<p>{token?.description}</p>
			</dd>
			{children && (
				<dd className={S.tokenValueDemo}>
					{typeof children === 'function' ? children({ token }) : children}
				</dd>
			)}
			<dd className={S.tokenValue}>
				<code>{getScssName(token?.name)}</code>
				<code>{getCssName(token?.name)}</code>
				<code>{'hex' in token ? (token as ColorToken)?.hex : token?.value}</code>
			</dd>
		</div>
	) : (
		<div />
	);

export default TokensDefinitionListItem;
