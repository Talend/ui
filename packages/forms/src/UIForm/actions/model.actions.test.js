import { TF_MUTATE_VALUE } from './constants';
import {
	mutateValue,
} from './model.actions';

const formName = 'formName';
const jsonSchema = { jsonSchema: 'json' };
const value = { props: 'json' };
const error = 'error';

describe('Model actions', () => {
	describe('#mutateValue action', () => {
		it('should test the action', () => {
			// given

			// when
			const resultAction = mutateValue(formName, jsonSchema, value, error);

			// then
			expect(resultAction).toEqual(
				{
					type: TF_MUTATE_VALUE,
					error: 'error',
					formName: 'formName',
					schema: { jsonSchema: 'json' },
					value: { props: 'json' },
				}
			);
		});
	});
});
