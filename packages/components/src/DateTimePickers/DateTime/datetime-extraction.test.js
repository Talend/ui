import {
	extractParts,
	extractPartsFromDateTime,
	extractPartsFromTextInput,
} from './datetime-extraction';

describe('Date extraction', () => {
	describe('extractParts', () => {
		it('should return empty parts on undefined value', () => {
			// given
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useSeconds: true,
			};

			// when
			const parts = extractParts(undefined, options);

			// then
			expect(parts).toEqual({
				date: undefined,
				time: undefined,
				errors: [],
			});
		});

		it('should return parts from timestamp', () => {
			// given
			const date = new Date(2015, 8, 15, 12, 58, 22);
			const timestamp = date.getTime();
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractParts(timestamp, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				time: { hours: '12', minutes: '58', seconds: '00' },
				datetime: new Date(2015, 8, 15, 12, 58, 22),
			});
		});

		it('should return parts from Date', () => {
			// given
			const validDate = new Date(2015, 8, 15, 12, 58, 22);
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractParts(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				time: { hours: '12', minutes: '58', seconds: '00' },
				datetime: new Date(2015, 8, 15, 12, 58, 22),
			});
		});

		it('should return parts from string', () => {
			// given
			const value = '2015-09-15 10:05';
			const options = { dateFormat: 'YYYY-MM-DD' };

			// when
			const parts = extractParts(value, options);

			// then
			expect(parts).toEqual({
				date: '2015-09-15',
				time: '10:05',
				datetime: new Date(2015, 8, 15, 10, 5),
				errors: [],
				errorMessage: null,
			});
		});
	});

	describe('extractPartsFromDateTime', () => {
		it('should return valid date parts with time', () => {
			// given
			const validDate = new Date(2015, 8, 15, 12, 58, 22);
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};

			// when
			const parts = extractPartsFromDateTime(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				time: { hours: '12', minutes: '58', seconds: '00' },
				datetime: new Date(2015, 8, 15, 12, 58, 22),
			});
		});

		it('should return valid date parts with seconds', () => {
			// given
			const validDate = new Date(2015, 8, 15, 12, 58, 22);
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromDateTime(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				time: { hours: '12', minutes: '58', seconds: '22' },
				datetime: new Date(2015, 8, 15, 12, 58, 22),
			});
		});

		it('should create the gmt date from utc value', () => {
			// given
			// date is 2015-09-15T10:58:22.000Z UTC
			const validDate = new Date(1442314702000);
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useSeconds: true,
				useUTC: true,
			};

			// when
			const parts = extractPartsFromDateTime(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 15),
				time: { hours: '10', minutes: '58', seconds: '22' },
				datetime: new Date(Date.UTC(2015, 8, 15, 10, 58, 22)),
			});
		});

		it('should create the gmt date from utc value (previous day)', () => {
			// given
			// date is 2015-09-15T10:58:22.000Z UTC
			const validDate = new Date(2015, 8, 15, 1, 0, 22);
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useSeconds: true,
				useUTC: true,
			};

			// when
			const parts = extractPartsFromDateTime(validDate, options);

			// then
			expect(parts).toEqual({
				date: new Date(2015, 8, 14),
				time: { hours: '23', minutes: '00', seconds: '22' },
				datetime: new Date(2015, 8, 15, 1, 0, 22),
			});
		});
	});

	describe('extractPartsFromTextInput', () => {
		it('should extract parts with empty string', () => {
			// given
			const textInput = '';
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: '',
				time: '',
				errors: [],
				errorMessage: null,
			});
		});

		it('should extract parts with valid date and time', () => {
			// given
			const textInput = '2018-12-25 22:58';
			const options = {
				dateFormat: 'YYYY-MM-DD',
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: '2018-12-25',
				time: '22:58',
				datetime: new Date(2018, 11, 25, 22, 58),
				errorMessage: null,
				errors: [],
			});
		});

		it('should extract parts with valid date and time with seconds', () => {
			// given
			const textInput = '2018-12-25 22:58:12';
			const options = {
				dateFormat: 'YYYY-MM-DD',
				useSeconds: true,
			};

			// when
			const parts = extractPartsFromTextInput(textInput, options);

			// then
			expect(parts).toEqual({
				date: '2018-12-25',
				time: '22:58:12',
				datetime: new Date(2018, 11, 25, 22, 58, 12),
				errorMessage: null,
				errors: [],
			});
		});
	});
});
