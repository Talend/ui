import React from 'react';

const Coral = jest.requireActual('@talend/design-system');

const mocks = {};

function startsWithUpperCase(name) {
	return name[0] === name[0].toUpperCase();
}

function getMock(name) {
	return props => React.createElement(`Coral.${name}`, props);
}

function registerMock(componentName, variationName) {
	if (variationName) {
		const variationDisplayName = `${componentName}.${variationName}`;
		mocks[componentName][variationName] = getMock(variationDisplayName);
		mocks[componentName][variationName].displayName = variationDisplayName;
	} else {
		mocks[componentName] = getMock(componentName);
		mocks[componentName].displayName = componentName;
	}
}

Object.keys(Coral)
	.filter(startsWithUpperCase)
	.forEach(name => {
		registerMock(name);
		Object.keys(Coral[name])
			.filter(startsWithUpperCase)
			.forEach(variation => registerMock(name, variation));
	});

module.exports = mocks;
