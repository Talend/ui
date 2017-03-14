import Toggle from './Toggle.component';

export default Toggle;

export function Checkbox(params) { return new Toggle({ className: 'checkbox', ...params }); }
