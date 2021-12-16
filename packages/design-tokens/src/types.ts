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
