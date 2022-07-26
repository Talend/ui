import { Token, Tokens } from '../../../src/tokens/types';

const tShirtSizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'];

type GroupedArray<T extends Record<K, PropertyKey>, K extends keyof T> = {
	[P in T[K]]: T[];
};

export const groupBy = <T extends Record<K, PropertyKey>, K extends keyof T>(
	collection: T[],
	property: K,
) => {
	return collection.reduce((acc, cur) => {
		(acc[cur[property]] = acc[cur[property]] || []).push(cur);
		return acc;
	}, {} as GroupedArray<T, K>);
};

export const groupByType = (collection: Tokens) => groupBy(collection, 'type');

export const getDisplayName = (name: string) => {
	if (!name) return '';
	const nameArray = name
		.replace(/^coral/i, '')
		.replace(/^color/i, '')
		.split(/(?=[A-Z])/);
	return nameArray
		.map((word: string, index: number, words: string[]) => {
			let adapted = tShirtSizes.some(tShirtSize => word.toLocaleLowerCase() === tShirtSize)
				? word.toLocaleUpperCase()
				: word.toLocaleLowerCase();
			if (index === 0 && index < words.length - 1) {
				adapted += '/';
			} else if (index < words.length - 1) {
				adapted += '-';
			}
			return adapted;
		})
		.join('');
};

export const getScssName = (name?: string) => {
	if (!name) return '';
	const nameArray = name.split(/(?=[A-Z])/);
	return `tokens.$${nameArray
		.map((word: string, index: number, words: string[]) => {
			let adapted = word.toLocaleLowerCase();
			if (index < words.length - 1) {
				adapted += '-';
			}
			return adapted;
		})
		.join('')}`;
};

export const getCssName = (token: Token) => {
	if (!token.name) return '';
	const { name, value } = token;
	const nameArray = name.split(/(?=[A-Z])/);
	return `var(--${nameArray
		.map((word: string, index: number, words: string[]) => {
			let adapted = word.toLocaleLowerCase();
			if (index < words.length - 1) {
				adapted += '-';
			}
			return adapted;
		})
		.join('')}, ${value})`;
};
