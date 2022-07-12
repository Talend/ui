export enum TokenType {
	BORDER = 'border',
	BRANDING = 'branding',
	BREAKPOINT = 'breakpoint',
	COLOR = 'color',
	ELEVATION = 'elevation',
	GRADIENT = 'gradient',
	MEASURE = 'measure',
	OPACITY = 'opacity',
	RADIUS = 'radius',
	SHADOW = 'shadow',
	TRANSITION = 'transition',
	TYPOGRAPHY = 'typography',
}

export interface Token {
	name: string;
	type: TokenType;
	description: string;
	value: string;
}

export interface ColorToken extends Token {
	type: TokenType.COLOR;
	hsla: string;
	hex: string;
}

export interface TypographyToken extends Token {
	type: TokenType.TYPOGRAPHY;
	fontStyle: string;
	fontWeight: string;
	fontSize: string;
	lineHeight: string;
	fontFamily: string;
}

export type Tokens = Token[];
