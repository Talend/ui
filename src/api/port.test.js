import { PortRecord, PositionRecord } from '../constants/flowdesigner.model';
import { isPortRecord, isTypology, getId, createPortRecord } from './port';

describe('port api', () => {
	describe('isPortRecord', () => {
		it('return true if given parameter is a PortRecord', () => {
			expect(isPortRecord(new PortRecord())).toBe(true);
		});
		it('return false if given parameter is not a PortRecord', () => {
			expect(isPortRecord(new PositionRecord())).toBe(false);
		});

		it('return true if given parameter is a PortRecord and doThrow is true', () => {
			expect(isPortRecord(new PortRecord(), true)).toBe(true);
		});
		it('throw if given parameter is not a PortRecord and doThrow is true', () => {
			expect(() => isPortRecord(new PositionRecord(), true)).toThrow(
				'Should be a PortRecord was given Record { "x": undefined, "y": undefined }',
			);
		});
	});

	describe('isPortRecordElseThrow', () => {
		it('return true if given parameter is a PortRecord', () => {
			expect(isPortRecord(new PortRecord(), true)).toBe(true);
		});
		it('throw if given parameter is not a PortRecord', () => {
			expect(() => isPortRecord(new PositionRecord(), true)).toThrow(
				'Should be a PortRecord was given Record { "x": undefined, "y": undefined }',
			);
		});
	});

	describe('isTypology', () => {
		it('return true if given parameter is a valid Typologu', () => {
			expect(isTypology('SINK')).toBe(true);
		});
		it('return false if given parameter is not  a valid Typologu', () => {
			expect(isTypology('LOOKUP')).toBe(false);
		});

		it('return true if given parameter is a valid Typologu and doThrow is true', () => {
			expect(isTypology('SINK', true)).toBe(true);
		});
		it('throw if given parameter is not  a valid Typologu and doThrow is true', () => {
			const invalidTypology = 'LOOKUP';
			expect(() => isTypology('LOOKUP', true)).toThrow(
				`Should be a typology 'SOURCE' or 'SINK' was given ${invalidTypology}`,
			);
		});
	});

	describe('getId', () => {
		it('should return the id if the given parameter is a PortRecord', () => {
			const portId = 'portId';
			const Record = createPortRecord(portId, 'nodeId', 1, 'SOURCE');
			expect(getId(Record)).toBe(portId);
		});

		it('shoudl throw if the given parameter is not a PortRecord', () => {
			expect(() => getId('whatever')).toThrowError(
				'Should be a PortRecord was given whatever',
			);
		});
	});
});
