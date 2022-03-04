import { fromJS } from 'immutable';
import sample from '../../stories/sample.json';
import sampleRenderer from '../../stories/sampleRenderer.json';

export default {
	cmf: {
		collections: fromJS({
			sample: {
				...sample,
				data: [
					...sample.data,
					...Array(960)
						.fill()
						.map(() => ({
							value: {
								field2: {
									value: '95716',
									quality: 1,
								},
								field8: {
									value: '10771660',
									quality: 0,
								},
								field5: {
									value: '33929307',
									quality: -1,
								},
								field4: {
									value: '10748798',
									quality: 1,
								},
								field7: {
									value: '11030795',
									quality: 1,
								},
								field3: {
									value: '',
									quality: 1,
								},
								field1: {
									value: '271494',
									quality: 1,
								},
								field0: {
									value: 'Aéroport Charles de Gaulle 2 TGV',
									quality: 1,
								},
								field9: {
									value: '10880464',
									quality: 1,
								},
								field6: {
									value: '10920487',
									quality: 1,
								},
							},
							quality: 1,
						})),
				],
			},
			sampleRenderer,
		}),
	},
};
