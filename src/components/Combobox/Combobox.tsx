import React from 'react';
import { StyledProps } from 'styled-components';
import {
	unstable_useComboboxState as useReakitComboboxState,
	unstable_Combobox as ReakitCombobox,
	unstable_ComboboxPopover as ReakitComboboxPopover,
	unstable_ComboboxOption as ReakitComboboxOption,
} from 'reakit';

import * as S from './Combobox.style';

export type ComboboxProps = StyledProps<any> & {
	values?: string[];
};

const Combobox: React.FC<ComboboxProps> = ({ values, ...rest }: ComboboxProps) => {
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
					? combobox.matches.map(match => (
							<ReakitComboboxOption {...combobox} key={match} value={match} />
					  ))
					: 'No results found'}
			</ReakitComboboxPopover>
		</S.Combobox>
	);
};

export default Combobox;
