import { Map } from 'immutable';
import Breadcrumbs from '.';

const initialState = new Map({
	items: [
		{ text: 'Text A', title: 'Text title A', actionCreator: 'breadcrumb:folder:openA' },
		{ text: 'Text B', title: 'Text title B', actionCreator: 'breadcrumb:folder:openB' },
		{
			text: 'text c in lower case',
			title: 'Text title C',
			actionCreator: 'breadcrumb:folder:openC',
		},
	],
	maxItems: 3,
});

export default {
	title: 'Breadcrumb',
};

export function Default() {
	return <Breadcrumbs initialState={initialState} />;
}
