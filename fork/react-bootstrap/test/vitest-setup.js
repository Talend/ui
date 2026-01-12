import { beforeEach, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock file imports (equivalent to Jest moduleNameMapper)
const mockFile = () => 'test-file-stub';
const mockCss = () => ({});

// Global test utilities
global.mockFile = mockFile;
global.mockCss = mockCss;

// For compatibility with Jest mocks in existing tests
global.jest = {
	fn: vi.fn,
	clearAllMocks: vi.clearAllMocks,
	resetAllMocks: vi.resetAllMocks,
	restoreAllMocks: vi.restoreAllMocks,
	spyOn: vi.spyOn,
};

// For compatibility with skipped tests
global.xit = (name, fn) => {
	return it.skip(name, fn);
};

// For compatibility with focused tests
global.fit = (name, fn) => {
	return it.only(name, fn);
};

// Setup for legacy tests that use console mocking
beforeEach(() => {
	// Set up console error mocking for legacy tests
	if (!console.error.expected) {
		const originalConsoleError = console.error;
		console.error = vi.fn().mockImplementation(msg => {
			if (console.error.expected && console.error.expected.length > 0) {
				let expected = false;
				console.error.expected.forEach(about => {
					if (msg.indexOf(about) !== -1) {
						console.error.warned = console.error.warned || {};
						console.error.warned[about] = true;
						expected = true;
					}
				});

				if (expected) {
					return;
				}
			}

			// Call original console.error for unexpected errors
			originalConsoleError.call(console, msg);
		});

		console.error.expected = [];
		console.error.warned = {};
		console.error.threw = false;
		console.error.original = originalConsoleError;
	}
});

afterEach(() => {
	// Clean up console error mocking
	if (console.error.expected && console.error.expected.length) {
		// Check that all expected warnings were triggered
		console.error.expected.forEach(expected => {
			if (!console.error.warned[expected]) {
				console.warn(`Expected console.error about "${expected}" but it was not triggered`);
			}
		});
	}

	// Reset console.error state
	if (console.error.original) {
		console.error = console.error.original;
	}

	// Clear all mocks
	vi.clearAllMocks();
});

// Global test environment setup
Object.assign(global, {
	// For legacy tests compatibility
	assert: {
		ok: (value, message) => {
			if (!value) {
				throw new Error(message || `Expected ${value} to be truthy`);
			}
		},
		notOk: (value, message) => {
			if (value) {
				throw new Error(message || `Expected ${value} to be falsy`);
			}
		},
		equal: (actual, expected, message) => {
			if (actual !== expected) {
				throw new Error(message || `Expected ${actual} to equal ${expected}`);
			}
		},
	},

	// For legacy tests that use sinon
	sinon: {
		stub: vi.fn,
		spy: vi.fn,
		mock: vi.fn,
	},
});
