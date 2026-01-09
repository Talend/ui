import { fromJS } from 'immutable';
import Action from '../Action';
import GuidedTour from '.';

const initialState = fromJS({
	show: true,
});

const steps = [
	{
		content: {
			body: 'Eenie',
		},
	},
	{
		content: {
			body: 'Meenie',
		},
	},
	{
		content: {
			body: 'Miney',
		},
	},
	{
		content: {
			body: 'Moe',
		},
	},
];

export default {
	title: 'GuidedTour',
};

export function Default() {
	return (
		<div>
			<Action actionId="guided-tour:show" />
			<GuidedTour initialState={initialState} steps={steps} />
		</div>
	);
}
