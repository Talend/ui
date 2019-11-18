import cases from 'jest-in-case';

import { getTimeFormat, timeToStr } from '../Time/time-extraction';

describe('time-extraction', () => {
	describe('getTimeFormat', () => {
		it('should return time format with seconds', () => {
			// given
			const useSeconds = true;
			// when
			const timeFormat = getTimeFormat(useSeconds);
			// then
			expect(timeFormat).toEqual('HH:mm:ss');
		});
		it('should return time format without seconds', () => {
			// given
			const useSeconds = false;
			// when
			const timeFormat = getTimeFormat(useSeconds);
			// then
			expect(timeFormat).toEqual('HH:mm');
		});
	});
	describe('timeToStr', () => {
		cases(
			'should convert time object to string',
			({ time, useSeconds, expectedStr }) => {
				expect(timeToStr(time, useSeconds)).toBe(expectedStr);
			},
			[
				{
					name: 'when useSeconds is false',
					time: { hours: '12', minutes: '30', seconds: '00' },
					useSeconds: false,
					expectedStr: '12:30',
				},
				{
					name: 'when useSeconds is true',
					time: { hours: '12', minutes: '30', seconds: '00' },
					useSeconds: true,
					expectedStr: '12:30:00',
				},
				{
					name: 'when hours, minutes, seconds are numbers',
					time: { hours: 23, minutes: 59, seconds: 0 },
					useSeconds: false,
					expectedStr: '23:59',
				},
			],
		);
	});
});
