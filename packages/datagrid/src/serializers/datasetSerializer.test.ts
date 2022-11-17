import sample from '../../mocks/sample.json';
import { CUSTOM_FIELD_DISPLAY_NAME } from '../constants';
import { getColumnDefs, sanitizeAvro } from './datasetSerializer';

describe('sanitizeAvro', () => {
	it('Sanitize well object with raw object', () => {
		expect(
			sanitizeAvro({
				name: 'field0',
				doc: 'Nom de la gare',
				[CUSTOM_FIELD_DISPLAY_NAME]: 'custom field name',
				type: [
					'null',
					{
						type: 'string',
						dqType: 'FR Commune',
						dqTypeKey: 'FR_COMMUNE',
					},
				],
				'@talend-quality@': {
					'0': 0,
					'1': 38,
					'-1': 62,
					total: 100,
				},
			}),
		).toEqual({
			name: 'field0',
			doc: 'Nom de la gare',
			[CUSTOM_FIELD_DISPLAY_NAME]: 'custom field name',
			type: 'string',
			typeLabel: 'string',
			semanticTypeId: 'FR_COMMUNE',
			semanticTypeLabel: 'FR Commune',
		});
	});
});

describe('getColumnDefs', () => {
	it('should returns the columns definitions', () => {
		const columnDefs = getColumnDefs(sample.schema);

		expect(columnDefs).toMatchSnapshot();
	});
});
