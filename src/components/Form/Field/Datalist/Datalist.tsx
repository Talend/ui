import React from 'react';
import Field from '../Field';

export type DatalistProps = {
	/** Id of the form field */
	id?: string;
	/** Values for the datalist */
	values?: string[];
};

export const Datalist: React.FC<DatalistProps> = ({
	id = Math.round(Math.random() * 1e5).toString(),
	values,
	...rest
}: DatalistProps) => {
	const listId = `datalist-${id}`;
	return (
		<>
			{' '}
			<Field {...rest} id={id} list={listId} />
			{values && (
				<datalist id={listId}>
					{values.map((value, index) => (
						<option key={index} value={value} />
					))}
				</datalist>
			)}
		</>
	);
};

export default Datalist;
