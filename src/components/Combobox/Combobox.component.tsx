import React from 'react';
import {
	unstable_useComboboxState as useReakitComboboxState,
	unstable_Combobox as ReakitCombobox,
	unstable_ComboboxPopover as ReakitComboboxPopover,
	unstable_ComboboxOption as ReakitComboboxOption,
} from 'reakit';

import * as S from './Combobox.style';

const Combobox = ({ value, values, ...rest }) => {
	const combobox = useReakitComboboxState({
		autoSelect: true,
		inline: true,
		list: true,
		gutter: 8,
		values,
	});

	return (
		<S.Combobox>
			<ReakitCombobox {...combobox} {...rest} />
			<ReakitComboboxPopover {...combobox}>
				{combobox.matches.length
					? combobox.matches.map(value => (
							<ReakitComboboxOption {...combobox} key={value} value={value} />
					  ))
					: 'No results found'}
			</ReakitComboboxPopover>
		</S.Combobox>
	);
};

export default Combobox;
