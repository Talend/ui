export class StorageMock {
	constructor() {
		this.mocks = {};
	}

	mock(fn, name) {
		const mock = jest.fn(fn);
		this.mocks[name] = mock;
		global.Storage.prototype[name] = mock;
		return mock;
	}

	mockGet(getItem) {
		return this.mock(getItem, 'getItem');
	}

	mockSet(setItem) {
		return this.mock(setItem, 'setItem');
	}

	mockRemove(removeItem) {
		return this.mock(removeItem, 'removeItem');
	}

	clear(name) {
		this.mocks[name]?.mockClear();
	}
	clearAll() {
		Object.values(this.mocks).forEach(m => m.mockClear());
	}
}

export function mockLocalStorage({ getItem, setItem, removeItem }) {
	if (getItem) jest.fn(getItem);
	if (setItem) global.Storage.prototype.setItem = jest.fn(setItem);
	if (removeItem) global.Storage.prototype.removeItem = jest.fn(removeItem);
}
