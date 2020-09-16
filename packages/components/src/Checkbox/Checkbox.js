import Toggle from '../Toggle/Toggle.component';

export default function Checkbox(params) {
	return new Toggle({ className: 'checkbox', ...params });
}
