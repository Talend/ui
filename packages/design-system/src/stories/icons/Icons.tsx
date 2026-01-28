import { ReactNode, useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { IconGallery, IconItem } from '@storybook/addon-docs/blocks';

import { Form, Icon, IconProps, IconsProvider, StackHorizontal } from '../../';

type TemplateProps = IconProps & {
	size: number;
	filter?: boolean;
	useCurrentColor?: boolean;
};

type AllIconsTemplateProps = {
	children: (props: TemplateProps) => React.ReactNode;
	docs?: boolean;
};

export const AllIconsTemplate = ({ children, docs }: AllIconsTemplateProps) => {
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
	const Wrapper = (props: { children: ReactNode }) => {
		if (docs) {
			return <IconGallery>{props.children}</IconGallery>;
		}
		return <div>{props.children}</div>;
	};

	return (
		<>
			<Form>
				<StackHorizontal gap="M">
					<Form.Search name="search" label="Search" onChange={onChangeQuery} />
					<Form.Select name="Size" label="Size" onChange={onChangeSize} value={size}>
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
				</StackHorizontal>
				<StackHorizontal gap="M">
					<Form.ToggleSwitch
						label="Use color"
						name="color"
						onChange={() => setUseCurrentColor(!useCurrentColor)}
						checked={!!useCurrentColor}
					/>
					<Form.ToggleSwitch
						label="Use border"
						name="border"
						onChange={() => setBorder(!border)}
						checked={!!border}
					/>
					<Form.ToggleSwitch
						name="grayscale"
						label="Use grayscale filter"
						onChange={() => setFilter(!filter)}
						checked={!!filter}
					/>
				</StackHorizontal>
				{useCurrentColor ? (
					<Form.Color
						label="Color"
						onChange={(event: FormEvent<HTMLInputElement>) =>
							setCurrentColor(event.currentTarget.value)
						}
						value={currentColor}
						name="color"
					/>
				) : null}
			</Form>
			<div style={{ marginTop: '1.875rem', color: currentColor }}>
				<Wrapper>
					{icons
						.filter(iconName => iconName && iconName.includes(query))
						.map(
							iconName =>
								iconName &&
								children({ name: iconName, size, transform, useCurrentColor, border, filter }),
						)}
				</Wrapper>
			</div>
		</>
	);
};

export const AllIconsDocs = () => {
	return (
		<AllIconsTemplate docs>
			{({ name, size, transform, border, filter, useCurrentColor }) => (
				<IconItem key={name} name={name}>
					<Icon
						name={name}
						style={{
							width: `${size}rem`,
							height: `${size}rem`,
							filter: filter ? "url('#talend-grayscale')" : 'none',
						}}
						transform={transform}
						border={border}
					/>
				</IconItem>
			)}
		</AllIconsTemplate>
	);
};
