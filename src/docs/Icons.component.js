import React from 'react';
import { IconGallery, IconItem } from '@storybook/components';
import { Form, Icon, IconsProvider, ThemeProvider, tokens } from '../index';

export const Icons = () => {
	const [icons, setIds] = React.useState([]);
	const [query, setQuery] = React.useState('');
	const [size, setSize] = React.useState(2);
	const [transform, setTransform] = React.useState('');
	const [useCurrentColor, setUseCurrentColor] = React.useState();
	const [currentColor, setCurrentColor] = React.useState(tokens.colors.gray[800]);
	const [border, setBorder] = React.useState();

	React.useEffect(() => {
		IconsProvider.getAllIconIds().then(setIds);
	}, []);

	function onChangeQuery(event) {
		setQuery(event.target.value);
	}

	function onChangeSize(event) {
		setSize(event.target.value);
	}

	function onChangeTransform(event) {
		setTransform(event.target.value);
	}

	return (
		<>
			<ThemeProvider>
				<IconsProvider
					bundles={[
						'https://statics-dev.cloud.talend.com/@talend/icons/6.7.0/dist/svg-bundle/all.svg',
					]}
				/>
				<Form>
					<Form.Search label="Search" onChange={onChangeQuery} />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Form.Select label="Size" onChange={onChangeSize}>
							<option value="1">S</option>
							<option value="2">M</option>
							<option value="3">L</option>
							<option value="4">XL</option>
						</Form.Select>
						<Form.Select label="Transform" onChange={onChangeTransform}>
							<option>spin</option>
							<option>rotate-45</option>
							<option>rotate-90</option>
							<option>rotate-135</option>
							<option>rotate-180</option>
							<option>rotate-225</option>
							<option>rotate-270</option>
							<option>rotate-315</option>
							<option>flip-horizontal</option>
							<option>flip-vertical</option>
						</Form.Select>
						<div>
							<Form.Switch
								label="Use color"
								onChange={() => setUseCurrentColor(!useCurrentColor)}
								checked={!!useCurrentColor}
							/>
							<Form.Color
								label="Color"
								onChange={event => setCurrentColor(event.target.value)}
								value={currentColor}
								disabled={!useCurrentColor}
							/>
						</div>
						<Form.Switch
							label="Use border"
							onChange={() => setBorder(!border)}
							checked={!!border}
						/>
					</div>
				</Form>
			</ThemeProvider>
			<IconGallery style={{ marginTop: '3rem', color: currentColor }}>
				{icons
					.filter(iconName => iconName.includes(query))
					.map((iconName, index) => (
						<IconItem key={index} name={iconName}>
							<Icon
								name={iconName}
								style={{ width: size + 'rem', height: size + 'rem' }}
								transform={transform}
								preserveColor={!useCurrentColor}
								border={border}
							/>
						</IconItem>
					))}
			</IconGallery>
		</>
	);
};
