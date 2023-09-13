import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { IconGallery, IconItem } from '@storybook/blocks';

import { Form, Icon, IconsProvider, ThemeProvider, ToggleSwitch } from '@talend/design-system';

export const Icons = () => {
	const [icons, setIds] = useState<(string | null)[]>([]);
	const [query, setQuery] = useState<string>('');
	const [size, setSize] = useState<number>(2);
	const [filter, setFilter] = useState<boolean>();
	const [transform, setTransform] = useState<string>('');
	const [useCurrentColor, setUseCurrentColor] = useState<boolean>();
	const [currentColor, setCurrentColor] = useState<string>();
	const [border, setBorder] = useState<boolean>();

	useEffect(() => {
		IconsProvider.getAllIconIds().then((ids: (string | null)[]) => {
			const cleanIds = ids.filter(id => id && !id.includes(':'));
			setIds(cleanIds);
		});
	}, []);

	const onChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
		setQuery(event.currentTarget.value);
	};

	const onChangeSize = (event: ChangeEvent<HTMLSelectElement>) => {
		setSize(parseFloat(event.currentTarget.value));
	};

	const onChangeTransform = (event: ChangeEvent<HTMLSelectElement>) => {
		setTransform(event.currentTarget.value);
	};

	return (
		<>
			{/*
			// Temporary fix, will be removed with CSS Modules conversion
			// @ts-ignore */}
			<ThemeProvider>
				<Form>
					<Form.Search name="search" label="Search" onChange={onChangeQuery} />
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<Form.Select name="Size" label="Size" onChange={onChangeSize}>
							<option value="1">S</option>
							<option value="2">M</option>
							<option value="3">L</option>
							<option value="4">XL</option>
						</Form.Select>
						<Form.Select name="Transform" label="Transform" onChange={onChangeTransform}>
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
							<ToggleSwitch
								label="Use color"
								name="color"
								onChange={() => setUseCurrentColor(!useCurrentColor)}
								checked={!!useCurrentColor}
							/>
							<Form.Color
								label="Color"
								onChange={(event: FormEvent<HTMLInputElement>) =>
									setCurrentColor(event.currentTarget.value)
								}
								value={currentColor}
								disabled={!useCurrentColor}
								name="color"
							/>
						</div>
						<ToggleSwitch
							label="Use border"
							name="border"
							onChange={() => setBorder(!border)}
							checked={!!border}
						/>
						<ToggleSwitch
							name="grayscale"
							label="Use grayscale filter"
							onChange={() => setFilter(!filter)}
							checked={!!filter}
						/>
					</div>
				</Form>
			</ThemeProvider>
			<div style={{ marginTop: '3rem', color: currentColor }}>
				<IconGallery>
					{icons
						.filter(iconName => iconName && iconName.includes(query))
						.map(
							(iconName, index) =>
								iconName && (
									<IconItem key={index} name={iconName}>
										<Icon
											name={iconName}
											style={{
												width: `${size}rem`,
												height: `${size}rem`,
												filter: filter ? "url('#talend-grayscale')" : 'none',
											}}
											transform={transform}
											preserveColor={!useCurrentColor}
											border={border}
										/>
									</IconItem>
								),
						)}
				</IconGallery>
			</div>
		</>
	);
};
