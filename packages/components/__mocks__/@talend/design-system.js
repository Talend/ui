import React from 'react';

const mocks = {};

const Coral = jest.requireActual('@talend/design-system');

function startsWithUpperCase(name) {
	return name[0] === name[0].toUpperCase();
}

function getFakeJSX(name) {
	return props => (
		<div data-mock-module="@talend/design-system" data-mock-component={name} {...props} />
	);
}

function mockComponentVariation(name) {
	return variation => {
		const variationName = `${name}.${variation}`;
		mocks[name][variation] = getFakeJSX(variationName);
		mocks[name][variation].displayName = variationName;
	};
}

function mockComponent(name) {
	mocks[name] = getFakeJSX(name);
	mocks[name].displayName = name;
	Object.keys(Coral[name])
		.filter(startsWithUpperCase)
		.forEach(mockComponentVariation(name));
}

Object.keys(Coral)
	.filter(startsWithUpperCase)
	.forEach(mockComponent);

module.exports = mocks;
