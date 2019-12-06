/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import useForm from 'react-hook-form';
import { addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import Array from './Array.component';
import Input from '../../fields/Input';

export default {
	title: 'Fieldsets|Array',

	parameters: {
		component: Array,
	},
};

addDecorator(storyFn => (
	<React.Fragment>
		<IconsProvider />
		{storyFn()}
	</React.Fragment>
));

export const InitialItemsNumber = () => {
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Array legend="My awesome users" name="users" initialNbItems={3} rhf={rhf}>
				<Array.Items>
					{index => (
						<div style={{ padding: '2rem 3rem' }}>
							<Input
								id={`user-${index}-firstname`}
								type="text"
								name={`users[${index}].firstname`}
								label="First name"
								rhf={rhf}
							/>
							<Input
								id={`user-${index}-lastname`}
								type="text"
								name={`users[${index}].lastname`}
								label="Last name"
								rhf={rhf}
							/>
							<Input
								id={`user-${index}-age`}
								type="number"
								name={`users[${index}].age`}
								label="Age"
								rhf={rhf}
							/>
						</div>
					)}
				</Array.Items>
			</Array>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const AddItem = () => {
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Array legend="My awesome users" name="users" rhf={rhf}>
				<div>
					<Array.AddButton />
				</div>
				<Array.Items>
					{index => (
						<div style={{ padding: '2rem 3rem' }}>
							<Input
								id={`user-${index}-firstname`}
								type="text"
								name={`users[${index}].firstname`}
								label="First name"
								rhf={rhf}
							/>
							<Input
								id={`user-${index}-lastname`}
								type="text"
								name={`users[${index}].lastname`}
								label="Last name"
								rhf={rhf}
							/>
							<Input
								id={`user-${index}-age`}
								type="number"
								name={`users[${index}].age`}
								label="Age"
								rhf={rhf}
							/>
						</div>
					)}
				</Array.Items>
			</Array>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

const defaultValues = {
	users: [
		{ firstname: 'Jimmy', lastname: 'Somsanith', age: 34 },
		{ firstname: 'Fabien', lastname: 'Rassinier', age: 32 },
		{ firstname: 'Sébastien', lastname: 'Romain', age: 33 },
	],
};
export const MoveItem = () => {
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur', defaultValues });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Array legend="My awesome users" name="users" rhf={rhf}>
				<Array.Items>
					{index => (
						<div style={{ padding: '2rem 3rem' }}>
							<div>
								<Array.MoveUpButton
									index={index}
									id={`move-user-${index}-up`}
									label={`Move user ${index} up`}
									hideLabel
								/>
								<Array.MoveDownButton
									index={index}
									id={`move-user-${index}-down`}
									label={`Move user ${index} down`}
									hideLabel
								/>
							</div>
							<Input
								id={`user-${index}-firstname`}
								type="text"
								name={`users[${index}].firstname`}
								label="First name"
								rhf={rhf}
							/>
							<Input
								id={`user-${index}-lastname`}
								type="text"
								name={`users[${index}].lastname`}
								label="Last name"
								rhf={rhf}
							/>
							<Input
								id={`user-${index}-age`}
								type="number"
								name={`users[${index}].age`}
								label="Age"
								rhf={rhf}
							/>
						</div>
					)}
				</Array.Items>
			</Array>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const DeleteItem = () => {
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur', defaultValues });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Array legend="My awesome users" name="users" rhf={rhf}>
				<div>
					<Array.AddButton />
				</div>
				<Array.Items>
					{index => (
						<div style={{ padding: '2rem 3rem' }}>
							<div>
								<Array.DeleteButton
									index={index}
									id={`delete-user-${index}`}
									label={`Delete user ${index}`}
									hideLabel
								/>
							</div>
							<Input
								id={`user-${index}-firstname`}
								type="text"
								name={`users[${index}].firstname`}
								label="First name"
								rhf={rhf}
							/>
							<Input
								id={`user-${index}-lastname`}
								type="text"
								name={`users[${index}].lastname`}
								label="Last name"
								rhf={rhf}
							/>
							<Input
								id={`user-${index}-age`}
								type="number"
								name={`users[${index}].age`}
								label="Age"
								rhf={rhf}
							/>
						</div>
					)}
				</Array.Items>
			</Array>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};

export const DefaultTemplate = () => {
	const { handleSubmit, ...rhf } = useForm({ mode: 'onBlur' });
	return (
		<form onSubmit={handleSubmit(action('submit'))} noValidate>
			<Array legend="My awesome users" name="users" rhf={rhf}>
				<Array.ItemsTemplate id="users">
					{index => (
						<React.Fragment>
							<Input
								id={`user-${index}-firstname`}
								type="text"
								name={`users[${index}].firstname`}
								label="First name"
								rhf={rhf}
							/>
							<Input
								id={`user-${index}-lastname`}
								type="text"
								name={`users[${index}].lastname`}
								label="Last name"
								rhf={rhf}
							/>
							<Input
								id={`user-${index}-age`}
								type="number"
								name={`users[${index}].age`}
								label="Age"
								rhf={rhf}
							/>
						</React.Fragment>
					)}
				</Array.ItemsTemplate>
			</Array>

			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</form>
	);
};
