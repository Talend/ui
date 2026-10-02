import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const dir = dirname(fileURLToPath(import.meta.url));
const functions = {};
const sandbox = {
	Pulsar: { registerFunction: (name, fn) => (functions[name] = fn), registerPayload: () => {} },
};
vm.runInNewContext(readFileSync(join(dir, 'helpers.js'), 'utf8'), sandbox);

const evalTemplateLiteral = escaped => vm.runInNewContext(`\`${escaped}\``, {});
const evalSingleQuoted = escaped => vm.runInNewContext(`'${escaped}'`, {});

describe('supernova exporter escaping helpers', () => {
	it('should make template literal content inert', () => {
		const payload = 'x`${(function(){ throw new Error("pwned"); })()}y\\';
		expect(evalTemplateLiteral(functions.escapeTemplateLiteral(payload))).toBe(payload);
	});

	it('should make single quoted content inert', () => {
		const payload = "a' + (function(){ throw new Error('pwned'); })() + '\n\\";
		expect(evalSingleQuoted(functions.addQuotes(payload).slice(1, -1))).toBe(payload);
	});

	it('should not let a data value break out of url()', () => {
		const out = functions.baseWrap("data:x') } body { background:url(https://evil/", 'Light');
		expect(out.startsWith("url('data:x%27%29")).toBe(true);
		expect(out.endsWith("')")).toBe(true);
		expect(out.slice(5, -2)).not.toMatch(/['){}]/);
	});

	it('should strip css structure characters from text values', () => {
		const out = functions.baseWrap('1s; } body { x: url(https://evil/) @import', 'Light');
		expect(out).not.toMatch(/[;{}]|url\(|@import/);
	});

	it('should not let a generic token name close the css block', () => {
		const out = functions.constructGenericTokensStyles({ name: 'x} body { color: red' }, 'Light');
		expect(out).not.toMatch(/[{};]/);
		const keyframes = functions.constructGenericTokensStyles(
			{ name: 'coral-x keyframes } body { color: red' },
			'Light',
		);
		expect(keyframes).not.toMatch(/[};]/);
	});

	it('should treat the data scheme case-insensitively', () => {
		const out = functions.baseWrap("DATA:x') ; body { color: red", 'Light');
		expect(out.startsWith("url('")).toBe(true);
		expect(out.slice(5, -2)).not.toMatch(/['){}]/);
	});

	it('should strip css comment delimiters from text values', () => {
		const out = functions.baseWrap('a /* b */ c', 'Light');
		expect(out).not.toMatch(/\/\*|\*\//);
	});

	it('should sanitize theme-prefixed text values', () => {
		const out = functions.sanitizeCssText(
			functions.prefixWithThemeName('coral; } b { x: y', 'Light'),
		);
		expect(out).toBe('coral-light  b  x: y');
	});

	it('should keep legitimate values unchanged', () => {
		expect(
			functions.baseWrap('coral-keyframes-blink 1.5s cubic-bezier(0.7, 0, 1, 1) infinite', 'Light'),
		).toBe('coral-light-keyframes-blink 1.5s cubic-bezier(0.7, 0, 1, 1) infinite');
		expect(functions.baseWrap('data:image/png;base64,AAAA+/==', 'Light')).toBe(
			"url('data:image/png;base64,AAAA+/==')",
		);
	});

	it('should escape css strings', () => {
		expect(functions.escapeCssString("Ro'bo\\to")).toBe("Ro\\'bo\\\\to");
	});
});
