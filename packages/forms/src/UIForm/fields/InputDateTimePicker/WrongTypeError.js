export class UnhandleTypeError extends Error {
	constructor(acceptedTypes, typeGiven) {
		const acceptedTypesFormated = acceptedTypes.map(acceptedType => `'${acceptedType}'`).join(', ');
		const message = `[${acceptedTypesFormated}] types accepted, given '${typeGiven}'`;
		super(message);
	}
}

export class UnexpectedTypeError extends Error {
	constructor(typeExpected, typeGiven) {
		const message = `Expected type of '${typeExpected}' and got '${typeGiven}'`;
		super(message);
	}
}
