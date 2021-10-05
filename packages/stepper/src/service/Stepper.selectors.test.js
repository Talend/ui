import { getStepsForResource, isResourceLoading } from './Stepper.selectors';
import { LOADING_STEP_STATUSES } from '../Stepper.constants';

const resourceType = 'foo';

const resourceId = 'bar';

const steps = [
	{ label: 'Step A', status: LOADING_STEP_STATUSES.SUCCESS },
	{ label: 'Step B', status: LOADING_STEP_STATUSES.SUCCESS },
	{ label: 'Step C', status: LOADING_STEP_STATUSES.LOADING },
	{ label: 'Step D', status: LOADING_STEP_STATUSES.PENDING },
];

const store = {
	stepper: {
		[`${resourceType}-${resourceId}`]: {
			steps,
		},
	},
};

describe('Stepper Selectors', () => {
	describe('getStepsForResource', () => {
		it('should returns steps from store', () => {
			const result = getStepsForResource(store, resourceType, resourceId);
			expect(result).toBe(steps);
		});
	});

	describe('isResourceLoading', () => {
		it('should indicates that resource is still loading', () => {
			const result = isResourceLoading(store, resourceType, resourceId);
			expect(result).toBe(true);
		});

		it('should indicates that resource loading is done', () => {
			const result = isResourceLoading(
				{
					...store,
					stepper: {
						...store.stepper,
						[`${resourceType}-${resourceId}`]: {
							...store.stepper[`${resourceType}-${resourceId}`],
							steps: steps.map(step => ({ ...step, status: LOADING_STEP_STATUSES.SUCCESS })),
						},
					},
				},
				resourceType,
				resourceId,
			);
			expect(result).toBe(false);
		});
	});
});
