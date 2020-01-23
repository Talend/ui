/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
import { addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconsProvider from '@talend/react-components/lib/IconsProvider';
import ArrayFieldset from './Array.component';
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

const demoStyle = {
	marginBottom: '1rem',
	padding: '2rem 3rem',
	border: '1px solid lightgrey',
	borderRadius: '5px',
};

export const Simple = () => {
	const rhf = useForm({ mode: 'onBlur' });
	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<ArrayFieldset id="users" legend="My awesome users" name="users" initialNbItems={3}>
					<ArrayFieldset.Items>
						{index => (
							<Input id={`user-${index}`} type="text" name={`users[${index}]`} label="Name" />
						)}
					</ArrayFieldset.Items>
				</ArrayFieldset>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};

export const InitialItemsNumber = () => {
	const rhf = useForm({ mode: 'onBlur' });
	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<ArrayFieldset
					id="users"
					legend="My awesome users"
					name="users"
					initialNbItems={3}
					description="This array has 3 items as initial number of items"
				>
					<ArrayFieldset.Items>
						{index => (
							<div style={demoStyle}>
								<Input
									id={`user-${index}-firstname`}
									type="text"
									name={`users[${index}].firstname`}
									label="First name"
								/>
								<Input
									id={`user-${index}-lastname`}
									type="text"
									name={`users[${index}].lastname`}
									label="Last name"
								/>
								<Input
									id={`user-${index}-age`}
									type="number"
									name={`users[${index}].age`}
									label="Age"
								/>
							</div>
						)}
					</ArrayFieldset.Items>
				</ArrayFieldset>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};

export const AddItem = () => {
	const rhf = useForm({ mode: 'onBlur' });
	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<ArrayFieldset id="users" legend="My awesome users" name="users">
					<div>
						<ArrayFieldset.AddButton />
					</div>
					<ArrayFieldset.Items>
						{index => (
							<div style={demoStyle}>
								<Input
									id={`user-${index}-firstname`}
									type="text"
									name={`users[${index}].firstname`}
									label="First name"
								/>
								<Input
									id={`user-${index}-lastname`}
									type="text"
									name={`users[${index}].lastname`}
									label="Last name"
								/>
								<Input
									id={`user-${index}-age`}
									type="number"
									name={`users[${index}].age`}
									label="Age"
								/>
							</div>
						)}
					</ArrayFieldset.Items>
				</ArrayFieldset>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
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
	const rhf = useForm({ mode: 'onBlur', defaultValues });
	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<ArrayFieldset id="user" legend="My awesome users" name="users">
					<ArrayFieldset.Items>
						{index => (
							<div style={demoStyle}>
								<div>
									<ArrayFieldset.MoveUpButton
										index={index}
										id={`move-user-${index}-up`}
										label={`Move user ${index} up`}
										hideLabel
									/>
									<ArrayFieldset.MoveDownButton
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
								/>
								<Input
									id={`user-${index}-lastname`}
									type="text"
									name={`users[${index}].lastname`}
									label="Last name"
								/>
								<Input
									id={`user-${index}-age`}
									type="number"
									name={`users[${index}].age`}
									label="Age"
								/>
							</div>
						)}
					</ArrayFieldset.Items>
				</ArrayFieldset>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};

export const DeleteItem = () => {
	const rhf = useForm({ mode: 'onBlur', defaultValues });
	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<ArrayFieldset id="user" legend="My awesome users" name="users">
					<div>
						<ArrayFieldset.AddButton />
					</div>
					<ArrayFieldset.Items>
						{index => (
							<div style={demoStyle}>
								<div>
									<ArrayFieldset.DeleteButton
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
								/>
								<Input
									id={`user-${index}-lastname`}
									type="text"
									name={`users[${index}].lastname`}
									label="Last name"
								/>
								<Input
									id={`user-${index}-age`}
									type="number"
									name={`users[${index}].age`}
									label="Age"
								/>
							</div>
						)}
					</ArrayFieldset.Items>
				</ArrayFieldset>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};

export const DefaultTemplate = () => {
	const rhf = useForm({ mode: 'onBlur' });
	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<ArrayFieldset id="user" legend="My awesome users" name="users">
					<ArrayFieldset.ItemsTemplate id="users">
						{index => (
							<React.Fragment>
								<Input
									id={`user-${index}-firstname`}
									type="text"
									name={`users[${index}].firstname`}
									label="First name"
								/>
								<Input
									id={`user-${index}-lastname`}
									type="text"
									name={`users[${index}].lastname`}
									label="Last name"
								/>
								<Input
									id={`user-${index}-age`}
									type="number"
									name={`users[${index}].age`}
									label="Age"
								/>
							</React.Fragment>
						)}
					</ArrayFieldset.ItemsTemplate>
				</ArrayFieldset>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};

export const ItemValidation = () => {
	const rhf = useForm({
		mode: 'onBlur',
		defaultValues: { users: [defaultValues.users[1], ...defaultValues.users] },
	});

	const uniqueLastname = value => {
		const duplicatedValues = new Set();
		const errorId = 'uniqueLastname';
		const errorMessage = 'Lastname must be unique';
		const users = rhf.getValues({ nest: true }).users;
		const hasDuplicate = ({ lastname }, index) => {
			if (!lastname) {
				return false;
			}
			if (duplicatedValues.has(lastname)) {
				return true;
			}
			const duplicate = users.slice(index + 1).some(u => u.lastname === lastname);
			if (duplicate) {
				duplicatedValues.add(lastname);
				return true;
			}

			return false;
		};

		users.forEach((user, index) => {
			if (hasDuplicate(user, index)) {
				rhf.setError(`users[${index}].lastname`, errorId, errorMessage);
			} else {
				rhf.clearError(`users[${index}].lastname`);
			}
		});

		return duplicatedValues.has(value) ? errorMessage : null;
	};
	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<ArrayFieldset
					id="users"
					legend="My awesome users"
					description="Users can't have the same lastname"
					name="users"
				>
					<ArrayFieldset.Items>
						{index => (
							<div style={demoStyle}>
								<div>
									<ArrayFieldset.DeleteButton
										index={index}
										id={`delete-user-${index}`}
										label={`Delete user ${index}`}
										hideLabel
									/>
									<ArrayFieldset.MoveUpButton
										index={index}
										id={`move-user-${index}-up`}
										label={`Move user ${index} up`}
										hideLabel
									/>
									<ArrayFieldset.MoveDownButton
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
								/>
								<Input
									id={`user-${index}-lastname`}
									type="text"
									name={`users[${index}].lastname`}
									label="Last name"
									rules={{ validate: { uniqueLastname } }}
								/>
								<Input
									id={`user-${index}-age`}
									type="number"
									name={`users[${index}].age`}
									label="Age"
								/>
							</div>
						)}
					</ArrayFieldset.Items>
				</ArrayFieldset>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};

export const ArrayValidation = () => {
	const rhf = useForm({
		mode: 'onBlur',
		defaultValues: { users: [defaultValues.users[0]] },
	});

	const min3Items = nbItems => {
		if (nbItems >= 3) {
			return null;
		}
		return 'There is not enough elements, you should add at least 3 users. You can use the Add button located on top';
	};

	return (
		<FormContext {...rhf}>
			<form onSubmit={rhf.handleSubmit(action('submit'))} noValidate>
				<ArrayFieldset
					id="users"
					legend="My awesome users"
					name="users"
					rules={{ validate: min3Items }}
				>
					<div>
						<ArrayFieldset.AddButton />
					</div>
					<ArrayFieldset.Items>
						{index => (
							<div style={demoStyle}>
								<div>
									<ArrayFieldset.DeleteButton
										index={index}
										id={`delete-user-${index}`}
										label={`Delete user ${index}`}
										hideLabel
									/>
									<ArrayFieldset.MoveUpButton
										index={index}
										id={`move-user-${index}-up`}
										label={`Move user ${index} up`}
										hideLabel
									/>
									<ArrayFieldset.MoveDownButton
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
								/>
								<Input
									id={`user-${index}-lastname`}
									type="text"
									name={`users[${index}].lastname`}
									label="Last name"
								/>
								<Input
									id={`user-${index}-age`}
									type="number"
									name={`users[${index}].age`}
									label="Age"
								/>
							</div>
						)}
					</ArrayFieldset.Items>
				</ArrayFieldset>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</FormContext>
	);
};
