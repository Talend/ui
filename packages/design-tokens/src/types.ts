export enum TokenType {
	BORDER = 'border',
	BRANDING = 'branding',
	BREAKPOINT = 'breakpoint',
	COLOR = 'color',
	GRADIENT = 'gradient',
	MEASURE = 'measure',
	OPACITY = 'opacity',
	RADIUS = 'radius',
	SHADOW = 'shadow',
	TYPOGRAPHY = 'typography',
}

export interface Token {
	name: string;
	type: TokenType;
	description: string;
	value: 'hsla(110,50%,70%,1)';
}

export interface ColorToken extends Token {
	hsla: string;
	hex: string;
}

export interface TypographyToken extends Token {
	fontStyle: string;
	fontWeight: string;
	fontSize: string;
	lineHeight: string;
	fontFamily: string;
}

export type Dictionary = Token[];
