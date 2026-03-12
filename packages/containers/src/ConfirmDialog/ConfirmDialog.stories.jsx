import ConfirmDialog from '.';

const initialState = {
	size: 'small',
	header: 'DO SOMETHING',
	show: true,
	children: 'Confirm this !',
	validateAction: 'confirm-dialog:validate',
	cancelAction: 'confirm-dialog:cancel',
};

export default {
	title: 'ConfirmDialog',
};

export function Default() {
	return <ConfirmDialog initialState={initialState} />;
}
