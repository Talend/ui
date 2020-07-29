import { shade, tint } from 'polished';

const black = '#202020';
const russianViolet = '#2C1F56';
const moodyPurple = '#6664D1';
const deepBlue = '#19426c';
const lochmara = '#0675C1';
const paleCyan = '#91D1ED';
const rioGrande = '#82BD41';
const lightningYellow = '#F3C446';
const jaffa = '#EA8330';
const coral = '#FF6D70';
const chesnutRose = '#E96065';

export const brand = {
	coral,
	deepBlue,
	russianViolet,
	paleCyan,
};

export const palette = {
	deepBlue,
	rioGrande,
	lightningYellow,
	jaffa,
	chesnutRose,
};

export const swatches = {};
Object.entries(palette).forEach(([key, value]) => {
	swatches[`${key}900`] = shade(0.8, value);
	swatches[`${key}800`] = shade(0.6, value);
	swatches[`${key}700`] = shade(0.4, value);
	swatches[`${key}600`] = shade(0.2, value);
	swatches[`${key}500`] = value;
	swatches[`${key}400`] = tint(0.2, value);
	swatches[`${key}300`] = tint(0.4, value);
	swatches[`${key}200`] = tint(0.6, value);
	swatches[`${key}100`] = tint(0.8, value);
});

export const interactions = {
	lochmara,
	moodyPurple,
};

export const grayscale = {
	gray900: black,
	gray800: tint(0.1, black),
	gray700: tint(0.2, black),
	gray600: tint(0.3, black),
	gray500: tint(0.4, black),
	gray400: tint(0.5, black),
	gray300: tint(0.6, black),
	gray200: tint(0.7, black),
	gray100: tint(0.8, black),
	gray75: tint(0.9, black),
	gray50: tint(0.95, black),
	gray0: tint(1, black),
};

console.log(swatches);

export default {
	...brand,
	...swatches,
	...interactions,
	...grayscale,
	transparent: 'rgba(0,0,0,0)',
};
