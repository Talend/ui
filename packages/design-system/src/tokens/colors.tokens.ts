import { ColorSwatch } from 'styled-components';
import { linearGradient, shade, tint } from 'polished';

const black = '#202020';
const russianViolet = '#2C1F56';
const moodyPurple = '#6664D1';
const indigoGray = '#323E48';
const deepBlue = '#19426c';
const lochmara = '#0675C1';
const paleCyan = '#91D1ED';
const rioGrande = '#82BD41';
const lightningYellow = '#F3C446';
const jaffa = '#EA8330';
const coral = '#FF6D70';

export const brand = {
	coral,
	deepBlue,
	indigoGray,
	russianViolet,
	paleCyan,
};

export const palette = {
	moodyPurple,
	deepBlue,
	lochmara,
	rioGrande,
	lightningYellow,
	jaffa,
	coral,
};

function getColorSwatch(color: string): ColorSwatch {
	return {
		900: shade(0.8, color),
		800: shade(0.6, color),
		700: shade(0.4, color),
		600: shade(0.2, color),
		500: color,
		400: tint(0.2, color),
		300: tint(0.4, color),
		200: tint(0.6, color),
		100: tint(0.8, color),
	};
}

export const swatches = {
	black: getColorSwatch(black),
	indigoGray: getColorSwatch(indigoGray),
	russianViolet: getColorSwatch(russianViolet),
	moodyPurple: getColorSwatch(moodyPurple),
	deepBlue: getColorSwatch(deepBlue),
	lochmara: getColorSwatch(lochmara),
	paleCyan: getColorSwatch(paleCyan),
	rioGrande: getColorSwatch(rioGrande),
	lightningYellow: getColorSwatch(lightningYellow),
	jaffa: getColorSwatch(jaffa),
	coral: getColorSwatch(coral),
};

export const grayscale = {
	gray: {
		900: black,
		800: tint(0.1, black),
		700: tint(0.2, black),
		600: tint(0.3, black),
		500: tint(0.4, black),
		400: tint(0.5, black),
		300: tint(0.6, black),
		200: tint(0.7, black),
		100: tint(0.8, black),
		75: tint(0.9, black),
		50: tint(0.95, black),
		0: tint(1, black),
	},
};

export const gradients = {
	twilight: linearGradient({
		colorStops: [`${deepBlue} 0%`, `${russianViolet} 100%`],
		toDirection: '133deg',
		fallback: deepBlue,
	}),
	indigoNight: linearGradient({
		colorStops: ['#3C4857 0%', '#1D2024 100%'],
		toDirection: '135deg',
	}),
	dusk: linearGradient({
		colorStops: [`${coral} 0%`, `${russianViolet} 100%`],
		toDirection: '135deg',
	}),
	cottonCandy: linearGradient({
		colorStops: [`${swatches.coral[300]} 4.29%`, '#BDE6F6 93.86%'],
		toDirection: '315deg',
	}),
	dawn: linearGradient({
		colorStops: [`${paleCyan} -1.47%`, `${deepBlue} 101.64%`],
		toDirection: '135deg',
	}),
	blueBird: linearGradient({
		colorStops: ['#F8F3EF 1.23%', `${paleCyan} 96.04%`],
		toDirection: '135deg',
	}),
};

const colors = {
	...swatches,
	...grayscale,
	...gradients,
	transparent: 'rgba(0,0,0,0)',
};

export default colors;
