/* eslint-disable @talend/import-depth */
import { ReactNode, useState } from 'react';
import { SizedIcon, StackVertical, StackHorizontal, ButtonTertiary } from '@talend/design-system';
import tokens from '@talend/design-tokens';
import dictionary from '@talend/design-tokens/lib/light/dictionary';
import * as utils from './TokenFormatter';
import theme from './TokenValue.module.scss';

type TokenValueProps = {
	children: string;
	lang?: string;
};

function copy(svalue: string) {
	let value = svalue;
	if (Array.isArray(svalue)) {
		value = svalue.join('');
	}

	if (navigator.clipboard) {
		navigator.clipboard.writeText(value);
	}
}

export function TokenValue({ children, lang }: TokenValueProps) {
	return (
		<button
			className={theme.btn}
			style={{ border: 'none', background: 'none' }}
			onClick={() => copy(children)}
		>
			<span className={theme.lang}>{lang}</span>
			<span>{children}</span>
			<SizedIcon size="S" name="copy" />
		</button>
	);
}

type TokenListProps = {
	style: (token: any) => React.CSSProperties;
	type: string;
	children: string | ((token: any) => ReactNode);
	category?: string;
	categories?: string[];
};

export function TokenList({ categories, category, style, type, children }: TokenListProps) {
	const [search, setSearch] = useState(category);
	const safeCategories = categories || [];
	return (
		<>
			<div>
				{safeCategories.map(categ => (
					<ButtonTertiary key={categ} onClick={() => setSearch(categ)} disabled={categ === search}>
						{categ}
					</ButtonTertiary>
				))}
			</div>
			<StackVertical gap="M">
				{dictionary
					.filter(t => {
						const sameType = t.type === type;
						const sameCategory = search
							? utils.getDisplayName(t.name).split('/')[0] === search
							: true;
						return sameType && sameCategory;
					})
					.map(token => (
						<StackHorizontal gap="M" align="stretch" key={token.name}>
							<div
								style={{
									minHeight: '8rem',
									width: 200,
									verticalAlign: 'middle',
									border: '1px solid #ccc',
									borderRadius: tokens.coralRadiusM,
									boxShadow: tokens.coralElevationShadowNeutralM,
									padding: tokens.coralSpacingS,
									...style(token),
								}}
							>
								{typeof children === 'function' ? children(token) : children}
							</div>
							<dl style={{ margin: 0 }}>
								<dt>{utils.getDisplayName(token.name)}</dt>
								<dd style={{ width: 300 }}>{token.description}</dd>
							</dl>
							<ul style={{ listStyleType: 'none' }}>
								<li>
									<TokenValue lang="SCSS">{utils.getScssName(token.name)}</TokenValue>
								</li>
								<li>
									<TokenValue lang="CSS">{utils.getCssName(token)}</TokenValue>
								</li>
								<li>
									<TokenValue lang="JS">{`tokens.${token.name}`}</TokenValue>
								</li>
							</ul>
						</StackHorizontal>
					))}
			</StackVertical>
		</>
	);
}
