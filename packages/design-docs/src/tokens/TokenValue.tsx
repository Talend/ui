/* eslint-disable @talend/import-depth */
import { ReactNode, useState } from 'react';
import {
	SizedIcon,
	StackVertical,
	StackHorizontal,
	ButtonTertiary,
	Tooltip,
} from '@talend/design-system';
import tokens from '@talend/design-tokens';
import dictionary from '@talend/design-tokens/lib/light/dictionary';
import * as utils from './TokenFormatter';
import theme from './TokenValue.module.scss';
import { Unstyled } from '@storybook/blocks';

type TokenValueProps = {
	children: string;
	lang?: string;
};

export function copy(svalue: string) {
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
			style={{ border: 'none', background: 'none', textAlign: 'start' }}
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
	sortOnValue?: boolean;
};

function compareTokensByValue(a: any, b: any) {
	return a.value
		.replace('rem', '')
		.localeCompare(b.value.replace('rem', ''), undefined, { numeric: true });
}

export function TokenList({
	categories,
	category,
	style,
	type,
	sortOnValue,
	children,
}: TokenListProps) {
	const [search, setSearch] = useState(category);
	const safeCategories = categories || [];
	const filtered = dictionary.filter(t => {
		const sameType = t.type === type;
		const sameCategory = search ? utils.getDisplayName(t.name).split('/')[0] === search : true;
		return sameType && sameCategory;
	});
	if (sortOnValue) {
		filtered.sort(compareTokensByValue);
	}
	return (
		<StackVertical gap="S">
			<StackHorizontal gap="M">
				{safeCategories.map(categ => (
					<ButtonTertiary key={categ} onClick={() => setSearch(categ)} disabled={categ === search}>
						{categ}
					</ButtonTertiary>
				))}
			</StackHorizontal>
			<StackVertical gap="M">
				{filtered.map(token => (
					<StackHorizontal gap="M" align="center" key={token.name}>
						<Unstyled>
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
						</Unstyled>
						<div style={{ width: tokens.coralSizingXxxl, font: tokens.coralParagraphSBold }}>
							<Tooltip title={token.description}>
								<span>{utils.getDisplayName(token.name)}</span>
							</Tooltip>
						</div>
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
		</StackVertical>
	);
}
