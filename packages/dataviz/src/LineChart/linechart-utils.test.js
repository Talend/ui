import {
	union,
	isSelectedOrHighlight,
	getStrokeOpacity,
	getStrokeWidth,
	getDotR,
	getActiveDotR,
} from './linechart-utils'; // eslint-disable-line import/no-named-as-default

describe('linechart', () => {
	describe('utils', () => {
		it('should only have value once', () => {
			// when
			const res = union([1, 2, 3], new Set([1, 4, 5, 6, 3]));
			// then
			expect(res).toEqual(new Set([1, 2, 3, 4, 5, 6]));
		});

		it('should return true if dataKey is the highlight one', () => {
			// when then
			expect(isSelectedOrHighlight('owner1', 'owner1')).toBeTruthy();
		});
		it('should return true if dataKey is in selection', () => {
			// when then
			expect(isSelectedOrHighlight('owner1', '', ['owner1'])).toBeTruthy();
		});
		it('should return true if there are no selected/higlight', () => {
			// when then
			// case no selection and no higlight
			expect(isSelectedOrHighlight('owner1')).toBeTruthy();
			// case selection empty and no higlight not the same
			expect(isSelectedOrHighlight('owner1', '')).toBeTruthy();
			// case selection empty and no higlight not the same
			expect(isSelectedOrHighlight('owner1', '', [])).toBeTruthy();
		});
		it('should return false', () => {
			// case higlight different
			expect(isSelectedOrHighlight('owner1', 'owner2', [])).toBeFalsy();
			// case not in selection
			expect(isSelectedOrHighlight('owner1', '', ['owner2'])).toBeFalsy();
		});
	});
	describe('stroke configuration', () => {
		it('should return opacity 1', () => {
			// selected/higlight
			expect(getStrokeOpacity('owner1', 'owner1', [])).toBe(1);
			// not selected/higlight
			expect(getStrokeOpacity('owner1', 'owner2', ['owner2'])).toBe(0.25);
		});
		it('should return width', () => {
			// selected/highlight
			expect(getStrokeWidth('owner1', 'owner1', [])).toBe(2);
			// not selected/higlight
			expect(getStrokeWidth('owner1', 'owner2', ['owner2'])).toBe(1.5);
		});
		it('should return dot radius', () => {
			// selected/highlight
			expect(getDotR('owner1', 'owner1', [])).toBe(3);
			// not selected/higlight
			expect(getDotR('owner1', 'owner2', ['owner2'])).toBe(0);
			// active dot radius selected/highlight
			expect(getActiveDotR('owner1', 'owner1', [])).toBe(5);
			// active dot radius
			expect(getActiveDotR('owner1', 'owner2', ['owner2'])).toBe(0);
		});
	});
});
