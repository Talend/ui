import { LOADING_STEP_STATUSES } from '../Stepper.constants';
import { StepperActions } from '../index';
import stepperReducer from './Stepper.reducer';

const DATASET_SAMPLE_EVENTS = {
	SAMPLE_FETCHING_STARTED: 'SAMPLE_FETCHING_STARTED',
	SAMPLE_FETCHING_COMPUTED: 'SAMPLE_FETCHING_COMPUTED',
	SAMPLE_FETCHED: 'SAMPLE_FETCHED',
	SAMPLE_UPDATED: 'SAMPLE_UPDATED',
	SAMPLE_REFRESHED: 'SAMPLE_REFRESHED',
	SAMPLE_QUALITY_COMPUTED: 'SAMPLE_QUALITY_COMPUTED',

	SAMPLE_UPDATE_FAILURE: 'SAMPLE_UPDATE_FAILURE',
	FETCH_SAMPLE_ACCESS_FAILURE: 'FETCH_SAMPLE_ACCESS_FAILURE',
	SAMPLE_FETCHING_FAILURE: 'SAMPLE_FETCHING_FAILURE',
	SAMPLE_REFRESH_FAILURE: 'SAMPLE_REFRESH_FAILURE',
	SAMPLE_QUALITY_FAILURE: 'SAMPLE_QUALITY_FAILURE',
};

const steps = [
	{
		label: 'FIRST STEP',
		status: LOADING_STEP_STATUSES.LOADING,
		failureOn: [
			DATASET_SAMPLE_EVENTS.FETCH_SAMPLE_ACCESS_FAILURE,
			DATASET_SAMPLE_EVENTS.SAMPLE_FETCHING_FAILURE,
			DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
		],
		successOn: [
			DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
			DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
			DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED,
		],
	},
	{
		label: 'Update Sample',
		failureOn: [
			DATASET_SAMPLE_EVENTS.SAMPLE_UPDATE_FAILURE,
			DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
		],
		loadingOn: DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
		successOn: [
			DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
			DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED,
		],
	},
	{
		label: 'Update Quality',
		failureOn: [
			DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_FAILURE,
			DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
		],
		loadingOn: DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
		successOn: [DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED],
	},
];

