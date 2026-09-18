import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom's native localStorage throws/is unavailable for opaque origins (about:blank),
// so provide a stable in-memory implementation instead of relying on jsdom internals.
class MemoryStorage implements Storage {
	private store = new Map<string, string>();

	get length() {
		return this.store.size;
	}

	clear(): void {
		this.store.clear();
	}

	getItem(key: string): string | null {
		return this.store.has(key) ? (this.store.get(key) as string) : null;
	}

	key(index: number): string | null {
		return Array.from(this.store.keys())[index] ?? null;
	}

	removeItem(key: string): void {
		this.store.delete(key);
	}

	setItem(key: string, value: string): void {
		this.store.set(key, String(value));
	}
}

// Wrap in a Proxy so bracket access (`localStorage[key]`), used by legacy code, behaves like getItem/setItem.
const memoryStorage = new Proxy(new MemoryStorage(), {
	get(target, prop, receiver) {
		if (prop in target || typeof prop === 'symbol') {
			return Reflect.get(target, prop, receiver);
		}
		return target.getItem(prop);
	},
	set(target, prop, value) {
		if (prop in target || typeof prop === 'symbol') {
			return Reflect.set(target, prop, value);
		}
		target.setItem(prop, value);
		return true;
	},
});

Object.defineProperty(window, 'localStorage', {
	value: memoryStorage,
	writable: true,
	configurable: true,
});
globalThis.localStorage = window.localStorage;

vi.mock('@talend/utils', async () => {
	const actual = await vi.importActual<Record<string, unknown>>('@talend/utils');
	return {
		...actual,
		randomUUID: () => '42',
	};
});
