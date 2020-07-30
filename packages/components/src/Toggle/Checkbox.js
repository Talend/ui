import Toggle from './Toggle.component';



export function Checkbox(params) {
	return new Toggle({ className: 'checkbox', ...params });
}