describe('Stepper Service', () => {
	describe('stepperReducer', () => {
		describe('errors', () => {
			it('should throw an error when there is no resourceId', () => {
				// when
				expect(() => StepperActions.initStepper('dataset')).toThrow(
					Error('Stepper Reducer : resourceId should be present in the action'),
				);
			});

			it('should throw an error when there is no resourceType', () => {
				// given
				// when
				expect(() => StepperActions.initStepper(null, 'id12')).toThrow(
					Error('Stepper Reducer : resourceType should be present in the action'),
				);
			});
		});

		it('should test INIT_LOADING_STEPS action', () => {
			// given
			const action = StepperActions.initStepper('dataset', 'id12', steps);
			// when
			const newState = stepperReducer({}, action);
			// then
			expect(newState).toEqual({
				'dataset-id12': {
					steps: [
						{
							label: 'FIRST STEP',
							status: 'loading',
							failureOn: [
								DATASET_SAMPLE_EVENTS.FETCH_SAMPLE_ACCESS_FAILURE,
								DATASET_SAMPLE_EVENTS.SAMPLE_FETCHING_FAILURE,
								DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
							],
							successOn: [
								DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
								DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
								DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED,
							],
						},
						{
							label: 'Update Sample',
							status: 'pending',
							failureOn: [
								DATASET_SAMPLE_EVENTS.SAMPLE_UPDATE_FAILURE,
								DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
							],
							loadingOn: DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
							successOn: [
								DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
								DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED,
							],
						},
						{
							label: 'Update Quality',
							status: 'pending',
							failureOn: [
								DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_FAILURE,
								DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
							],
							loadingOn: DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
							successOn: [DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED],
						},
					],
				},
			});
		});

		it('should test LOADING_STEPS_REMOVE action', () => {
			// given
			const action = StepperActions.removeStepper('dataset', 'id12');
			// when
			const newState = stepperReducer(
				{ 'dataset-id12': { steps }, 'dataset-id13': { steps } },
				action,
			);
			// then
			expect(newState).toEqual({
				'dataset-id13': { steps },
			});
		});

		describe('should test LOADING_STEPS_PROCEED_EVENT action', () => {
			let initState;
			beforeEach(() => {
				const initAction = StepperActions.initStepper('dataset', 'id12', steps);
				initState = stepperReducer({}, initAction);
			});

			it('should fail the stuff', () => {
				// given
				const failAction = StepperActions.proceedLoadingEvent(
					'dataset',
					'id12',
					DATASET_SAMPLE_EVENTS.SAMPLE_FETCHING_FAILURE,
					'You fail',
				);
				// when
				const resultState = stepperReducer(initState, failAction);
				// then
				expect(resultState).toEqual({
					'dataset-id12': {
						steps: [
							{
								label: 'FIRST STEP',
								status: LOADING_STEP_STATUSES.FAILURE,
								failureOn: [
									DATASET_SAMPLE_EVENTS.FETCH_SAMPLE_ACCESS_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_FETCHING_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
								],
								message: {
									label: 'You fail',
								},
								successOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
									DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
									DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED,
								],
							},
							{
								label: 'Update Sample',
								status: LOADING_STEP_STATUSES.ABORTED,
								failureOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_UPDATE_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
								],
								loadingOn: DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
								successOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
									DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED,
								],
							},
							{
								label: 'Update Quality',
								status: LOADING_STEP_STATUSES.ABORTED,
								failureOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
								],
								loadingOn: DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
								successOn: [DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED],
							},
						],
					},
				});
			});

			it('should update the loading', () => {
				// given
				const failAction = StepperActions.proceedLoadingEvent(
					'dataset',
					'id12',
					DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
				);
				// when
				const resultState = stepperReducer(initState, failAction);
				// then
				expect(resultState).toEqual({
					'dataset-id12': {
						steps: [
							{
								label: 'FIRST STEP',
								status: LOADING_STEP_STATUSES.SUCCESS,
								failureOn: [
									DATASET_SAMPLE_EVENTS.FETCH_SAMPLE_ACCESS_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_FETCHING_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
								],
								successOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
									DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
									DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED,
								],
							},
							{
								label: 'Update Sample',
								status: LOADING_STEP_STATUSES.LOADING,
								failureOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_UPDATE_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
								],
								loadingOn: DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
								successOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
									DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED,
								],
							},
							{
								label: 'Update Quality',
								status: LOADING_STEP_STATUSES.PENDING,
								failureOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
								],
								loadingOn: DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
								successOn: [DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED],
							},
						],
					},
				});
			});

			it('should not update a step already done', () => {
				// given
				const updateAction1 = StepperActions.proceedLoadingEvent(
					'dataset',
					'id12',
					DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
				);
				const updateAction2 = StepperActions.proceedLoadingEvent(
					'dataset',
					'id12',
					DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
				);
				// when
				const intermediateState = stepperReducer(initState, updateAction1);
				const resultState = stepperReducer(intermediateState, updateAction2);
				// then
				expect(resultState).toEqual({
					'dataset-id12': {
						steps: [
							{
								label: 'FIRST STEP',
								status: LOADING_STEP_STATUSES.SUCCESS,
								failureOn: [
									DATASET_SAMPLE_EVENTS.FETCH_SAMPLE_ACCESS_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_FETCHING_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
								],
								successOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
									DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
									DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED,
								],
							},
							{
								label: 'Update Sample',
								status: LOADING_STEP_STATUSES.SUCCESS,
								failureOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_UPDATE_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
								],
								loadingOn: DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
								successOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
									DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED,
								],
							},
							{
								label: 'Update Quality',
								status: LOADING_STEP_STATUSES.LOADING,
								failureOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
								],
								loadingOn: DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
								successOn: [DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED],
							},
						],
					},
				});
			});

			it('should update the loading when the event arrived in wrong order', () => {
				// given
				const failAction = StepperActions.proceedLoadingEvent(
					'dataset',
					'id12',
					DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED,
				);
				// when
				const resultState = stepperReducer(initState, failAction);
				// then
				expect(resultState).toEqual({
					'dataset-id12': {
						steps: [
							{
								label: 'FIRST STEP',
								status: LOADING_STEP_STATUSES.SUCCESS,
								failureOn: [
									DATASET_SAMPLE_EVENTS.FETCH_SAMPLE_ACCESS_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_FETCHING_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
								],
								successOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
									DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
									DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED,
								],
							},
							{
								label: 'Update Sample',
								status: LOADING_STEP_STATUSES.SUCCESS,
								failureOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_UPDATE_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
								],
								loadingOn: DATASET_SAMPLE_EVENTS.SAMPLE_FETCHED,
								successOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
									DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED,
								],
							},
							{
								label: 'Update Quality',
								status: LOADING_STEP_STATUSES.SUCCESS,
								failureOn: [
									DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_FAILURE,
									DATASET_SAMPLE_EVENTS.SAMPLE_REFRESHED_FAILURE,
								],
								loadingOn: DATASET_SAMPLE_EVENTS.SAMPLE_UPDATED,
								successOn: [DATASET_SAMPLE_EVENTS.SAMPLE_QUALITY_COMPUTED],
							},
						],
					},
				});
			});
		});
	});
});
