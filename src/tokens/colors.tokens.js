import { linearGradient, shade, tint } from 'polished';

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

export const brand = {
	coral,
	deepBlue,
	russianViolet,
	paleCyan,
};

export const palette = {
	paleCyan,
	lochmara,
	deepBlue,
	rioGrande,
	lightningYellow,
	jaffa,
	coral,
};

export const gradients = {
	twilight: linearGradient({
		colorStops: [`${deepBlue} 0%`, `${russianViolet} 100%`],
		toDirection: '133deg',
		fallback: deepBlue,
	}),
};

export const swatches = {};

swatches.paleCyan900 = shade(0.8, palette.paleCyan);
swatches.paleCyan800 = shade(0.6, palette.paleCyan);
swatches.paleCyan700 = shade(0.4, palette.paleCyan);
swatches.paleCyan600 = shade(0.2, palette.paleCyan);
swatches.paleCyan500 = palette.paleCyan;
swatches.paleCyan400 = tint(0.2, palette.paleCyan);
swatches.paleCyan300 = tint(0.4, palette.paleCyan);
swatches.paleCyan200 = tint(0.6, palette.paleCyan);
swatches.paleCyan100 = tint(0.8, palette.paleCyan);

swatches.lochmara900 = shade(0.8, palette.lochmara);
swatches.lochmara800 = shade(0.6, palette.lochmara);
swatches.lochmara700 = shade(0.4, palette.lochmara);
swatches.lochmara600 = shade(0.2, palette.lochmara);
swatches.lochmara500 = palette.lochmara;
swatches.lochmara400 = tint(0.2, palette.lochmara);
swatches.lochmara300 = tint(0.4, palette.lochmara);
swatches.lochmara200 = tint(0.6, palette.lochmara);
swatches.lochmara100 = tint(0.8, palette.lochmara);

swatches.deepBlue900 = shade(0.8, palette.deepBlue);
swatches.deepBlue800 = shade(0.6, palette.deepBlue);
swatches.deepBlue700 = shade(0.4, palette.deepBlue);
swatches.deepBlue600 = shade(0.2, palette.deepBlue);
swatches.deepBlue500 = palette.deepBlue;
swatches.deepBlue400 = tint(0.2, palette.deepBlue);
swatches.deepBlue300 = tint(0.4, palette.deepBlue);
swatches.deepBlue200 = tint(0.6, palette.deepBlue);
swatches.deepBlue100 = tint(0.8, palette.deepBlue);

swatches.rioGrande900 = shade(0.8, palette.rioGrande);
swatches.rioGrande800 = shade(0.6, palette.rioGrande);
swatches.rioGrande700 = shade(0.4, palette.rioGrande);
swatches.rioGrande600 = shade(0.2, palette.rioGrande);
swatches.rioGrande500 = palette.rioGrande;
swatches.rioGrande400 = tint(0.2, palette.rioGrande);
swatches.rioGrande300 = tint(0.4, palette.rioGrande);
swatches.rioGrande200 = tint(0.6, palette.rioGrande);
swatches.rioGrande100 = tint(0.8, palette.rioGrande);

swatches.lightningYellow900 = shade(0.8, palette.lightningYellow);
swatches.lightningYellow800 = shade(0.6, palette.lightningYellow);
swatches.lightningYellow700 = shade(0.4, palette.lightningYellow);
swatches.lightningYellow600 = shade(0.2, palette.lightningYellow);
swatches.lightningYellow500 = palette.lightningYellow;
swatches.lightningYellow400 = tint(0.2, palette.lightningYellow);
swatches.lightningYellow300 = tint(0.4, palette.lightningYellow);
swatches.lightningYellow200 = tint(0.6, palette.lightningYellow);
swatches.lightningYellow100 = tint(0.8, palette.lightningYellow);

swatches.jaffa900 = shade(0.8, palette.jaffa);
swatches.jaffa800 = shade(0.6, palette.jaffa);
swatches.jaffa700 = shade(0.4, palette.jaffa);
swatches.jaffa600 = shade(0.2, palette.jaffa);
swatches.jaffa500 = palette.jaffa;
swatches.jaffa400 = tint(0.2, palette.jaffa);
swatches.jaffa300 = tint(0.4, palette.jaffa);
swatches.jaffa200 = tint(0.6, palette.jaffa);
swatches.jaffa100 = tint(0.8, palette.jaffa);

swatches.coral900 = shade(0.8, palette.coral);
swatches.coral800 = shade(0.6, palette.coral);
swatches.coral700 = shade(0.4, palette.coral);
swatches.coral600 = shade(0.2, palette.coral);
swatches.coral500 = palette.coral;
swatches.coral400 = tint(0.2, palette.coral);
swatches.coral300 = tint(0.4, palette.coral);
swatches.coral200 = tint(0.6, palette.coral);
swatches.coral100 = tint(0.8, palette.coral);

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

export default {
	...brand,
	...gradients,
	...swatches,
	...interactions,
	...grayscale,
	transparent: 'rgba(0,0,0,0)',
};
