import React from 'react';
import { ColorToken, Token } from '../types';
import S from './Tokens.scss';
import { getCssName, getScssName, getDisplayName } from './TokenFormatter';

type ColorDescriptionProps = React.HTMLAttributes<HTMLDListElement> & {
	token: Token;
};

const ColorDescription = ({ token, children, ...rest }: ColorDescriptionProps) =>
	token ? (
		<dl className={S.tokens} {...rest}>
			<div className={S.token}>
				<dt className={S.tokenKey}>{getDisplayName(token?.name)}</dt>
				{children && (
					<dd className={S.tokenValueDemo}>
						{typeof children === 'function' ? children({ token }) : children}
					</dd>
				)}
				<dd className={S.tokenValueCustomProperty}>
					<code>{getScssName(token?.name)}</code>
				</dd>
				<dd className={S.tokenValueCustomProperty}>
					<code>{getCssName(token?.name)}</code>
				</dd>
				<dd className={S.tokenValueCss}>
					<code>{'hex' in token ? (token as ColorToken)?.hex : token?.value}</code>
				</dd>
			</div>
		</dl>
	) : (
		<div />
	);

export default ColorDescription;
