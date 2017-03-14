import Toggle from './Toggle.component';

export default Toggle;

export function Checkbox(params) { return new Toggle({ classes: 'checkbox', ...params }); }
