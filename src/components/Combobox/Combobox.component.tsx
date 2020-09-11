import React from 'react';
import {
	unstable_useComboboxState as useReakitComboboxState,
	unstable_Combobox as ReakitCombobox,
	unstable_ComboboxPopover as ReakitComboboxPopover,
	unstable_ComboboxOption as ReakitComboboxOption,
} from 'reakit/Combobox';

import * as S from './Combobox.style';

function Options({ resource, ...props }) {
	const users = resource.read();
	return users.length
		? users.map(user => <ReakitComboboxOption {...props} key={user.name} value={user.name} />)
		: 'No results found';
}

const Combobox = ({ value, getList }) => {
	const combobox = useReakitComboboxState({
		autoSelect: true,
		inline: true,
		list: true,
		gutter: 8,
	});
	const [resource, setResource] = React.useState(value);
	// const [startTransition] = React.unstable_useTransition({
	// 	timeoutMs: 1000,
	// });

	React.useEffect(() => {
		// startTransition(() => {
		setResource(getList(combobox.inputValue));
		// });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [combobox.inputValue]);

	return (
		<S.Combobox>
			<ReakitCombobox {...combobox} placeholder="Joe Dohn" aria-label="User" />
			<ReakitComboboxPopover {...combobox} aria-label="Users">
				<React.Suspense fallback="Loading...">
					<Options {...combobox} resource={resource} />
				</React.Suspense>
			</ReakitComboboxPopover>
		</S.Combobox>
	);
};

export default Combobox;
