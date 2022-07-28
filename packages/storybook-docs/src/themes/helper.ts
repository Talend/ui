export const tokenValue = (dictionary: { name: string; value: string }[], tokenName: string) => {
	const token = dictionary.find(t => t.name === tokenName);
	if (!token) {
		throw Error('Cannot find token ' + tokenName);
	}
	return token.value;
};
