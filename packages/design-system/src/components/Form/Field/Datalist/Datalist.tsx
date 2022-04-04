import React from 'react';
import { unstable_useId as useId } from 'reakit';
import Field from '../Field';
import { InputProps } from '../Input/Input';

export type DatalistProps = InputProps & {
	values: string[];
};

const Datalist = React.forwardRef(
	({ id, values = [], ...rest }: DatalistProps, ref: React.Ref<HTMLInputElement> | undefined) => {
		const { id: reakitId } = useId();
		const datalistId = id || `datalist--${reakitId}`;
		const datalistListId = `datalist__list--${reakitId}`;

		return (
			<div className="c-field c-field--datalist">
				<Field {...rest} id={datalistId} list={datalistListId} ref={ref} />
				<datalist id={datalistListId}>
					{values.map((value: string, index: React.Key) => (
						// eslint-disable-next-line jsx-a11y/control-has-associated-label
						<option key={index} value={value} />
					))}
				</datalist>
			</div>
		);
	},
);

export default Datalist;
