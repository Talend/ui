import React from 'react';
import { IconGallery, IconItem } from '@storybook/components';
import { Form, Icon, IconsProvider, ThemeProvider } from '../index';

export const Icons = () => {
	const [icons, setIds] = React.useState([]);
	const [query, setQuery] = React.useState('');
	const [transform, setTransform] = React.useState('');

	React.useEffect(() => {
		IconsProvider.getAllIconIds().then(setIds);
	}, []);

	function onChangeQuery(event) {
		setQuery(event.target.value);
	}

	function onChangeTransform(event) {
		setTransform(event.target.value);
	}

	return (
		<>
			<ThemeProvider>
				<Form>
					<Form.Search label="Search" onChange={onChangeQuery} />
					<Form.Select
						label="Transform"
						onChange={onChangeTransform}
						values={['', 'rotate-45', 'rotate-90']}
					/>
				</Form>
			</ThemeProvider>
			<IconGallery>
				{icons
					.filter(iconName => iconName.includes(query))
					.map((iconName, index) => (
						<IconItem key={index} name={iconName}>
							<Icon name={iconName} transform={transform} />
						</IconItem>
					))}
			</IconGallery>
		</>
	);
};
